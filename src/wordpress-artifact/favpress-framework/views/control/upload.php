<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

<?php if($mode == CONTROL_FIELD_UPLOAD_MODE_VALUE_ID) : ?>
    <input class="favpress-input" type="text" data-mode="<?php echo $mode ?>" readonly id="<?php echo $name; ?>" name="<?php echo $name; ?>" value="<?php echo $value; ?>" />
<?php else : ?>
    <input class="favpress-input" type="text" data-mode="<?php echo $mode ?>" readonly id="<?php echo $name; ?>" name="<?php echo $name; ?>" value="<?php echo $value; ?>" />
<?php endif; ?>

<div class="buttons">
	<input class="favpress-js-upload favpress-button button" type="button" value="<?php _e('Choose File', '__PLUGIN_SLUG__'); ?>" />
	<input class="favpress-js-remove-upload favpress-button button" type="button" value="x" />
</div>
<div class="image">
	<img src="<?php echo $preview; ?>" alt="" />
</div>

<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot', $head_info); ?>