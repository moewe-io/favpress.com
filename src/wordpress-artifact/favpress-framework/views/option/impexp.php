<div class="favpress-field favpress-textarea" data-favpress-type="favpress-textarea">
	<div class="label">
		<label>
			<?php _e('Import', 'favpress') ?>
		</label>
		<div class="description">
			<p><?php _e('Import Options', 'favpress') ?></p>
		</div>
	</div>
	<div class="field">
		<div class="input">
			<textarea id="favpress-js-import_text"></textarea>
			<div class="buttons">
				<input id="favpress-js-import" class="favpress-button button" type="button" value="<?php _e('Import', 'favpress') ?>" />
				<span style="margin-left: 10px;">
					<span id="favpress-js-import-loader" class="favpress-field-loader" style="display: none;"><img src="<?php FavPress_Util_Res::img_out('ajax-loader.gif', ''); ?>" style="vertical-align: middle;"></span>
					<span id="favpress-js-import-status" style="display: none;"></span>
				</span>
			</div>
		</div>
	</div>
</div>

<div class="favpress-field favpress-textarea" data-favpress-type="favpress-textarea">
	<div class="label">
		<label>
			<?php _e('Export', 'favpress') ?>
		</label>
		<div class="description">
			<p><?php _e('Export Options', 'favpress') ?></p>
		</div>
	</div>
	<div class="field">
		<div class="input">
			<textarea id="favpress-js-export_text" onclick="this.focus();this.select()" readonly="readonly"></textarea>
			<div class="buttons">
				<input id="favpress-js-export" class="favpress-button button" type="button" value="<?php _e('Export', 'favpress') ?>" />
				<span style="margin-left: 10px;">
					<span id="favpress-js-export-loader" class="favpress-field-loader" style="display: none;"><img src="<?php FavPress_Util_Res::img_out('ajax-loader.gif', ''); ?>" style="vertical-align: middle;"></span>
					<span id="favpress-js-export-status" style="display: none;"></span>
				</span>
			</div>
		</div>
	</div>
</div>
