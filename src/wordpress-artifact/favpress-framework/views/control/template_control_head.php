<div
    class="favpress-field <?php echo $type; ?><?php echo !empty($container_extra_classes) ? (' ' . $container_extra_classes) : ''; ?>"
    data-favpress-type="<?php echo $type; ?>"
    <?php echo FavPress_Util_Text::print_if_exists($validation, 'data-favpress-validation="%s"'); ?>
    <?php echo FavPress_Util_Text::print_if_exists(isset($binding) ? $binding : '', 'data-favpress-bind="%s"'); ?>
    <?php echo FavPress_Util_Text::print_if_exists(isset($items_binding) ? $items_binding : '', 'data-favpress-items-bind="%s"'); ?>
    <?php echo FavPress_Util_Text::print_if_exists(isset($dependency) ? $dependency : '', 'data-favpress-dependency="%s"'); ?>
    id="<?php echo $name; ?>">
    <div class="label">
        <label>
            <?php echo $label; ?>
            <?php if (!empty($validation) && strpos($validation, 'required') !== false) {
                echo '<span class="required" title="' . __('required', 'favpress') . '">*</span>';
            } ?>
        </label>
    </div>
    <div class="field">
        <div class="input">
