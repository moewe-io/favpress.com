<?php if (!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

    <div class="customEditor">
        <?php wp_editor($value, $name .'_ce', $opt_raw); ?>
    </div>

<?php if (!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot', $head_info); ?>