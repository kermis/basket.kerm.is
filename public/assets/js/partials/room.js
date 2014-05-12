var socket = io.connect(url.currentURL);


var room = {

	setID : function() {

		/*
		|------------------------------------------------------------------------------------
		| Generate a Room ID
		|------------------------------------------------------------------------------------
		*/
			this.id = this.generateRoomID();
	},

	generateRoomID : function() {
		/*
		|------------------------------------------------------------------------------------
		| Generate a Room ID of 3 chars
		|------------------------------------------------------------------------------------
		*/
			var text = '';
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			for(var i = 0; i < 3; i++)
			{
				// generate a random id with 3 characthers
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}

			return text;
	},

	getID : function() {
		var id = room.queryParam('roomNumber');
		return id;
	},

	queryParam : function(name) {
                name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                var regexS = "[\\?&]" + name + "=([^&#]*)";
                var regex = new RegExp(regexS);
                var results = regex.exec(window.location.href);

                if(results == null) {
                	return '';
                } else {
                	//console.log('res', results);
                	return results[1];
                }
	}
}