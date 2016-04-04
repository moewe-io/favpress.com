<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

<textarea class="favpress-input" name="<?php echo $name; ?>"><?php echo esc_attr($value); ?></textarea>

<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot', $head_info); ?>