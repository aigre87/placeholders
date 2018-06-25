	window.bind_check800lay = function (that){
		if( $('.checkLay-lt800').is(':visible') ){
			that[0].lay800 = "lt800";
		}else{
			that[0].lay800 = "gt800";
		}

		that[0].isChangePageLayout800 = function isChangePageLayout800() {
			if( $('.checkLay-lt800').is(':visible') && that[0].lay800 == "gt800" ) {
				that[0].lay800 = "lt800";
				return true;
			} else if( !$('.checkLay-lt800').is(':visible') && that[0].lay800 == "lt800" ){
				that[0].lay800 = "gt800";
				return true;
			} else {
				return false;
			}
		}
	}
