<?php

/**
 * Abstract class to simplify providing custom importers.
 */
abstract class FavPress_Importer {

    public static $STATUS_OKAY = 'okay';
    public static $STATUS_ERROR = 'error';
    public static $STATUS_WARNING = 'warning';

    private $support_deletion;
    private $id;
    private $name;
    private $description;


    /**
     * @param $id string Unique identifier for this importer
     * @param $name
     * @param $support_deletion boolean True, if this installer also supports deletion of old/previously imported content
     */
    function __construct($id, $name, $description, $support_deletion = false) {
        $this->support_deletion = $support_deletion;
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;

        $loader = FavPress_WP_Loader::instance();
        $loader->add_main_js('jquery-serialize-object');
        $loader->add_main_js('favpress-importer');
        $loader->add_main_css('jqui');

        register_importer($this->id, $this->name, $this->description, array($this, 'show_ui'));

        add_action('wp_ajax_favpress_importer_delete_' . $this->id, array($this, 'dispatch_actions'));
        add_action('wp_ajax_favpress_importer_import_' . $this->id, array($this, 'dispatch_actions'));

        add_filter('favpress_importer_delete_' . $this->id, array($this, 'delete'), 10, 3);
        add_filter('favpress_importer_import_' . $this->id, array($this, 'import'), 10, 3);
    }

    function dispatch_actions() {
        $offset = isset($_REQUEST['offset']) ? $_REQUEST['offset'] : 0;
        $limit = isset($_REQUEST['limit']) ? $_REQUEST['limit'] : apply_filters('favpress_importer_limit_' . $this->id, 500);
        $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

        $result = array(
            'status'   => FavPress_Importer::$STATUS_OKAY,
            'time'     => date("Y-m-d H:i:s"),
            'message'  => sprintf(_x('Processing batch. (Offset: %s, Limit: %s)', 'favpress_importer', '__PLUGIN_SLUG__'), $offset, $limit),
            'offset'   => $offset + $limit,
            'limit'    => $limit,
            'total'    => 0,
            'has_more' => false
        );

        if ($action != '' || strpos($action, 'favpress_importer_') === false) {
            $result = apply_filters($action, $result, $offset, $limit);
        } else {
            $result['status'] = FavPress_Importer::$STATUS_ERROR;
            $result['message'] = _x('There was no action given', 'favpress_importer', '__PLUGIN_SLUG__');
        }
        echo json_encode($result);
        wp_die(); // this is required to terminate immediately and return a proper response
    }

    /**
     * @param $status array Prefilled status
     * @param $offset int The current offset.
     * @param $limit int The limit of elements to process for this batch.
     * @return array The current status.
     */
    function delete($status, $offset, $limit) {
        return array(
            'status'   => FavPress_Importer::$STATUS_ERROR,
            'message'  => _x('Not implemented', 'favpress_importer', '__PLUGIN_SLUG__'),
            'offset'   => 0,
            'limit'    => 0,
            'total'    => -1,
            'has_more' => false,
            'time'     => date("Y-m-d H:i:s")
        );
    }

    /**
     * @param $status array Prefilled status
     * @param $offset int The current offset.
     * @param $limit int The limit of elements to process for this batch.
     * @return array The current status.
     */
    function import($status, $offset, $limit) {
        return array(
            'status'   => FavPress_Importer::$STATUS_ERROR,
            'message'  => _x('Not implemented', 'favpress_importer', '__PLUGIN_SLUG__'),
            'offset'   => 0,
            'limit'    => 0,
            'total'    => -1,
            'has_more' => false,
            'time'     => date("Y-m-d H:i:s")
        );
    }

    function show_ui() {
        ?>
        <h1><?php echo apply_filters('favpress_importer_title_' . $this->id, $this->name) ?></h1>
        <div id="importer-progress-panel" style="display: none;">
            <h2><?php echo _x('Progress', 'favpress_importer', '__PLUGIN_SLUG__'); ?></h2>
            <div id="importer-progressbar" style="width: 90%;"></div>
            <br/>
            <h3><label for="importer-log"><?php echo _x('message', 'favpress_importer', '__PLUGIN_SLUG__') ?></label>
            </h3>
            <textarea id="importer-log" style="width: 90%;" rows="10"></textarea>

            <br/>
            <button
                onclick="jQuery('#importer-progress-panel').hide(); return false;"><?php echo _x('Hide', 'favpress_importer', '__PLUGIN_SLUG__'); ?></button>
        </div>
        <?php
        if ($this->support_deletion) {
            ?>
            <form id="favpress-remove-old-data-form">
                <h2><?php echo _x('Delete old data', 'favpress_importer', '__PLUGIN_SLUG__') ?></h2>
                <input type="hidden" name="action" value="favpress_importer_delete_<?php echo $this->id ?>"/>
                <?php do_action('favpress_importer_render_delete_form_' . $this->id); ?>
                <button type="submit">Delete</button>
            </form>
            <?php
        }

        ?>
        <form id="favpress-import-form">
            <h2><?php echo _x('Start Import', 'favpress_importer', '__PLUGIN_SLUG__') ?></h2>
            <input type="hidden" name="action" value="favpress_importer_import_<?php echo $this->id ?>"/>
            <?php do_action('favpress_importer_render_import_form_' . $this->id); ?>
            <button type="submit">Import</button>
        </form>
        <?php
    }
}