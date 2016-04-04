<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

<input type="text" name="<?php echo $name ?>" class="favpress-input input-large" value="<?php echo esc_attr($value); ?>" />

<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot', $head_info); ?>