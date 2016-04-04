<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_head', $head_info); ?>

<input type="text" name="<?php echo $name; ?>" class="favpress-input slideinput favpress-js-tipsy" original-title="Range between <?php echo $opt_raw['min']; ?> and <?php echo $opt_raw['max']; ?>" value="<?php echo $value; ?>" />
<div class="favpress-js-slider slidebar" id="<?php echo $name; ?>" data-favpress-opt="<?php echo $opt; ?>"></div>

<?php if(!$is_compact) echo FavPress_View::instance()->load('control/template_control_foot', $head_info); ?>