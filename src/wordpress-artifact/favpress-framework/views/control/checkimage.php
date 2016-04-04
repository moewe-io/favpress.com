<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

<?php foreach ($items as $item): ?>
<label>
	<?php $checked = (in_array($item->value, $value)); ?>
	<input <?php if($checked) echo 'checked'; ?> class="favpress-input<?php if($checked) echo " checked"; ?>" type="checkbox" name="<?php echo $name; ?>" value="<?php echo $item->value; ?>" />
	<img src="<?php echo FavPress_Util_Res::img($item->img); ?>" alt="<?php echo $item->label; ?>" class="favpress-js-tipsy image-item" style="<?php FavPress_Util_Text::print_if_exists($item_max_width, 'max-width: %spx; '); ?><?php FavPress_Util_Text::print_if_exists($item_max_height, 'max-height: %spx; '); ?>" original-title="<?php echo $item->label; ?>" />
</label>
<?php endforeach; ?>

<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot', $head_info); ?>