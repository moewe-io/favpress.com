<?php extract($head_info); ?>

<div class="favpress-field <?php echo $type; ?><?php echo !empty($container_extra_classes) ? (' ' . $container_extra_classes) : ''; ?>"
	data-favpress-type="<?php echo $type; ?>"
	<?php echo FavPress_Util_Text::print_if_exists(isset($binding) ? $binding : '', 'data-favpress-bind="%s"'); ?>
	<?php echo FavPress_Util_Text::print_if_exists(isset($dependency) ? $dependency : '', 'data-favpress-dependency="%s"'); ?>
	id="<?php echo $name; ?>">
	<div class="field" style="height: <?php echo $height; ?>;">
		<div class="input" id="<?php echo $name . '_dom'; ?>">
			<?php echo FavPress_WP_Util::kses_html($value); ?>
		</div>
		<textarea name="<?php echo $name; ?>" class="favpress-hide"><?php echo FavPress_WP_Util::kses_html($value); ?></textarea>
		<div class="favpress-js-bind-loader favpress-field-loader favpress-hide"><img src="<?php FavPress_Util_Res::img_out('ajax-loader.gif', ''); ?>" /></div>
	</div>
</div>