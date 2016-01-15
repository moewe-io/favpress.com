<div <?php FavPress_Util_Text::print_if_exists($section->get_name(), 'id="%s" '); ?>
	class="favpress-section<?php echo !empty($container_extra_classes) ? (' ' . $container_extra_classes) : ''; ?>"
	<?php echo FavPress_Util_Text::print_if_exists($section->get_dependency(), 'data-favpress-dependency="%s"'); ?> >
	<?php FavPress_Util_Text::print_if_exists($section->get_title(), '<h3>%s</h3>'); ?>
	<?php FavPress_Util_Text::print_if_exists($section->get_description(), '<span class="description favpress-js-tipsy" original-title="%s"></span>'); ?>
	<div class="favpress-controls">
		<?php foreach ($section->get_fields() as $field): ?>
		<?php echo $field->render(); ?>
		<?php endforeach; ?>
	</div>
</div>