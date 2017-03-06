jQuery(function (jQuery) {
    if (!jQuery.fn.insertAtCaret) {
        jQuery.fn.insertAtCaret = function (text) {
            return this.each(function () {
                if (document.selection && this.tagName == 'TEXTAREA') {
                    //IE textarea support
                    this.focus();
                    sel = document.selection.createRange();
                    sel.text = text;
                    this.focus();
                } else if (this.selectionStart || this.selectionStart == '0') {
                    //MOZILLA/NETSCAPE support
                    startPos = this.selectionStart;
                    endPos = this.selectionEnd;
                    scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos) + text + this.value.substring(endPos, this.value.length);
                    this.focus();
                    this.selectionStart = startPos + text.length;
                    this.selectionEnd = startPos + text.length;
                    this.scrollTop = scrollTop;
                } else {
                    // IE input[type=text] and other browsers
                    this.value += text;
                    this.focus();
                }
            });
        };
    }

    var decodeEntities = (function () {
        // this prevents any overhead from creating the object each time
        var element = document.createElement('div');

        function decodeHTMLEntities(str) {
            if (str && typeof str === 'string') {
                // strip script/html tags
                str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
                str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
                element.innerHTML = str;
                str = element.textContent;
                element.textContent = '';
            }

            return str;
        }

        return decodeHTMLEntities;
    })();

    jQuery.fn.scReset = function () {
        if (jQuery(this).is('form'))
            jQuery(this)[0].reset();

        jQuery(this).find('.favpress-sc-field').each(function (i) {
            var type = jQuery(this).attr('data-favpress-type');
            switch (type) {
                case 'favpress-upload':
                    jQuery(this).find('.image > img').attr('src', '');
                    break;
                case 'favpress-color':
                    jQuery(this).find('.favpress-js-colorpicker').colorpicker('update', '');
                    break;
                case 'favpress-slider':
                    var val = jQuery(this).find('input').val();
                    var $slider = jQuery(this).find('.favpress-js-slider');
                    if (!val) {
                        val = jQuery(this).find('.favpress-js-slider').slider('option', 'min');
                    }
                    $slider.slider('value', val);
                    break;
                case 'favpress-textarea':
                    jQuery(this).find('textarea').val(jQuery(this).find('textarea').text());
                    break;
                case 'favpress-checkimage':
                    // trigger change since form reset doesn't trigger it
                    jQuery(this).find('input').change();
                    break;
                case 'favpress-radioimage':
                    // trigger change since form reset doesn't trigger it
                    jQuery(this).find('input').change();
                    break;
                case 'favpress-codeeditor':
                    jQuery(this).find('textarea').first().val(jQuery(this).find('textarea').text()).change();
                    break;
            }
        });

        if (jQuery.fn.select2) {
            // re-init select2
            jQuery(this).find('.favpress-js-select2').select2("destroy");
            // re-init select2 sortable
            if (jQuery.fn.select2Sortable) jQuery(this).find('.favpress-js-sorter').select2("destroy");
            // re-init select2 fontawesome
            jQuery(this).find('.favpress-js-fontawesome').select2("destroy");

            favpress.init_fontawesome_chooser(jQuery(this).find('.favpress-js-fontawesome'));
            favpress.init_select2(jQuery(this).find('.favpress-js-select2'));
            favpress.init_sorter(jQuery(this).find('.favpress-js-sorter'));
        }
        return jQuery(this);
    };

    // init controls
    favpress.init_controls(jQuery('.favpress-sc-main'));

    // shortcode image controls event bind
    favpress.custom_check_radio_event(".favpress-sc-dialog", ".favpress-checkimage .field .input label");
    favpress.custom_check_radio_event(".favpress-sc-dialog", ".favpress-radioimage .field .input label");

    jQuery('.favpress-sc-menu li a').on('click', function (ev) {
        ev.preventDefault();

        var $modal = jQuery(this).parents('.favpress-sc-dialog'),
            $parent = jQuery(this).parent('li'),
            targetId = jQuery(this).attr('href').substring(1),
            $target = $modal.find('.favpress-sc-sub-menu-' + targetId);

        // set clicked menu item as current
        $parent.siblings().removeClass('current');
        $parent.addClass('current');

        // show menu content
        $target.siblings().addClass('favpress-hide');
        $target.removeClass('favpress-hide');

        // stop event propagation
        return false;
    });

    jQuery('.favpress-sc-element .favpress-sc-element-heading').unbind();
    jQuery('.favpress-sc-element .favpress-sc-element-heading a').bind('click.favpress_sc', function (e) {
        e.preventDefault();

        var $parent = jQuery(this).parents('li'),
            id = $parent.attr('id'),
            $form = $parent.find('.favpress-sc-element-form').first();

        if ($parent.hasClass('active')) {
            $form.favpress_slideUp();
            $form.scReset();
            $parent.removeClass('active');
        }
        else {
            var code = $parent.find('.favpress-sc-code').first().html(),
                $modal = jQuery(this).parents('.favpress-sc-dialog').first();

            $modal.find('.favpress-sc-element').removeClass('active');
            $modal.find('.favpress-sc-element-form').favpress_slideUp();

            if ($form.exists()) {
                $parent.addClass('active');
                $form.favpress_slideDown();
            }
            else {
                code = decodeEntities(code);
                $modal.trigger('favpress_insert_shortcode', code);
                $modal.trigger('reveal:close');
            }
        }
    });

    jQuery('.favpress-sc-insert').bind('click.favpress_sc_insert', function (e) {
        e.preventDefault();
        var $modal = jQuery(this).parents('.favpress-sc-dialog'),
            $parent = jQuery(this).parents('.favpress-sc-element'),
            $form = jQuery(this).parents('.favpress-sc-element-form'),
            $fields = $form.find('.favpress-sc-field'),
            values = {},
            code = $parent.find('.favpress-sc-code').first().html(),
            atts = '';

        // trigger non reloading form submit, so that any event binded on this called
        $form.on('submit', function (e) {
            favpress.tinyMCE_save();
            e.preventDefault();
        });
        $form.submit();

        // gather unique names of the options
        $fields.each(function (i) {
            var $input = jQuery(this).find(':not(div).favpress-input'),
                name = $input.attr('name'),
                val = $input.validationVal(),
                type = jQuery(this).attr('data-favpress-type');

            if (type === 'favpress-toggle') {
                if (val) val = 'true';
                else val = 'false';
            }

            if (val && val !== '') {
                values[name.substring(1)] = val;
            }
        });

        for (var name in values) {
            if (values.hasOwnProperty(name)) {
                atts += (" " + name + '="' + values[name] + '"');
            }
        }

        // print shortcode to editor
        code = code.replace(']', atts + ']');
        code = decodeEntities(code);
        $modal.trigger('favpress_insert_shortcode', code);

        // reset form and close dialog
        jQuery('.favpress-sc-element').removeClass('active');
        $form.favpress_slideUp();
        $form.scReset();
        $modal.trigger('reveal:close');
    });

    jQuery('.favpress-sc-cancel').bind('click.favpress_sc_cancel', function (e) {
        e.preventDefault();
        jQuery('.favpress-sc-element').removeClass('active');
        var $form = jQuery(this).parents('.favpress-sc-element-form')
        $form.favpress_slideUp();
        $form.scReset();
    });

});