$(function() {

    /**
     *
     * Set the connect page + room number so the user knows where he has to go to connect
     *
     */



    $('.browser').html(url.currentURL + '/connect.html');
    $('.code').html(room.id);
});


var mobile = {
  connected : false
};

url.check();
room.setID();



/*
|------------------------------------------------------------------------------------
| Connect to socket.io
|------------------------------------------------------------------------------------
*/

	var socket = io.connect(url.currentURL);

      /**
       *
       * Connect to a room
       *
       */


	socket.on('connect', function() {
		//console.log('main.js connect', room.id);
            socket.emit('message', {msg : 'you are connected to the room ' + room.id})
	      socket.emit('room', room.id);
      });

      /**
       *
       * Do stuff when user is connected
       *
       */


      socket.on('connected_person', function(data)
      {
           // console.log('A new user (mobile) is connected');
           if(room.id == data)
           {
                $('.waiting').fadeOut(400, function() {
                  $('.ready').fadeIn(400);
                });

                mobile.connected = true;
           }
      });

      socket.on('shoot', function(data) {
        //console.log('shoot');
        shoot();

      });


        socket.on('motiondatas', function(data) {

         // console.log('motiondatas', data);

              moveRifle(data.gamma, data.beta);
        });




