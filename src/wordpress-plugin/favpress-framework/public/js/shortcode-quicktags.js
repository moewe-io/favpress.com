(function($){
	if( typeof QTags !== 'undefined' )
	{
		var qt_cb = function(name){
			return function(){
				tinyMCE.execCommand(name + '_cmd');
			}
		}
		for (var i = 0; i < favpress_sg.length; i++) {
			QTags.addButton( favpress_sg[i].name, 'FavPress', qt_cb(favpress_sg[i].name), '', '', favpress_sg[i].button_title, 999999 );
		}
	}
})(jQuery);