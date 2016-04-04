<?php

class FavPress_Control_Field_Fontawesome extends FavPress_Control_FieldMulti
{

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
		$arr['items']['data'][] = array(
			'source' => 'function',
			'value' => 'favpress_get_fontawesome_icons',
		);

		$instance->_basic_make($arr);
		
		return $instance;
	}

	public function render($is_compact = false)
	{
		$this->_setup_data();
		$this->add_data('is_compact', $is_compact);
		return FavPress_View::instance()->load('control/fontawesome', $this->get_data());
	}

}

/**
 * EOF
 */