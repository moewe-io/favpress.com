jQuery(function (jQuery) {
        var progressbar = jQuery("#importer-progressbar");
        if (progressbar.length == 0) {
            return;
        }

        var log = jQuery('#importer-log');
        progressbar = progressbar.progressbar({
            value: false
        });

        function start_deletion() {
            var data = jQuery('#favpress-remove-old-data-form').serializeObject();
            batch(data, true);
            return false;
        }

        function start_import() {
            var data = jQuery('#favpress-import-form').serializeObject();
            batch(data, true);
            return false;
        }


        function batch(data, first) {
            if (first) {
                log.append('\n================\n\n');
            }
            jQuery('#importer-progress-panel').show();
            jQuery.post(ajaxurl, data, function (response) {
                /**
                 * Response has the form:
                 *
                 * {"status":"error","message":"Not implemented","offset":0,"limit":0,"total":-1,"has_more":false}
                 */
                var result = JSON.parse(response);
                if (result.message) {
                    log.append(result.time + ': ' + result.message + '\n');
                }
                if (result.status == 'error') {
                    return;
                }

                if (result.total) {
                    var current_progress = false;
                    if (result.total >= 0 && result.offset) {
                        current_progress = Math.floor(result.offset / result.total * 100)
                    }
                    progressbar.progressbar("option", {
                        value: current_progress
                    });
                }

                if (result.has_more == true || result.has_more == 'true') {
                    if (result.offset) {
                        data.offset = result.offset;
                    }
                    if (result.limit) {
                        data.limit = result.limit;
                    }
                    batch(data, false);
                }
            });
        }


        jQuery('#favpress-remove-old-data-form').submit(start_deletion);
        jQuery('#favpress-import-form').submit(start_import);

        function heridate_import_batch(filename, offset, max) {
            jQuery.get("<?php echo get_bloginfo('wpurl'); ?>/wp-content/themes/heridate/import/import.class.php", {
                    filename: filename, offset: offset, max: max
                }
            ).done(function (data) {
                var importLog = jQuery('#import-log');
                importLog.append(data);
                if (data.indexOf('Finished') > 0) {
                    jQuery('.loading-info').css("display", "none");
                    importLog.append("<h2>Finished</h2>");
                } else {
                    setTimeout(function () {
                        heridate_import_batch(filename, offset + max, max);
                    }, 10000);
                }
            });
        }
    }
);