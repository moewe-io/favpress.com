<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

<textarea class="favpress-input" name="<?php echo $name; ?>" style="display: none;"><?php echo $value; ?></textarea>
<div class="favpress-js-codeeditor" data-favpress-opt="<?php echo $opt; ?>"></div>

<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot', $head_info); ?>