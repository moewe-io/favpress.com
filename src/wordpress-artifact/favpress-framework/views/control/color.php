<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

<label class="indicator" for="<?php echo $name; ?>"><span style="background-color: <?php echo $value; ?>;"></span></label>
<input id="<?php echo $name; ?>" class="favpress-input favpress-js-colorpicker"
	type="text" name="<?php echo $name ?>" value="<?php echo $value; ?>" data-favpress-opt="<?php echo $opt; ?>" />

<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot'); ?>