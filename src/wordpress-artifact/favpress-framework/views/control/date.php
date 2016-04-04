<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

<input <?php echo "data-favpress-opt='" . $opt . "'"; ?> type="text" name="<?php echo $name ?>" class="favpress-input favpress-js-datepicker" />

<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot', $head_info); ?>