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
        add_action('customize_register', array($this, 'favpress_register_customizers'), 0);
    }

    function favpress_register_customizers($wp_customize) {
        require_once(FAVPRESS_DIR . '/classes/customizer/alpha_color/alpha-color-picker.php');
    }
}
