;(function($) {

	"use strict";

	// jQuery hacks
	var _addClass = $.fn.addClass;
	$.fn.addClass = function() {
		var result = _addClass.apply( this, arguments );
		if (this.prop('tagName') == 'BODY' && arguments[0] == 'folded') { calculatePositionAndSize(); }
		return result;
	};
	var _removeClass = $.fn.removeClass;
	$.fn.removeClass = function() {
		var result = _removeClass.apply( this, arguments );
		if (this.prop('tagName') == 'BODY' && arguments[0] == 'folded') { calculatePositionAndSize(); }
		return result;
	};

	var is_ie      = $.browser.msie;
	var ie_version = 0;

	if(is_ie)
	{
		ie_version = jQuery.browser.version;
		ie_version = parseFloat(ie_version);
	}

	// custom checkbox and radiobutton event binding
	favpress.custom_check_radio_event(".favpress-wrap", ".favpress-field.favpress-checked-field .field .input label");

	$(document).on('ready', function(){
		favpress.init_controls($('.favpress-wrap'));
	});

	/* BEGIN FETCHING ALL FIELDS' VALIDATION and BINDING RULES */
	var validation    = [];
	var bindings      = [];
	var items_binding = [];
	var dependencies  = [];
	var dep;
	$('.favpress-menu-goto').each(function(i) {
		var href = $(this).attr('href'),
		    $panel = $(href),
		    fields = [];

		$panel.children('.favpress-field').each(function(j) {
				var $field = $(this),
				name       = $field.attr('id'),
				rules      = $field.attr('data-favpress-validation'),
				bind       = $field.attr('data-favpress-bind'),
				items_bind = $field.attr('data-favpress-items-bind'),
				type       = $field.getDatas().type,
				$input     = $('[name="' + name + '"]');

			dep = $field.attr('data-favpress-dependency');

			dep         && dependencies.push({dep: dep, type: 'field', source: $field.attr('id')});
			bind        && bindings.push({bind: bind, type: type, source: name});
			items_bind  && items_binding.push({bind: items_bind, type: type, source: name});
			rules       && fields.push({name: name, rules: rules, type: type});
		});

		$panel.children('.favpress-section').each(function(i) {
			var $section = $(this);

			dep = $section.attr('data-favpress-dependency');
			dep && dependencies.push({dep: dep, type: 'section', source: $section.attr('id')});

			$section.find('.favpress-field').each(function(j) {
				var $field     = $(this),
					name       = $field.attr('id'),
					rules      = $field.attr('data-favpress-validation'),
					bind       = $field.attr('data-favpress-bind'),
					items_bind = $field.attr('data-favpress-items-bind'),
					type       = $field.getDatas().type,
					$input     = $('[name="' + name + '"]');

				dep = $field.attr('data-favpress-dependency');

				dep         && dependencies.push({dep: dep, type: 'field', source: $field.attr('id')});
				bind        && bindings.push({bind: bind, type: type, source: name});
				items_bind  && items_binding.push({bind: items_bind, type: type, source: name});
				rules       && fields.push({name: name, rules: rules, type: type});

			});
		});

		if (fields.length > 0) validation.push({ name: href.trimChar('#'), fields: fields });
	});
	/* END FETCHING ALL FIELDS' VALIDATION and BINDING RULES */

	// get and click current hash
	$('.favpress-js-menu-goto').click(function(e) {
		e.preventDefault();
		// add `_` prefix
		window.location.hash = '#_' + $(this).attr('href').substr(1);
		var $this     = $(this),
		    $li       = $this.parent('li'),
		    $parent   = $li.parents('li'),
		    $siblings = $li.siblings('li'),
		    $parent_siblings = $parent.siblings('li'),
		    $panel    = $($this.attr('href'));
		$siblings.removeClass('favpress-current');
		$parent_siblings.removeClass('favpress-current');
		$parent.addClass('favpress-current');
		$li.addClass('favpress-current');
		$panel.siblings('.favpress-panel').removeClass('favpress-current');
		$panel.addClass('favpress-current');
	});

	// goto current menu
	var hash = window.location.hash;
	if (hash !== '')
	{
		// remove `_` prefix
		hash = '#' + hash.substr(2);
		$('a[href="' + hash + '"]').trigger('click');
	}
	else
	{
		$('.favpress-current > .favpress-js-menu-goto').click();
	}

	$('.favpress-js-menu-dropdown').click(function(e) {
		e.preventDefault();
		var $this = $(this),
		    $parent = $this.parent('li'),
		    $li = $parent.siblings('li'),
		    $sub = $this.next('ul');
		if ($parent.hasClass('favpress-current')) return;
		$li.removeClass('favpress-current');
		$parent.addClass('favpress-current');
		if($sub.children('li.favpress-current').exists())
			$sub.children('li.favpress-current').children('a').click();
		else
			$sub.children('li').first().children('a').click();
	});

	// Bindings
	for (var i = 0; i < bindings.length; i++)
	{
		var field = bindings[i],
		    temp  = field.bind.split('|'),
		    func  = temp[0],
		    dest  = temp[1],
		    ids   = [];

		dest = dest.split(/[\s,]+/);

		for (var j = 0; j < dest.length; j++)
		{
			ids.push(dest[j]);
		}

		for (var j = 0; j < ids.length; j++)
		{
			favpress.binding_event(ids, j, field, func, '.favpress-wrap', 'option');
		}
	}
	/* ============================================================ */

	// Items Binding
	for (var i = 0; i < items_binding.length; i++)
	{
		var field = items_binding[i],
		    temp  = field.bind.split('|'),
		    func  = temp[0],
		    dest  = temp[1],
		    ids   = [];

		dest = dest.split(/[\s,]+/);

		for (var j = 0; j < dest.length; j++)
		{
			ids.push(dest[j]);
		}

		for (var j = 0; j < ids.length; j++)
		{
			favpress.items_binding_event(ids, j, field, func, '.favpress-wrap', 'option');
		}
	}
	/* ============================================================ */

	// DEPENDENCY
	for (var i = 0; i < dependencies.length; i++)
	{
		var field = dependencies[i],
		    temp  = field.dep.split('|'),
		    func  = temp[0],
		    dest  = temp[1],
		    ids   = [];

		dest = dest.split(',');

		for (var j = 0; j < dest.length; j++)
		{
			ids.push(dest[j]);
		}

		for (var j = 0; j < ids.length; j++)
		{
			favpress.dependency_event(ids, j, field, func, '.favpress-wrap');
		}
	}

	// Ajax Saving
	$('.favpress-js-option-form').bind('submit', function(e) {
		e.preventDefault();
		
		// update tinyMCE textarea content
		favpress.tinyMCE_save();

		$('.favpress-js-option-form .favpress-field').removeClass('favpress-error');
		$('.validation-notif.favpress-error').remove();
		$('.validation-msg.favpress-error').remove();

		var allError = 0,
		    menuNotifHTML = '<em class="validation-notif favpress-error"></em>';

		for (var i=0; i<validation.length; i++)
		{
			var panel = validation[i];

			panel.nError = 0;
			panel.nError = favpress.fields_validation_loop(panel.fields);

			if (panel.nError > 0)
			{
				// notify the menu which has the href
				var $notif  = $(menuNotifHTML),
				    $anchor = $('[href="#' + panel.name +'"]'),
				    $grandparent = $anchor.parent('li').parent('ul');
				$notif.appendTo($anchor);
				if ($grandparent.hasClass('favpress-menu-level-2'))
				{
					if ($grandparent.siblings('a').children('.validation-notif.favpress-error').length === 0)
					{
						$notif.clone().appendTo($grandparent.siblings('a'));
					}
				}
			}
			allError = allError + panel.nError;
		}

		// do not saving it any error occurs
		if (allError > 0) { return; }

		// otherwise, do saving
		var $loading = $('.favpress-js-save-loader'),
			$button = $(this).find('.favpress-save'),
			$save_status = $('.favpress-js-save-status'),
			$form = $('#favpress-option-form'),
			option = $form.serializeArray(),
			data = {
				action: 'favpress_ajax_' + favpress_opt.name + '_save',
				option: option,
				nonce : favpress_opt.nonce
			};

		$button.attr('disabled', 'disabled');
		$loading.stop(true, true).fadeIn(100);

		$.post(ajaxurl, data, function(response) {
			$save_status.html(response.message);
			if (response.status)
			{
				$save_status.addClass('success');
			}
			else
			{
				$save_status.addClass('failed');
			}
			$loading.stop(true, true).fadeOut(100, function() {
				$save_status.stop(true, true).fadeIn(100);
			});

			setTimeout(function() {
				$button.removeAttr('disabled');
				$save_status.stop(true, true).fadeOut(1000, function() {
					$save_status.removeClass('success').removeClass('failed');
				});
			}, 3000);
		}, 'JSON');

	});

	$('.favpress-js-restore').bind('click', function(e) {
		e.preventDefault();

		if (!confirm('The current options will be deleted, do you want to proceed?'))
			return;

		var $button = $(this),
		    $parent = $button.parent(),
		    $status = $parent.find('.favpress-js-status'),
		    $loader = $parent.find('.favpress-js-loader'),
		    data    = {action: 'favpress_ajax_' + favpress_opt.name + '_restore', nonce : favpress_opt.nonce};

		$button.attr('disabled', 'disabled');
		$loader.fadeIn(100);

		$.post(ajaxurl, data, function(response) {
			$loader.fadeOut(0);
			switch(response.code)
			{
				case parseInt(favpress_opt.SAVE_SUCCESS):
					$status.html(favpress_opt.util_msg.restore_success);
					break;
				case parseInt(favpress_opt.SAVE_NOCHANGES):
					$status.html(favpress_opt.util_msg.restore_nochanges);
					break;
				case parseInt(favpress_opt.SAVE_FAILED):
					$status.html(favpress_opt.util_msg.restore_failed + ': ' + response.message);
					break;
			}
			$status.fadeIn(100);
			setTimeout(function() {
				$status.fadeOut(1000, function() {
					$button.removeAttr('disabled');
					$status.fadeOut(500);
					if (response.code == parseInt(favpress_opt.SAVE_SUCCESS))
						location.reload();
				});
			}, 2000);
		}, 'JSON');
	});

	$('#favpress-js-import').bind('click', function(e) {
		e.preventDefault();

		var $textarea      = $('#favpress-js-import_text'),
		    $import_status = $('#favpress-js-import-status'),
		    $import_loader = $('#favpress-js-import-loader'),
		    $button        = $(this),
		    data           = {action: 'favpress_ajax_' + favpress_opt.name + '_import_option', option: $textarea.val(), nonce : favpress_opt.nonce};

		$button.attr('disabled', 'disabled');
		$import_loader.fadeIn(100);

		$.post(ajaxurl, data, function(response) {
			$import_loader.fadeOut(0);
			if (response.status)
			{
				$import_status.html(favpress_opt.util_msg.import_success);
			}
			else
			{
				$import_status.html(favpress_opt.util_msg.import_failed + ': ' + response.message);
			}
			$import_status.fadeIn(100);
			setTimeout(function() {
				$import_status.fadeOut(1000, function() {
					$button.removeAttr('disabled');
					$import_status.fadeOut(500);
					if (response.status)
						location.reload();
				});
			}, 2000);
		}, 'JSON');
	});

	$('#favpress-js-export').bind('click', function(e) {
		e.preventDefault();

		var $export_status = $('#favpress-js-export-status'),
		    $export_loader = $('#favpress-js-export-loader'),
		    $button        = $(this),
		    data           = {action: 'favpress_ajax_' + favpress_opt.name + '_export_option', nonce : favpress_opt.nonce};

		$button.attr('disabled', 'disabled');
		$export_loader.fadeIn(100);
		$.post(ajaxurl, data, function(response) {
			$export_loader.fadeOut(0);
			if (!$.isEmptyObject(response.option) && response.status)
			{
				$('#favpress-js-export_text').val(response.option);
				$export_status.html(favpress_opt.util_msg.export_success);
			}
			else
			{
				$export_status.html(favpress_opt.util_msg.export_failed + ': ' + response.message);
			}
			$export_status.fadeIn(100);
			setTimeout(function() {
				$export_status.fadeOut(1000, function() {
					$button.removeAttr('disabled');
					$export_status.fadeOut(500);
				});
			}, 3000);
		}, 'JSON');
	});


}(jQuery));