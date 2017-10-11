/* =============================================================
 * JQuery or Other Extension
 * =============================================================
 */

"use strict";

jQuery.fn.getAttributes = function() {
	var attributes = {};
	if (!this.length)
		return this;
	jQuery.each(this[0].attributes, function(index, attr) {
		attributes[attr.name] = attr.value;
	});
	return attributes;
};
jQuery.fn.getDatas = function() {
	var attributes = {},
	    prefix = "data-favpress-";
	if (!this.length)
		return this;
	jQuery.each(this[0].attributes, function(index, attr) {
		if (attr.name.substring(0, prefix.length) == prefix)
		{
			attributes[attr.name.substring(prefix.length)] = attr.value;
		}
	});
	return attributes;
};
jQuery.fn.exists = function () {
	return this.length !== 0;
};
if (!String.prototype.trimChar) {
	String.prototype.trimChar =  function(string) { return this.replace(new RegExp('^' + string + '+|' + string + '+$', 'g'), ''); };
}
if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}
if (!String.prototype.replaceAll){
	/**
	 * ReplaceAll by Fagner Brack (MIT Licensed)
	 * Replaces all occurrences of a substring in a string
	 */
	String.prototype.replaceAll = function(token, newToken, ignoreCase) {
		var str, i = -1, _token;
		if((str = this.toString()) && typeof token === "string") {
			_token = ignoreCase === true? token.toLowerCase() : undefined;
			while((i = (
				_token !== undefined?
					str.toLowerCase().indexOf(
								_token,
								i >= 0? i + newToken.length : 0
					) : str.indexOf(
								token,
								i >= 0? i + newToken.length : 0
					)
			)) !== -1 ) {
				str = str.substring(0, i)
						 .concat(newToken)
						 .concat(str.substring(i + token.length));
			}
	    }
	return str;
	};
}
// Validation Functions
jQuery.fn.validationVal = function() {
	var $this = this,
	    val = '',
	    tagName = $this.prop('tagName'),
	    checked;

	if (($this.length > 1 && $this.attr('type') != 'radio') || $this.attr('multiple')) { val = []; }

	var initialVal = val;

	$this.each(function(i) {
		var $field = jQuery(this);

		switch (tagName)
		{
			case 'SELECT':
				if ($field.has('[multiple]'))
				{
					val = $field.val();
				}
				else
				{
					val = $field.val();
				}
				break;
			case 'INPUT':
				switch ($this.attr('type'))
				{
					case 'text':
						val = $field.val();
						break;
					case 'radio':
						checked = $field.prop('checked');
						if (typeof checked !== 'undefined' && checked !== false)
							val = $field.val();
						break;
					case 'checkbox':
						checked = $field.prop('checked');
						if ($this.length > 1)
						{
							if (typeof checked !== 'undefined' && checked !== false) { val.push($field.val()); } // multiple
						}
						else
						{
							val = null;
							if (typeof checked !== 'undefined' && checked !== false) { val = $field.val(); } // multiple
						}
						break;
				}
				break;
			case 'TEXTAREA':
				val = $field.val();
				break;
			default:
				val = $field.val();
				break;
		}
	});

	// quick fix trial
	if (val === null)
		val = initialVal;
	return val;
};

// hidding plugin
jQuery.fn.favpress_slideUp = function(callback){
	var $this = this;

	$this.each(function(i){
		var $el = jQuery(this);
		if(!$el.hasClass('favpress-hide'))
		{
			$el.slideUp('fast', function() {
				jQuery(this).addClass('favpress-hide')
				.slideDown(0, callback);
			});
		}
	});
};
jQuery.fn.favpress_slideDown = function(callback){
	var $this = this;

	$this.each(function(i){
		var $el = jQuery(this);
		if($el.hasClass('favpress-hide'))
		{
			$el.slideUp(0, function() {
				jQuery(this).removeClass('favpress-hide')
				.slideDown('fast', callback);
			});
		}
	});
};
jQuery.fn.favpress_fadeOut = function(callback){
	var $this = this;
	if(!$this.hasClass('favpress-hide'))
	{
		$this.fadeOut('fast', function() {
			jQuery(this).addClass('favpress-hide')
			.fadeIn(0, callback);
		});
	}
};
jQuery.fn.favpress_fadeIn = function(callback){
	var $this = this;
	if($this.hasClass('favpress-hide'))
	{
		$this.fadeOut(0,function() {
			jQuery(this).removeClass('favpress-hide')
			.fadeIn('fast', callback);
		});
	}
};
jQuery.fn.favpress_toggle = function(callback){
	var $this = this;
	if($this.hasClass('favpress-hide'))
	{
		$this.slideUp(0,function() {
			jQuery(this).removeClass('favpress-hide')
			.slideDown('fast', callback);
		});
	}
	else
	{
		$this.slideUp('fast', function() {
			jQuery(this).addClass('favpress-hide')
			.slideDown(0, callback);
		});
	}
};

/*
 * =============================================================
 */


/**
 * =============================================================
 * FavPress function
 * =============================================================
 */

/**
 * favpress global namespace
 */
var favpress = {};

favpress.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
favpress.parseOpt = function(optString) {
	var openIdx, closeIdx, temp, tempArr, opt = {};
	for (var i = 0; i < optString.length; i++)
	{
		if (optString[i] == '(')
		{
			openIdx = i;
		}
		if (optString[i] == ')')
		{
			closeIdx = i;
			temp = optString.substring(openIdx + 1, closeIdx);
			tempArr = temp.split(':');
			opt[tempArr[0]] = favpress.isNumber(tempArr[1]) ? parseFloat(tempArr[1]) : tempArr[1];
		}
	}
	return opt;
};

favpress.wp_ext2type = function (ext ) {
	var ext2type = {
		image       : ['jpg', 'jpeg', 'bmp',  'gif',  'png'],
		audio       : ['aac', 'ac3',  'aif',  'aiff', 'm3a',  'm4a',   'm4b',  'mka',  'mp1',  'mp2',  'mp3', 'ogg', 'oga', 'ram', 'wav', 'wma'],
		video       : ['asf', 'avi',  'divx', 'dv',   'flv',  'm4v',   'mkv',  'mov',  'mp4',  'mpeg', 'mpg', 'mpv', 'ogm', 'ogv', 'qt',  'rm', 'vob', 'wmv'],
		document    : ['doc', 'docx', 'docm', 'dotm', 'odt',  'pages', 'pdf',  'rtf',  'wp',   'wpd'],
		spreadsheet : ['numbers',     'ods',  'xls',  'xlsx', 'xlsm',  'xlsb'],
		interactive : ['swf', 'key',  'ppt',  'pptx', 'pptm', 'pps',   'ppsx', 'ppsm', 'sldx', 'sldm', 'odp'],
		text        : ['asc', 'csv',  'tsv',  'txt'],
		archive     : ['bz2', 'cab',  'dmg',  'gz',   'rar',  'sea',   'sit',  'sqx',  'tar',  'tgz',  'zip', '7z'],
		code        : ['css', 'htm',  'html', 'php',  'js']
	};

	var result = 'default';

	for(var type in ext2type)
	{
		if(ext2type.hasOwnProperty(type))
		{
			if(jQuery.inArray(ext, ext2type[type]) !== -1 )
			{
				result = type;
				break;
			}
		}
	}
	return result;
};

favpress.get_url_extension = function(url){
	var regex    = new RegExp(/(.*)[\/\\]([^\/\\]+)\.(\w+)/i);
	var url_info = regex.exec(url);
	if(url_info)
	{
		if (typeof url_info[3] != 'undefined')
		{
			return url_info[3];
		}
	}
	return '';
};

favpress.jqid = function(id) {
	return '#' + id.replace(/([:\.\[\]])/g,'\\$1');
};

favpress.jqidwild = function(id) {
	id = id.replace(/([:\.\[\]])/g,'\\$1');
	id = '[id*=' + id + ']';
	return id;
};

favpress.jqname = function(name) {
	return '[name="' + name + '"]';
};

favpress.jqnamewild = function(name) {
	return '[name*="' + name + '"]';
};

favpress.thejqid = function(id, thecase) {
	if(thecase === 'option')
		return favpress.jqid(id);
	if(thecase === 'metabox')
		return favpress.jqidwild(id);
	return id;
};

favpress.thejqname = function(name, thecase) {
	if(thecase === 'option')
		return favpress.jqname(name);
	if(thecase === 'metabox')
		return favpress.jqnamewild(name);
	return name;
};

favpress.validateAlphabet = function(type, val) {
	// ignore array and empty string, since they should be handled by 'required' rule
	if (val === '' || jQuery.isArray(val) || jQuery.inArray(type, favpress_wp.alphabet_validatable) == -1) { return true; }
	var regex = new RegExp(/^[A-Z\s]+$/i);
	return regex.test(val);
};

favpress.validateAlphaNumeric = function(type, val) {
	// ignore array and empty string, since they should be handled by 'required' rule
	if (val === '' || jQuery.isArray(val) || jQuery.inArray(type, favpress_wp.alphanumeric_validatable) == -1) { return true; }

	var regex = new RegExp(/^[A-Z0-9]+$/i);
	return regex.test(val);
};

favpress.validateNumeric = function(type, val) {
	// ignore array and empty string, since they should be handled by 'required' rule
	if (val === '' || jQuery.isArray(val) || jQuery.inArray(type, favpress_wp.numeric_validatable) == -1) { return true; }

	var regex = new RegExp(/^[-+]?[0-9]*\.?[0-9]+$/);
	return regex.test(val);
};

favpress.validateEmail = function(type, val) {
	// ignore array and empty string, since they should be handled by 'required' rule
	if (val === '' || jQuery.isArray(val) || jQuery.inArray(type, favpress_wp.email_validatable) == -1) { return true; }

	var regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
	return regex.test(val);
};

favpress.validateURL = function(type, val) {
	// ignore array and empty string, since they should be handled by 'required' rule
	if (val === '' || jQuery.isArray(val) || jQuery.inArray(type, favpress_wp.url_validatable) == -1) { return true; }

	var regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/i);
	return regex.test(val);
};

favpress.validateMaxLength = function(type, val, n) {
	// ignore array
	if (jQuery.inArray(type, favpress_wp.maxlength_validatable) != -1) { return true; }

	return (val.length <= n) ? true : false;
};

favpress.validateMinLength = function(type, val, n) {
	// ignore array
	if (jQuery.inArray(type, favpress_wp.minlength_validatable) != -1) { return true; }

	return (val.length >= n) ? true : false;
};

favpress.validateRequired = function(type, val) {
	// only check if it's empty array, if it's not, it will go true anyway..
	if (jQuery.isArray(val) && jQuery.isEmptyObject(val)) return false;
	return (val) ? true : false;
};

// validation function loop
favpress.fields_validation_loop = function(fields){

	var msgHTML = '<li class="validation-msg favpress-error"></li>',
		errors  = 0;

	for (var i = 0; i < fields.length; i++)
	{
		var field   = fields[i],
		    $tr     = jQuery(favpress.jqid(field.name)),
		    $parent = $tr.parents('.favpress-meta-group').exists() ? $tr.parents('.favpress-meta-group') : $tr.parents('.favpress-section');

		// if field is now deleted and not found
		if($tr.length <= 0)
			continue;

		// if field is inactive due to dependencies mechanism
		if($tr.hasClass('favpress-dep-inactive') || ($parent.exists() && $parent.hasClass('favpress-dep-inactive')))
			continue;

		var $msgs  = $tr.children('div.field').children('.validation-msgs').children('ul'),
		    $input = jQuery('[name="' + field.name + '"]'),
		    val    = $input.validationVal(),
		    type   = field.type,
		    rules  = field.rules.split('|');

		field.nError = 0;
		for (var j = 0; j < rules.length; j++)
		{
			var rule = rules[j],
			    q1 = rule.indexOf('['),
			    q2 = rule.indexOf(']'),
			    def = (q1 >= 0) ? rule.substring(0, q1) : rule,
			    res = '',
			    n;

			switch (def)
			{
				case 'alphabet':
					if (!favpress.validateAlphabet(type, val)) { res = favpress_wp.val_msg.alphabet.format(); }
					break;
				case 'alphanumeric':
					if (!favpress.validateAlphaNumeric(type, val)) { res = favpress_wp.val_msg.alphanumeric.format(); }
					break;
				case 'numeric':
					if (!favpress.validateNumeric(type, val)) { res = favpress_wp.val_msg.numeric.format(); }
					break;
				case 'email':
					if (!favpress.validateEmail(type, val)) { res = favpress_wp.val_msg.email.format(); }
					break;
				case 'url':
					if (!favpress.validateURL(type, val)) { res = favpress_wp.val_msg.url.format(); }
					break;
				case 'maxlength':
					n = rule.substring(q1 + 1, q2);
					if (!favpress.validateMaxLength(type, val, n)) { res = favpress_wp.val_msg.maxlength.format(n); }
					break;
				case 'minlength':
					n = rule.substring(q1 + 1, q2);
					if (!favpress.validateMinLength(type, val, n)) { res= favpress_wp.val_msg.minlength.format(n); }
					break;
				case 'maxselected':
					n = rule.substring(q1 + 1, q2);
					if (!favpress.validateMaxLength(type, val, n)) { res = favpress_wp.val_msg.maxselected.format(n); }
					break;
				case 'minselected':
					n = rule.substring(q1 + 1, q2);
					if (!favpress.validateMinLength(type, val, n)) { res= favpress_wp.val_msg.minselected.format(n); }
					break;
				case 'required':
					if (!favpress.validateRequired(type, val)) { res = favpress_wp.val_msg.required.format(); }
					break;
			}

			if (res !== '')
			{
				// push into errors pool
				field.nError += 1;

				// set message
				var $msg = jQuery(msgHTML);
				    $msg.html(res);
				    $msg.appendTo($msgs);
			}
		}

		if (field.nError > 0)
		{
			errors += 1;
			$tr.addClass('favpress-error');
		}
	}
	return errors;
};

// custom checkbox and radiobutton handler
favpress.custom_check_radio_event = function(parent, selector){
	jQuery(parent).delegate(selector, "click", function(e){
		e.preventDefault();
		var $control = jQuery(this).find('input'),
		    type = $control.attr('type');
		if(type == 'radio')
		{
			jQuery(this).parent().parent().find('input').each(function(i){
				jQuery(this).removeClass('checked');
				$control.prop('checked', false);
			});
			$control.prop('checked', true).change();
		}
		else if(type == 'checkbox')
		{
			if ($control.is(':checked'))
				$control.prop('checked', false);
			else
				$control.prop('checked', true);
			$control.trigger('change');
		}
	});
	jQuery(parent).delegate(selector, "change", function(e){
		e.preventDefault();
		var $control = jQuery(this).find('input');
		if ($control.is(':checked'))
			$control.addClass('checked');
		else
			$control.removeClass('checked');
	});
};

// favpress binding related functions
favpress.binding_action =	function(ids, field, func, thecase) {
	var $source_tr = jQuery(favpress.jqid(field.source)),
	    $source    = jQuery('[name="' + field.source + '"]'),
	    values     = [];

	for (var i = 0; i < ids.length; i++)
	{
		var val = jQuery(favpress.thejqname(ids[i], thecase)).validationVal();
		if (jQuery.isArray(val) && val.length == 0) {
			val = null;
		}
		values.push(val);
	}

	var data = {
		action   : 'favpress_ajax_wrapper',
		func     : func,
		params   : values
	};

	// get loader
	var $loader = $source_tr.find('.favpress-js-bind-loader'),
	    $input  = $source_tr.find('.input');

	if (field.type == 'favpress-html') {
		$loader.favpress_fadeIn();
	} else {
		$input.favpress_fadeOut(function(){
			$loader.favpress_fadeIn();
		});
	}

	jQuery.post(ajaxurl, data, function(response) {
		$loader.favpress_fadeOut(function(){
			$input.favpress_fadeIn();
		});
		if (response.status)
		{
			var data;
			switch(field.type)
			{
				case 'favpress-select':
				case 'favpress-multiselect':
					$source    = jQuery('[name="' + field.source + '"]');
					if(response.data !== null)
					{
						data = response.data instanceof Array ? response.data : [response.data];
						$source.val(data).change();
					}
					break;
				case 'favpress-checkbox':
					if(response.data !== null)
					{
						data = response.data instanceof Array ? response.data : [response.data];
						$source.prop('checked', false).change();
						jQuery.each(data, function(key, value) {
							$source.filter('[value="'+ value +'"]').prop('checked', true).change();
						});
					}
					break;
				case 'favpress-toggle':
					if(response.data !== null)
					{
						if(response.data)
							$source.prop('checked', true).change();
						else
							$source.prop('checked', false).change();
					}
					break;
				case 'favpress-checkimage':
					if(response.data !== null)
					{
						data = response.data instanceof Array ? response.data : [response.data];
						$source.prop('checked', false).change();
						jQuery.each(data, function(key, value) {
							$source.filter('[value="'+ value +'"]').prop('checked', true).change();
						});
					}
					favpress.init_tipsy();
					break;
				case 'favpress-radiobutton':
					if(response.data !== null)
					{
						data = response.data instanceof Array ? response.data : [response.data];
						$source.prop('checked', false).change();
						jQuery.each(data, function(key, value) {
							$source.filter('[value="'+ value +'"]').prop('checked', true).change();
						});
					}
					break;
				case 'favpress-radioimage':
					if(response.data !== null)
					{
						data = response.data instanceof Array ? response.data : [response.data];
						$source.prop('checked', false).change();
						jQuery.each(data, function(key, value) {
							$source.filter('[value="'+ value +'"]').prop('checked', true).change();
						});
					}
					favpress.init_tipsy();
					break;
				case 'favpress-html':
					if(response.data !== null)
					{
						jQuery(favpress.jqid(field.source + '_dom')).html(response.data);
						jQuery(favpress.jqname(field.source)).val(response.data);
					}
					break;
				default:
					$source = jQuery(favpress.jqname(field.source));
					$source.val(response.data);
			}
			jQuery('[name="' + field.source + '"]:first').keypress().keyup().change().blur();
		}
	}, 'JSON');
};

favpress.binding_event = function(ids, idx, field, func, parent, thecase)
{
	var change    = ['favpress-select', 'favpress-checkbox', 'favpress-checkimage', 'favpress-radiobutton', 'favpress-radioimage', 'favpress-multiselect', 'favpress-toggle', 'favpress-upload'],
	    typing    = ['favpress-textbox', 'favpress-slider', 'favpress-color', 'favpress-date'],
	    name      = favpress.thejqname(ids[idx], thecase),
	    dest_type = jQuery(favpress.thejqid(ids[idx], thecase)).attr('data-favpress-type');

	if(jQuery.inArray(dest_type, change) !== -1 )
	{
		jQuery(parent).delegate(name, 'change', function(){favpress.binding_action(ids, field, func, thecase);});
	}
	/*else if(jQuery.inArray(dest_type, typing) !== -1 )
	{
		jQuery(name).typing({
			stop: function(event, $elem){
				favpress.binding_action(ids, field, func, thecase);
			},
			delay: 400
		});
	}*/
    else if(jQuery.inArray(dest_type, typing) !== -1 )
    {
        jQuery(name).on('input', function(event, $elem){
            favpress.binding_action(ids, field, func, thecase);
        });
    }
    else if(jQuery.inArray(dest_type, typing) !== -1 )
    {
        jQuery(name).on('load', function(event, $elem){
            favpress.binding_action(ids, field, func, thecase);
        });
    }
	else
	{
		jQuery(parent).delegate(name, 'change', function(){favpress.binding_action(ids, field, func, thecase);});
	}
};

/*
 * =============================================================
 */

// favpress binding related functions
favpress.items_binding_action =	function(ids, field, func, thecase) {
	var $source_tr = jQuery(favpress.jqid(field.source)),
	    $source    = jQuery('[name="' + field.source + '"]'),
	    values     = [];

	for (var i = 0; i < ids.length; i++)
	{
		values.push(jQuery(favpress.thejqname(ids[i], thecase)).validationVal());
	}

	var data = {
		action   : 'favpress_ajax_wrapper',
		func     : func,
		params   : values
	};

	// get loader
	var $loader = $source_tr.find('.favpress-js-bind-loader'),
	    $input  = $source_tr.find('.input');

	$input.favpress_fadeOut(function(){
		$loader.favpress_fadeIn();
	});

	jQuery.post(ajaxurl, data, function(response) {
		$loader.favpress_fadeOut(function(){
			$input.favpress_fadeIn();
		});
		if (response.status)
		{
			var $source;
			switch(field.type)
			{
				case 'favpress-select':
				case 'favpress-multiselect':
					$source    = jQuery('[name="' + field.source + '"]');
					$source.empty();
					$source.append(jQuery("<option></option>"));
					response.data !== null && jQuery.each(response.data, function(key, value) {
						$source
							.append(jQuery("<option></option>")
							.attr("value",value.value)
							.text(value.label));
					});
					break;
				case 'favpress-checkbox':
					$source = $input;
					$source.empty();
					$source = jQuery(favpress.jqid(field.source)).find('.input');
					response.data !== null && jQuery.each(response.data, function(key, value) {
						$source.append(jQuery('<label><input class="favpress-input" type="checkbox" name="' + field.source + '" value="' + value.value + '"><span></span>'+ value.label + '</label>'));
					});
					break;
				case 'favpress-checkimage':
					$source = $input;
					$source.empty();
					$source = jQuery(favpress.jqid(field.source)).find('.input');
					response.data !== null && jQuery.each(response.data, function(key, value) {
						$source.append(jQuery('<label><input class="favpress-input" type="checkbox" name="' + field.source + '" value="' + value.value + '"><img src="' + value.img + '" alt="' + value.label + '" class="favpress-js-tipsy image-item" style="" original-title="' + value.value + '"></label>'));
					});
					favpress.init_tipsy();
					break;
				case 'favpress-radiobutton':
					$source = $input;
					$source.empty();
					$source = jQuery(favpress.jqid(field.source)).find('.input');
					response.data !== null && jQuery.each(response.data, function(key, value) {
						$source.append(jQuery('<label><input class="favpress-input" type="radio" name="' + field.source + '" value="' + value.value + '"><span></span>'+ value.label + '</label>'));
					});
					break;
				case 'favpress-radioimage':
					$source = $input;
					$source.empty();
					$source = jQuery(favpress.jqid(field.source)).find('.input');
					response.data !== null && jQuery.each(response.data, function(key, value) {
						$source.append(jQuery('<label><input class="favpress-input" type="radio" name="' + field.source + '" value="' + value.value + '"><img src="' + value.img + '" alt="' + value.label + '" class="favpress-js-tipsy image-item" style="" original-title="' + value.value + '"></label>'));
					});
					favpress.init_tipsy();
					break;
			}
			jQuery('[name="' + field.source + '"]:first').change().blur();
		}
	}, 'JSON');
};

favpress.items_binding_event = function(ids, idx, field, func, parent, thecase)
{
	var change    = ['favpress-select', 'favpress-checkbox', 'favpress-checkimage', 'favpress-radiobutton', 'favpress-radioimage', 'favpress-multiselect', 'favpress-toggle', 'favpress-upload'],
	    typing    = ['favpress-textbox', 'favpress-slider', 'favpress-color', 'favpress-date'],
	    name      = favpress.thejqname(ids[idx], thecase),
	    dest_type = jQuery(favpress.thejqid(ids[idx], thecase)).attr('data-favpress-type');

	if(jQuery.inArray(dest_type, change) !== -1 )
	{
		jQuery(parent).delegate(name, 'change', function(){favpress.items_binding_action(ids, field, func, thecase);});
	}
	else if(jQuery.inArray(dest_type, typing) !== -1 )
	{
		jQuery(name).typing({
			stop: function(event, $elem){
				favpress.items_binding_action(ids, field, func, thecase);
			},
			delay: 400
		});
	}
	else
	{
		jQuery(parent).delegate(name, 'change', function(){favpress.binding_action(ids, field, func, thecase);});
	}
};

/*
 * =============================================================
 */

// favpress dependencies related functions
favpress.dependency_action =	function(ids, field, func) {

	var $source_tr = jQuery(favpress.jqid(field.source)),
	    $source    = jQuery('[name="' + field.source + '"]'),
	    values     = [],
	    targets    = [];

	for (var i = 0; i < ids.length; i++)
	{
		targets.push(jQuery(favpress.jqid(ids[i])));
		values.push(jQuery('[name="' + ids[i] + '"]').validationVal());
	}

	var data = {
		action   : 'favpress_ajax_wrapper',
		func     : func,
		params   : values
	};

	// get loader
	jQuery.each(targets, function(idx, val){
		var $loader = val.find('.favpress-js-bind-loader');
		$loader.favpress_fadeIn();
	});

	jQuery.post(ajaxurl, data, function(response) {
		jQuery.each(targets, function(idx, val){
			var $loader = val.find('.favpress-js-bind-loader');
			$loader.favpress_fadeOut();
		});

		if (response.status)
		{
			if(response.data)
			{
				$source_tr.removeClass('favpress-dep-inactive');
				$source_tr.favpress_fadeIn();
			}
			else
			{
				$source_tr.addClass('favpress-dep-inactive');
				$source_tr.favpress_fadeOut();
			}
		}
	}, 'JSON');
};

favpress.dependency_event = function(ids, idx, field, func, parent){

	var change    = ['favpress-select', 'favpress-checkbox', 'favpress-checkimage', 'favpress-radiobutton', 'favpress-radioimage', 'favpress-multiselect', 'favpress-toggle', 'favpress-upload'],
	    typing    = ['favpress-textbox', 'favpress-slider', 'favpress-color', 'favpress-date'],
	    name      = favpress.thejqname(ids[idx], 'option'),
	    dest_type = jQuery(favpress.thejqid(ids[idx], 'option')).attr('data-favpress-type');

	if(jQuery.inArray(dest_type, change) !== -1 )
	{
		jQuery(parent).delegate(name, 'change', function(){favpress.dependency_action(ids, field, func);});
	}
	else if(jQuery.inArray(dest_type, typing) !== -1 )
	{
		jQuery(name).typing({
			stop: function(event, $elem){
				favpress.dependency_action(ids, field, func);
			},
			delay: 400
		});
	}
	else
	{
		jQuery(parent).delegate(name, 'change', function(){favpress.binding_action(ids, field, func, thecase);});
	}
};

/*
 * =============================================================
 */

/**
 * =============================================================
 * Control Fields JS Trigering
 * =============================================================
 */

function theValidate(elem, options, $slider)
{
	var $this = jQuery(elem),
	    val = $this.val();
	if(val === '')
		return;
	if (!favpress.validateNumeric('favpress-textbox', val))
	{
		$this.val(options.min);
		$slider.slider('value', options.min);
	}
	if (val > options.max)
	{
		$this.val(options.max);
		$slider.slider('value', options.max);
	}
	else if (val < options.min)
	{
		$this.val(options.min);
		$slider.slider('value', options.min);
	}
	else
	{
		$slider.slider('value', $this.val());
	}
}

favpress.init_slider = function($elements)
{
	if (jQuery.fn.slider)
	{
		$elements.each(function(i, el) {
			var $slider = jQuery(this),
			    options = jQuery(this).getDatas();
			options = favpress.parseOpt(options.opt);
			options.range = 'min';
			options.slide = function(event, ui) {
				$slider.prev('.slideinput').val(ui.value);
				$slider.prev('.slideinput').trigger('keypress');
				$slider.prev('.slideinput').trigger('keyup');
			};
			$slider.slider(options);

			$slider.prev('.slideinput').keypress(function(e) {
				var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
				if (e.altKey || e.ctrlKey || e.shiftKey)
					return true;
				if (jQuery.inArray(charCode, [45, 46, 8, 0]) != -1 || (charCode >= 48 && charCode <= 57) )
					return true;
				return false;
			})
			.blur(function(e){
				theValidate(this, options, $slider);
				$slider.prev('.slideinput').keypress().keyup();
			})
		});
	}
};


favpress.upload_callback = function() {};

if ( favpress_wp.use_new_media_upload )
{
	var _orig_send_attachment = wp.media.editor.send.attachment,
	    _orig_send_link       = wp.media.editor.send.link,
	    _orig_send_to_editor  = window.send_to_editor;

	favpress.upload_callback = function(e) {
		var $this    = jQuery(this),
		    $input   = $this.parent('.buttons').prev('input'),
		    $preview = $this.parent('.buttons').siblings('.image').find('img');

		// handler for attachment
		wp.media.editor.send.attachment = function(props, attachment) {

			if($input.data('mode') == "url") {
				$input.val(attachment.url);
			} else {
				$input.val(attachment.id);
			}
			$input.trigger('change');

			if(attachment.type === 'image')
				$preview.attr('src', attachment.url);
			else
				$preview.attr('src', attachment.icon);

			wp.media.editor.send.attachment = _orig_send_attachment;
			window.send_to_editor = _orig_send_to_editor;
		};

		// handler for link
		window.send_to_editor = function(html) {
			if (html !== '')
			{
				var info = get_url_info(html);
				$input.val(info.imgurl);
				$input.trigger('change');
				$preview.attr('src', info.iconurl);
			}
			window.send_to_editor = _orig_send_to_editor;
			wp.media.editor.send.attachment = _orig_send_attachment;
		};
		wp.media.editor.open($this);
		return false;
	};
}
else
{
	var _orig_send_to_editor = window.send_to_editor;

	favpress.upload_callback = function(e) {
		var _custom_media = true,
		       $input     = jQuery(this).parent('.buttons').prev('input'),
		       $preview   = jQuery(this).parent('.buttons').siblings('.image').find('img');

		tb_show('Upload Image', 'media-upload.php?&post_id=0&referer=favpress&TB_iframe=true');

		window.send_to_editor = function(html) {
			if (html !== '')
			{
				var info = get_url_info(html);
				$input.val(info.imgurl);
				$input.trigger('change');
				$preview.attr('src', info.iconurl);
			}
			window.send_to_editor = _orig_send_to_editor;
			tb_remove();
		};
		return false;
	};
}

function get_url_info(html)
{
	var ext, type, imgurl, iconurl, $el = jQuery(html);
	if ($el.prop('tagName') == 'A')
	{
		imgurl  = jQuery(html).attr('href');
		ext     = favpress.get_url_extension(imgurl);
		type    = favpress.wp_ext2type(ext);
		iconurl = imgurl;
		if(type !== 'image')
		{
			iconurl = favpress_wp.wp_include_url + 'images/crystal/' + type + '.png' ;
		}
	}
	else if($el.prop('tagName') == 'IMG')
	{
		imgurl = jQuery(html).attr('src');
		iconurl = imgurl;
	}
	return {imgurl: imgurl, iconurl: iconurl};
}

favpress.remove_upload_callback = function(e) {
	var $this    = jQuery(this),
	    $input   = $this.parent('.buttons').prev('input'),
	    $preview = $this.parent('.buttons').siblings('.image').find('img');

	$input.val('');
	$preview.attr('src', '');
};

jQuery(document).on('click', '.favpress-js-upload', favpress.upload_callback);
jQuery(document).on('click', '.favpress-js-remove-upload', favpress.remove_upload_callback);

favpress.init_colorpicker = function($elements)
{
	if (jQuery.fn.colorpicker)
	{
		if($elements.length <= 0)
			return;
		$elements.each(function() {
			var $colorpicker  = jQuery(this),
			    options = jQuery(this).getDatas();

			options = favpress.parseOpt(options.opt);

			$colorpicker.colorpicker({
				format: options.format
			}).on('changeColor', function(ev){
				var color;
				if(options.format == 'hex')
				{
					color = ev.color.toHex();
				}
				else if(options.format == 'rgba')
				{
					color = ev.color.toRGB();
					color = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
				}
				else if(options.format == 'rgb')
				{
					color = ev.color.toRGB();
					color = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
				}
				$colorpicker.prev('label').find('span').css('background-color', color);
			}).on('blur', function(ev){
				$colorpicker.prev('label').find('span').css('background-color', $colorpicker.val());
				$colorpicker.keypress().keyup();
			});
		});
	}
};

favpress.init_datepicker = function($elements)
{
	if (jQuery.fn.datepicker)
	{
		if($elements.length <= 0)
			return;
		$elements.each(function() {
			var options = jQuery(this).getDatas();
			options     = favpress.parseOpt(options.opt);
			options.onSelect = function(){
				jQuery(this).trigger('keypress');
				jQuery(this).trigger('keyup');
				jQuery(this).trigger('blur');
			};
            options.numberOfMonths = 2;
            options.changeMonth = true;
            options.changeYear = true;
			jQuery(this).datepicker(options);
			jQuery(this).datepicker('setDate', options.value);
		});
	}
};

favpress.init_controls = function($parent)
{
	// init date picker
	favpress.init_datepicker($parent.find('.favpress-js-datepicker'));
	favpress.init_fontawesome_chooser($parent.find('.favpress-js-fontawesome'));
	favpress.init_select2($parent.find('.favpress-js-select2'));
	favpress.init_sorter($parent.find('.favpress-js-sorter'));
	favpress.init_colorpicker($parent.find('.favpress-js-colorpicker'));
	favpress.init_slider($parent.find('.favpress-js-slider'));
	favpress.init_ace_editor($parent.find('.favpress-js-codeeditor'));
	favpress.init_wpeditor($parent.find('.favpress-js-wpeditor'));
};

// Fontawesome Chooser
favpress.init_fontawesome_chooser = function($elements)
{
	if (jQuery.fn.select2)
	{
		if($elements.length <= 0)
			return;
		var format = function favpress_fontawesome_chooser_format(icon){
			return '<span class="fontawesome"><i class="fa ' + icon.id + '"></i>' + icon.text + '</span>';
		};
		$elements.select2({
			formatResult: format,
			formatSelection: format,
			escapeMarkup: function(m) { return m; },
			allowClear: true,
			placeholder: favpress_wp.ctrl_msg.fac_placeholder
		});
	}
};

// Select2
favpress.init_select2 = function($elements)
{
	if (jQuery.fn.select2)
	{
		if($elements.length <= 0)
			return;
		$elements.select2({allowClear: true, placeholder: favpress_wp.ctrl_msg.select2_placeholder});
	}
};

// Sorter
favpress.init_sorter = function($elements)
{
	if (jQuery.fn.select2Sortable)
	{
		if($elements.length <= 0)
			return;

		$elements.each(function(i, el) {
			var $el     = jQuery(el),
			    options = $el.getDatas();
			options = favpress.parseOpt(options.opt);
			$el.select2(options).select2Sortable({bindOrder: 'sortableStop'});
		});

	}
};

// Tipsy
favpress.init_tipsy = function()
{
	if (jQuery.fn.tipsy)
	{
		jQuery('.favpress-js-tipsy.description').tipsy({ live: true, gravity : 'e' });
		jQuery('.favpress-js-tipsy.slideinput').tipsy({ live: true, trigger : 'focus' });
		jQuery('.favpress-js-tipsy.image-item').tipsy({ live: true });
	}
};
favpress.init_tipsy();

// Init Sorter
favpress.init_ace_editor = function($elements)
{
	if(window.ace !== 'undefined')
	{
		if($elements.length <= 0)
			return;
		$elements.each(function() {

			var editor   = ace.edit(jQuery(this).get(0));
			var textarea = jQuery(this).prev();
			var options  = jQuery(this).getDatas();

			options      = favpress.parseOpt(options.opt);

			// set theme
			editor.setTheme("ace/theme/" + options.theme);
			// set language mode if specified
			if( options.mode ) {
				editor.getSession().setMode("ace/mode/" + options.mode);
			}
			editor.getSession().setUseWrapMode( true );
			editor.setShowPrintMargin( false );

			editor.getSession().setValue(textarea.val());
			editor.getSession().on('change', function(){
				textarea.val(editor.getSession().getValue());
			});
			textarea.on('change', function(){
				editor.getSession().setValue(textarea.val());
			});

		});
	}
};

// Init WP TinyMCE Editor
if(typeof window.KIA_metabox !== 'undefined')
{
	KIA_metabox.mediaButtons();
}
favpress.init_wpeditor = function($elements)
{
	if(typeof window.KIA_metabox !== 'undefined')
	{
		if($elements.length <= 0)
			return;
		KIA_metabox.runTinyMCE($elements);
	}
};
favpress.tinyMCE_save = function()
{
	if(typeof window.tinyMCE !== 'undefined')
	{
		tinyMCE.triggerSave(false, true);
	}
};
