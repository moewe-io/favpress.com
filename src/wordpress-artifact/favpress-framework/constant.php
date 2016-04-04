<?php

/*
|--------------------------------------------------------------------------
| FavPress Framework Constants
|--------------------------------------------------------------------------
*/

defined('FAVPRESS_VERSION')     or define('FAVPRESS_VERSION'    , '__PRODUCT_VERSION__');
defined('FAVPRESS_NAMESPACE')   or define('FAVPRESS_NAMESPACE'  , 'FavPress');
defined('FAVPRESS_DIR')         or define('FAVPRESS_DIR'        , untrailingslashit(dirname(__FILE__)));
defined('FAVPRESS_DIR_NAME')    or define('FAVPRESS_DIR_NAME'   , basename(FAVPRESS_DIR));
defined('FAVPRESS_IMAGE_DIR')   or define('FAVPRESS_IMAGE_DIR'  , FAVPRESS_DIR . '/public/img');
defined('FAVPRESS_CONFIG_DIR')  or define('FAVPRESS_CONFIG_DIR' , FAVPRESS_DIR . '/config');
defined('FAVPRESS_DATA_DIR')    or define('FAVPRESS_DATA_DIR'   , FAVPRESS_DIR . '/data');
defined('FAVPRESS_CLASSES_DIR') or define('FAVPRESS_CLASSES_DIR', FAVPRESS_DIR . '/classes');
defined('FAVPRESS_VIEWS_DIR')   or define('FAVPRESS_VIEWS_DIR'  , FAVPRESS_DIR . '/views');
defined('FAVPRESS_INCLUDE_DIR') or define('FAVPRESS_INCLUDE_DIR', FAVPRESS_DIR . '/includes');

// get and normalize framework dirname
$dirname        = str_replace('\\' ,'/', dirname(__FILE__)); // standardize slash
$dirname        = preg_replace('|/+|', '/', $dirname);       // normalize duplicate slash

// get and normalize WP content directory
$wp_content_dir = str_replace( '\\', '/', WP_CONTENT_DIR );  // standardize slash

// build relative url
$relative_url   = str_replace($wp_content_dir, "", $dirname);

// finally framework base url
$FAVPRESS_url         = content_url() . $relative_url;

defined('FAVPRESS_URL')         or define('FAVPRESS_URL'        , untrailingslashit($FAVPRESS_url));
defined('FAVPRESS_PUBLIC_URL')  or define('FAVPRESS_PUBLIC_URL' , FAVPRESS_URL        . '/public');
defined('FAVPRESS_IMAGE_URL')   or define('FAVPRESS_IMAGE_URL'  , FAVPRESS_PUBLIC_URL . '/img');
defined('FAVPRESS_INCLUDE_URL') or define('FAVPRESS_INCLUDE_URL', FAVPRESS_URL        . '/includes');

// Get the start time and memory usage for profiling
defined('FAVPRESS_START_TIME')  or define('FAVPRESS_START_TIME', microtime(true));
defined('FAVPRESS_START_MEM')   or define('FAVPRESS_START_MEM',  memory_get_usage());

/**
 * EOF
 */