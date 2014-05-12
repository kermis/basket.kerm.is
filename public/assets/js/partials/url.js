var url = {
	check : function() {
		/*
		|------------------------------------------------------------------------------------
		| Check if url has a port number (url will be shown on the home page)
		|------------------------------------------------------------------------------------
		*/
			this.currentURL = window.location.href;
			this.loc = window.location;
			if(this.loc.port != undefined && this.loc.port > 1){
			    this.currentURL = this.loc.protocol + '//' + this.loc.hostname + ':' + this.loc.port;
			}else{
			    // console.log('else');
			    this.currentURL = this.loc.protocol + '//' + this.loc.hostname;
			}
	}
}