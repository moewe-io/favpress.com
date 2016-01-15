<?php

class FavPress_Control_Field_CheckImage extends FavPress_Control_FieldMultiImage implements FavPress_MultiSelectable
{

	public function __construct()
	{
		parent::__construct();
		$this->_value = array();
		$this->add_container_extra_classes('favpress-checked-field');
	}

	public static function withArray($arr = array(), $class_name = null)
	{
		if(is_null($class_name))
			$instance = new self();
		else
			$instance = new $class_name;
		$instance->_basic_make($arr);
		return $instance;
	}

	public function render($is_compact = false)
	{
		$this->_setup_data();
		$this->add_data('is_compact', $is_compact);
		return FavPress_View::instance()->load('control/checkimage', $this->get_data());
	}

}

/**
 * EOF
 */