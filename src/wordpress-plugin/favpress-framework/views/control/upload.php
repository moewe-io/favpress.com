<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

<input class="favpress-input" type="text" readonly id="<?php echo $name; ?>" name="<?php echo $name; ?>" value="<?php echo $value; ?>" />
<div class="buttons">
	<input class="favpress-js-upload favpress-button button" type="button" value="<?php _e('Choose File', '__PLUGIN_SLUG__'); ?>" />
	<input class="favpress-js-remove-upload favpress-button button" type="button" value="x" />
</div>
<div class="image">
	<img src="<?php echo $preview; ?>" alt="" />
</div>

<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot'); ?>