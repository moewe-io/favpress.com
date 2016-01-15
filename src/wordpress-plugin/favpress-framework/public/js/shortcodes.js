(function($){
	function create(sg)
	{
		tinymce.create('tinymce.plugins.' + sg.name, {
			init: function(ed, url) {
				var cmd_cb = function(name) {
					return function() {
						$('#' + name + '_modal').reveal({ animation: 'none' });
						$('#' + name + '_modal').css('top', parseInt($('#' + name + '_modal').css('top')) - window.scrollY);
						$('#' + name + '_modal').unbind('reveal:close.favpress_sc');
						$('#' + name + '_modal').bind('reveal:close.favpress_sc', function () {
							$('.favpress-sc-menu-item.active').find('.favpress-sc-form').scReset().favpress_slideUp();
							$('.favpress-sc-menu-item.active').removeClass('active');
						});
						$('#' + name + '_modal').unbind('favpress_insert_shortcode.favpress_tinymce');
						$('#' + name + '_modal').bind('favpress_insert_shortcode.favpress_tinymce', function(event, code) {
							ed.selection.setContent(code);
							$(ed.getElement()).insertAtCaret(code);
						});
					}
				}
				ed.addCommand(sg.name + '_cmd', cmd_cb(sg.name));
				ed.addButton(sg.name, {title: sg.button_title, cmd: sg.name + '_cmd', image: sg.main_image});
			},
			getInfo: function() {
				return {
					longname: 'FavPress Framework',
					author  : 'MOEWE'
				};
			}
		});
	}

	for (var i = 0; i < favpress_sg.length; i++){
		create(favpress_sg[i]);
	}

})(jQuery);

for (var i = 0; i < favpress_sg.length; i++){
	tinymce.PluginManager.add(favpress_sg[i].name, tinymce.plugins[favpress_sg[i].name]);
}
