<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

<select name="<?php echo $name; ?>" class="favpress-input favpress-js-fontawesome favpress-fontawesome" autocomplete="off">
	<option></option>
	<?php foreach ($items as $item): ?>
	<option <?php if($item->value == $value) echo "selected" ?> value="<?php echo $item->value; ?>"><?php echo $item->label; ?></option>
	<?php endforeach; ?>
</select>

<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot'); ?>