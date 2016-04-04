<?php

/**
 * For singleton accessor, use FavPress_WP_MassEnqueuer class instead.
 */
class FavPress_WP_MassEnqueuer
{
	private static $_instance = null;

	public static function instance()
	{
		if(self::$_instance == null)
		{
			self::$_instance = new FavPress_WP_Enqueuer();
		}
		return self::$_instance;
	}

}