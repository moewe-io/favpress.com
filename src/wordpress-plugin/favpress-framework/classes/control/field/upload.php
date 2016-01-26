<?php

define('CONTROL_FIELD_UPLOAD_MODE_KEY', 'mode');
define('CONTROL_FIELD_UPLOAD_MODE_VALUE_ID', 'id');
define('CONTROL_FIELD_UPLOAD_MODE_VALUE_URL', 'url');

class FavPress_Control_Field_Upload extends FavPress_Control_Field
{

	/**
	 * Mode of the field id (default) or url
	 * @var String
	 */
	protected $_mode = CONTROL_FIELD_UPLOAD_MODE_VALUE_ID;

	public function __construct()
	{
		parent::__construct();
	}

	public static function withArray($arr = array(), $class_name = null)
	{
		if(is_null($class_name))
			$instance = new self();
		else
			$instance = new $class_name;

		$instance->_basic_make($arr);

		if(array_key_exists(CONTROL_FIELD_UPLOAD_MODE_KEY, $arr)
			&& $arr[CONTROL_FIELD_UPLOAD_MODE_KEY] == CONTROL_FIELD_UPLOAD_MODE_VALUE_URL) {
			$instance->_mode = CONTROL_FIELD_UPLOAD_MODE_VALUE_URL;
		}

		return $instance;
	}

	public function _setup_data()
	{
		if($this->_mode == CONTROL_FIELD_UPLOAD_MODE_VALUE_URL) {
			$preview = FavPress_Util_Res::get_preview_from_url($this->get_value());
		} else {
			$preview = wp_get_attachment_image_src($this->get_value(),'full')[0];
		}
		$this->add_data('preview', $preview);
		parent::_setup_data();
	}

	public function render($is_compact = false)
	{
		$this->_setup_data();
		$this->add_data('is_compact', $is_compact);
		$this->add_data('mode', $this->_mode);
		return FavPress_View::instance()->load('control/upload', $this->get_data());
	}

}

/**
 * EOF
 */