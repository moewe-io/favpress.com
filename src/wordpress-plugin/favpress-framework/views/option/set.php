<div class="wrap">
	<h2><?php echo $set->get_title(); ?></h2>
	<div id="favpress-wrap" class="favpress-wrap">
		<div id="favpress-option-panel"class="favpress-option-panel <?php echo ($set->get_layout() === 'fixed') ? 'fixed-layout' : 'fluid-layout' ; ?>">
			<div class="favpress-left-panel">
				<div id="favpress-logo" class="favpress-logo">
					<img src="<?php echo FavPress_Util_Res::img($set->get_logo()); ?>" alt="<?php echo $set->get_title(); ?>" />
				</div>
				<div id="favpress-menus" class="favpress-menus">
					<ul class="favpress-menu-level-1">
						<?php foreach ($set->get_menus() as $menu): ?>
						<?php $menus          = $set->get_menus(); ?>
						<?php $is_first_lvl_1 = $menu === reset($menus); ?>
						<?php if ($is_first_lvl_1): ?>
						<li class="favpress-current">
						<?php else: ?>
						<li>
						<?php endif; ?>
							<?php if ($menu->get_menus()): ?>
							<a href="#<?php echo $menu->get_name(); ?>" class="favpress-js-menu-dropdown favpress-menu-dropdown">
							<?php else: ?>
							<a href="#<?php echo $menu->get_name(); ?>" class="favpress-js-menu-goto favpress-menu-goto">
							<?php endif; ?>
								<?php
								$icon = $menu->get_icon();
								$font_awesome = FavPress_Util_Res::is_font_awesome($icon);
								if ($font_awesome !== false):
									FavPress_Util_Text::print_if_exists($font_awesome, '<i class="fa %s"></i>');
								else:
									FavPress_Util_Text::print_if_exists(FavPress_Util_Res::img($icon), '<i class="custom-menu-icon" style="background-image: url(\'%s\');"></i>');
								endif;
								?>
								<span><?php echo $menu->get_title(); ?></span>
							</a>
							<?php if ($menu->get_menus()): ?>
							<ul class="favpress-menu-level-2">
								<?php foreach ($menu->get_menus() as $submenu): ?>
								<?php $submenus = $menu->get_menus(); ?>
								<?php if ($is_first_lvl_1 and $submenu === reset($submenus)): ?>
								<li class="favpress-current">
								<?php else: ?>
								<li>
								<?php endif; ?>
									<a href="#<?php echo $submenu->get_name(); ?>" class="favpress-js-menu-goto favpress-menu-goto">
										<?php
										$sub_icon = $submenu->get_icon();
										$font_awesome = FavPress_Util_Res::is_font_awesome($sub_icon);
										if ($font_awesome !== false):
											FavPress_Util_Text::print_if_exists($font_awesome, '<i class="fa %s"></i>');
										else:
											FavPress_Util_Text::print_if_exists(FavPress_Util_Res::img($sub_icon), '<i class="custom-menu-icon" style="background-image: url(\'%s\');"></i>');
										endif;
										?>
										<span><?php echo $submenu->get_title(); ?></span>
									</a>
								</li>
								<?php endforeach; ?>
							</ul>
							<?php endif; ?>
						</li>
						<?php endforeach; ?>
					</ul>
				</div>
			</div>
			<div class="favpress-right-panel">
				<form id="favpress-option-form" class="favpress-option-form favpress-js-option-form" method="POST">
					<div id="favpress-submit-top" class="favpress-submit top">
						<div class="inner">
							<input class="favpress-save favpress-button button button-primary" type="submit" value="<?php _e('Save Changes', '__PLUGIN_SLUG__'); ?>" />
							<p class="favpress-js-save-loader save-loader" style="display: none;"><img src="<?php FavPress_Util_Res::img_out('ajax-loader.gif', ''); ?>" /><?php _e('Saving Now', '__PLUGIN_SLUG__'); ?></p>
							<p class="favpress-js-save-status save-status" style="display: none;"></p>
						</div>
					</div>
					<?php foreach ($set->get_menus() as $menu): ?>
					<?php $menus = $set->get_menus(); ?>
					<?php if ($menu === reset($menus)): ?>
						<?php echo $menu->render(array('current' => 1)); ?>
					<?php else: ?>
						<?php echo $menu->render(array('current' => 0)); ?>
					<?php endif; ?>
					<?php endforeach; ?>
					<div id="favpress-submit-bottom" class="favpress-submit bottom">
						<div class="inner">
							<input class="favpress-save favpress-button button button-primary" type="submit" value="<?php _e('Save Changes', '__PLUGIN_SLUG__'); ?>" />
							<p class="favpress-js-save-loader save-loader" style="display: none;"><img src="<?php FavPress_Util_Res::img_out('ajax-loader.gif', ''); ?>" /><?php _e('Saving Now', '__PLUGIN_SLUG__'); ?></p>
							<p class="favpress-js-save-status save-status" style="display: none;"></p>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div id="favpress-copyright" class="favpress-copyright">
			<p><?php printf(__('This option panel is built using <a href="http://favpress.com/">Favpress %s</a>', '__PLUGIN_SLUG__'), FAVPRESS_VERSION); ?></p>
		</div>
	</div>
</div>