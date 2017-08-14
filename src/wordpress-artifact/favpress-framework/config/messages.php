<?php

return array(

	////////////////////////////////////////
	// Localized JS Message Configuration //
	////////////////////////////////////////

	/**
	 * Validation Messages
	 */
	'validation' => array(
		'alphabet'     => __('Value needs to be Alphabet', 'favpress'),
		'alphanumeric' => __('Value needs to be Alphanumeric', 'favpress'),
		'numeric'      => __('Value needs to be Numeric', 'favpress'),
		'email'        => __('Value needs to be Valid Email', 'favpress'),
		'url'          => __('Value needs to be Valid URL', 'favpress'),
		'maxlength'    => __('Length needs to be less than {0} characters', 'favpress'),
		'minlength'    => __('Length needs to be more than {0} characters', 'favpress'),
		'maxselected'  => __('Select no more than {0} items', 'favpress'),
		'minselected'  => __('Select at least {0} items', 'favpress'),
		'required'     => __('This is required', 'favpress'),
	),

	/**
	 * Import / Export Messages
	 */
	'util' => array(
		'import_success'    => __('Import succeed, option page will be refreshed..', 'favpress'),
		'import_failed'     => __('Import failed', 'favpress'),
		'export_success'    => __('Export succeed, copy the JSON formatted options', 'favpress'),
		'export_failed'     => __('Export failed', 'favpress'),
		'restore_success'   => __('Restoration succeed, option page will be refreshed..', 'favpress'),
		'restore_nochanges' => __('Options identical to default', 'favpress'),
		'restore_failed'    => __('Restoration failed', 'favpress'),
	),

	/**
	 * Control Fields String
	 */
	'control' => array(
		// select2 select box
		'select2_placeholder' => __('Select option(s)', 'favpress'),
		// fontawesome chooser
		'fac_placeholder'     => __('Select an Icon', 'favpress'),
	),

);

/**
 * EOF
 */
