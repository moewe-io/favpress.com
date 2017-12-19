<?php


class FavPress_Customizer {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function __construct() {
        add_action('customize_register', array($this, 'register_customizers'), 0);

        add_filter('alpha-color-picker-scripts', array($this, 'alpha_color_picker_scripts'));
        add_filter('alpha-color-picker-styles', array($this, 'alpha_color_picker_styles'));
    }

    function register_customizers($wp_customize) {
        require_once(FAVPRESS_DIR . '/classes/customizer/alpha_color/alpha-color-picker.php');
    }

    function alpha_color_picker_scripts($default) {
        return FAVPRESS_URL . '/classes/customizer/alpha_color/alpha-color-picker.js';
    }

    function alpha_color_picker_styles($default) {
        return FAVPRESS_URL . '/classes/customizer/alpha_color/alpha-color-picker.css';
    }
}
