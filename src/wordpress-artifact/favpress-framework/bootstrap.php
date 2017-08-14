<?php

if (defined('FAVPRESS_VERSION')) {
    return;
}
require_once 'constant.php';
require_once 'autoload.php';

if (!function_exists('favpress_load_textdomain')) {
    add_action('plugins_loaded', 'favpress_load_textdomain');
    function favpress_load_textdomain() {
        load_plugin_textdomain('favpress', false, FAVPRESS_DIR . '/languages/');
    }
}

$favpress_filesystem = FavPress_FileSystem::instance();
$favpress_filesystem->add_directories('views', FAVPRESS_VIEWS_DIR);
$favpress_filesystem->add_directories('config', FAVPRESS_CONFIG_DIR);
$favpress_filesystem->add_directories('data', FAVPRESS_DATA_DIR);
$favpress_filesystem->add_directories('includes', FAVPRESS_INCLUDE_DIR);

FavPress_Customizer::instance();

//////////////////////////
// Include Data Source  //
//////////////////////////
foreach (glob(FAVPRESS_DATA_DIR . "/*.php") as $datasource) {
    require_once($datasource);
}

//////////////////////////
// TGMPA Unsetting      //
//////////////////////////
add_action('after_setup_theme', 'favpress_tgm_ac_check');

if (!function_exists('favpress_tgm_ac_check')) {
    function favpress_tgm_ac_check() {
        add_action('tgmpa_register', 'favpress_tgm_ac_fafpress_check');
    }
}

if (!function_exists('favpress_tgm_ac_fafpress_check')) {
    function favpress_tgm_ac_fafpress_check() {
        if (defined('FAVPRESS_VERSION') and class_exists('TGM_Plugin_Activation')) {
            foreach (TGM_Plugin_Activation::$instance->plugins as $key => &$plugin) {
                if ($plugin['name'] === 'FavPress Framework Plugin') {
                    unset(TGM_Plugin_Activation::$instance->plugins[$key]);
                }
            }
        }
    }
}

//////////////////////////
// Ajax Definition      //
//////////////////////////
add_action('wp_ajax_favpress_ajax_wrapper', 'favpress_ajax_wrapper');

if (!function_exists('favpress_ajax_wrapper')) {
    function favpress_ajax_wrapper() {
        $function = $_POST['func'];
        $params = $_POST['params'];

        if (FavPress_Security::instance()->is_function_whitelisted($function)) {
            if (!is_array($params))
                $params = array($params);

            try {
                $result['data'] = call_user_func_array($function, $params);
                $result['status'] = true;
                $result['message'] = __("Successful", 'favpress');
            } catch (Exception $e) {
                $result['data'] = '';
                $result['status'] = false;
                $result['message'] = $e->getMessage();
            }
        } else {
            $result['data'] = '';
            $result['status'] = false;
            $result['message'] = __("Unauthorized function", 'favpress');
        }

        if (ob_get_length()) ob_clean();
        header('Content-type: application/json');
        echo json_encode($result);
        die();
    }
}

/////////////////////////////////
// Pool and Dependencies Init  //
/////////////////////////////////
add_action('init', 'favpress_metabox_enqueue');
add_action('current_screen', 'favpress_sg_enqueue');
add_action('admin_enqueue_scripts', 'favpress_enqueue_scripts');
add_action('current_screen', 'favpress_sg_init_buttons');
add_filter('clean_url', 'favpress_ace_script_attributes', 10, 1);

if (!function_exists('favpress_ace_script_attributes')) {
    function favpress_ace_script_attributes($url) {
        if (false === strpos($url, 'ace.js'))
            return $url;

        return "$url' charset='utf8";
    }
}

if (!function_exists('favpress_metabox_enqueue')) {
    function favpress_metabox_enqueue() {
        if (FavPress_WP_Admin::is_post_or_page() and FavPress_Metabox::pool_can_output()) {
            $loader = FavPress_WP_Loader::instance();
            $loader->add_main_js('favpress-metabox');
            $loader->add_main_css('favpress-metabox');
        }
    }
}

if (!function_exists('favpress_sg_enqueue')) {
    function favpress_sg_enqueue() {
        if (FavPress_ShortcodeGenerator::pool_can_output()) {
            // enqueue dummy js
            $localize = FavPress_ShortcodeGenerator::build_localize();
            wp_register_script('favpress-sg-dummy', FAVPRESS_PUBLIC_URL . '/js/dummy.js', array(), '', false);
            wp_localize_script('favpress-sg-dummy', 'favpress_sg', $localize);
            wp_enqueue_script('favpress-sg-dummy');

            $loader = FavPress_WP_Loader::instance();
            $loader->add_main_js('favpress-shortcode');
            $loader->add_main_css('favpress-shortcode');
        }
    }
}

add_action('admin_footer', 'favpress_post_dummy_editor');

if (!function_exists('favpress_post_dummy_editor')) {
    function favpress_post_dummy_editor() {
        /**
         * If we're in post edit page, and the post type doesn't support `editor`
         * we need to echo out a dummy editor to load all necessary js and css
         * to be used in our own called wp editor.
         */
        $loader = FavPress_WP_Loader::instance();
        $types = $loader->get_types();
        $dummy = false;

        if (FavPress_WP_Admin::is_post_or_page()) {
            $types = array_unique(array_merge($types['metabox'], $types['shortcodegenerator']));
            if (in_array('wpeditor', $types)) {
                if (!FavPress_ShortcodeGenerator::pool_supports_editor() and !FavPress_Metabox::pool_supports_editor())
                    $dummy = true;
            }
        } else {
            $types = $types['option'];
            if (in_array('wpeditor', $types))
                $dummy = true;
        }

        if ($dummy) {
            echo '<div style="display: none">';
            add_filter('wp_default_editor', create_function('', 'return "tinymce";'));
            wp_editor('', 'favpress_dummy_editor');
            echo '</div>';
        }
    }
}

if (!function_exists('favpress_sg_init_buttons')) {
    function favpress_sg_init_buttons() {
        if (FavPress_ShortcodeGenerator::pool_can_output()) {
            FavPress_ShortcodeGenerator::init_buttons();
        }
    }
}

if (!function_exists('favpress_enqueue_scripts')) {
    function favpress_enqueue_scripts() {
        $loader = FavPress_WP_Loader::instance();
        $loader->build();
    }
}

/**
 * Easy way to get metabox values using dot notation
 * example:
 *
 * favpress_metabox('meta_name.field_name')
 * favpress_metabox('meta_name.group_name')
 * favpress_metabox('meta_name.group_name.0.field_name')
 *
 */

if (!function_exists('favpress_metabox')) {
    function favpress_metabox($key, $default = null, $post_id = null) {
        global $post;

        $favpress_metaboxes = FavPress_Metabox::get_pool();

        if (!is_null($post_id)) {
            $the_post = get_post($post_id);
            if (empty($the_post)) $post_id = null;
        }

        if (is_null($post) and is_null($post_id))
            return $default;

        $keys = explode('.', $key);
        $temp = null;

        foreach ($keys as $idx => $key) {
            if ($idx == 0) {
                if (array_key_exists($key, $favpress_metaboxes)) {
                    $temp = $favpress_metaboxes[$key];
                    if (!is_null($post_id))
                        $temp->the_meta($post_id);
                    else
                        $temp->the_meta();
                } else {
                    return $default;
                }
            } else {
                if (is_object($temp) and get_class($temp) === 'FavPress_Metabox') {
                    $temp = $temp->get_the_value($key);
                } else {
                    if (is_array($temp) and array_key_exists($key, $temp)) {
                        $temp = $temp[$key];
                    } else {
                        return $default;
                    }
                }
            }
        }
        return $temp;
    }
}

if (!function_exists('favpress_option')) {
    /**
     * Get an option's value using dot notation. If no value is set, fallback to either the given $default parameter,
     * or the default value as specified in the template used.
     * Example: favpress_option('option_key.field_name')
     *
     * @param string $key Option key using dot notation.
     * @param null|string $default Specify a custom default value. If null, use the default value as specified in the
     * template used.
     *
     * @return null|string
     */
    function favpress_option($key, $default = null) {
        $value = null;

        // Get option value.
        $favpress_options = FavPress_Option::get_pool();
        if (!empty($favpress_options)) {
            $subkeys = explode('.', $key);
            $temp = null;

            foreach ($subkeys as $idx => $subkey) {
                if ($idx == 0) {
                    if (array_key_exists($subkey, $favpress_options)) {
                        $value = $favpress_options[$subkey];
                        $value = $value->get_options();
                    } else {
                        $value = null;
                        break;
                    }
                } else {
                    if (is_array($value) and array_key_exists($subkey, $value)) {
                        $value = $value[$subkey];
                    } else {
                        $value = null;
                        break;
                    }
                }
            }
        }

        // If value is set, return it.
        if ($value !== null) {
            return $value;
        }

        // If a custom default value is given, return that.
        if ($default !== null) {
            return $default;
        }

        // Get default value.
        {
            // Get pool name and option name.
            $keys = explode('.', $key);
            $pool_name = $keys[0];
            $option_name = $keys[1];

            // Get array of defaults.
            $pool = FavPress_Option::get_pool();
            $pool = $pool[$pool_name];
            if ($pool !== null) {
                $pool->init_options_set();
                $options_set = $pool->get_options_set();
                $defaults = $options_set->get_defaults();
                // Get default value for given $key.
                if (array_key_exists($option_name, $defaults)) {
                    return $defaults[$option_name];
                }
            }
        }

        // Nothing found.
        return null;
    }
}

// Allow getting options using filters
add_filter('favpress_option', 'favpress_get_option', 10, 2);
/**
 * @internal Use apply_filters('favpress_option', $default, $key) instead.
 * @see favpress_option()
 */
if (!function_exists('favpress_get_option')) {
    function favpress_get_option($default, $key) {
        return favpress_option($key, $default);
    }
}

// Allow getting metaboxes using filters
add_filter('favpress_metabox', 'favpress_get_metabox', 10, 3);
/**
 * @internal Use apply_filters('favpress_metabox', $default, $key, $post_id) instead.
 * @see favpress_option()
 */
if (!function_exists('favpress_get_metabox')) {
    function favpress_get_metabox($default, $key, $post_id = null) {
        return favpress_metabox($key, $default, $post_id);
    }
}

// Allow loading of Metaboxes without the need to check for FavPress
add_action('after_setup_theme', 'favpress_add_metaboxes', 1000);

/**
 * @internal Register your custom action like: add_action('favpress_add_metabox', 'my_action_hook')
 */
if (!function_exists('favpress_add_metaboxes')) {
    function favpress_add_metaboxes() {
        do_action('favpress_add_metaboxes');
    }
}


// Initialize Importers
add_action('admin_init', 'favpress_init_importers');

if (!function_exists('favpress_init_importers')) {
    function favpress_init_importers() {
        do_action('favpress_init_importer');
    }
}
