<?php

return array(

	////////////////////////////////////////
	// Localized JS Message Configuration //
	////////////////////////////////////////

	/**
	 * Validation Messages
	 */
	'validation' => array(
		'alphabet'     => __('Value needs to be Alphabet', '__PLUGIN_SLUG__'),
		'alphanumeric' => __('Value needs to be Alphanumeric', '__PLUGIN_SLUG__'),
		'numeric'      => __('Value needs to be Numeric', '__PLUGIN_SLUG__'),
		'email'        => __('Value needs to be Valid Email', '__PLUGIN_SLUG__'),
		'url'          => __('Value needs to be Valid URL', '__PLUGIN_SLUG__'),
		'maxlength'    => __('Length needs to be less than {0} characters', '__PLUGIN_SLUG__'),
		'minlength'    => __('Length needs to be more than {0} characters', '__PLUGIN_SLUG__'),
		'maxselected'  => __('Select no more than {0} items', '__PLUGIN_SLUG__'),
		'minselected'  => __('Select at least {0} items', '__PLUGIN_SLUG__'),
		'required'     => __('This is required', '__PLUGIN_SLUG__'),
	),

	/**
	 * Import / Export Messages
	 */
	'util' => array(
		'import_success'    => __('Import succeed, option page will be refreshed..', '__PLUGIN_SLUG__'),
		'import_failed'     => __('Import failed', '__PLUGIN_SLUG__'),
		'export_success'    => __('Export succeed, copy the JSON formatted options', '__PLUGIN_SLUG__'),
		'export_failed'     => __('Export failed', '__PLUGIN_SLUG__'),
		'restore_success'   => __('Restoration succeed, option page will be refreshed..', '__PLUGIN_SLUG__'),
		'restore_nochanges' => __('Options identical to default', '__PLUGIN_SLUG__'),
		'restore_failed'    => __('Restoration failed', '__PLUGIN_SLUG__'),
	),

	/**
	 * Control Fields String
	 */
	'control' => array(
		// select2 select box
		'select2_placeholder' => __('Select option(s)', '__PLUGIN_SLUG__'),
		// fontawesome chooser
		'fac_placeholder'     => __('Select an Icon', '__PLUGIN_SLUG__'),
	),

);

/**
 * EOF
 */