<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

<input data-favpress-opt="<?php esc_attr_e($opt); ?>" type="text" name="<?php esc_attr_e($name) ?>" class="favpress-input favpress-js-datepicker" />

<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot', $head_info); ?>