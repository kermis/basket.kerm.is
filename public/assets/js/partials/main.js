$(function() {

      /**
       *
       * Set the connect page + room number so the user knows where he has to go to connect
       *
       */

      $('.browser').html(url.currentURL + '/connect.html');
      $('.room_id').html(room.id);
});

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
      socket.emit('message', {
            msg: 'you are connected to the room ' + room.id
      })
      socket.emit('room', room.id, 'browser');
});

/**
 *
 * Do stuff when user is connected
 *
 */

socket.on('connected_person', function(data) {
      console.log('A new user (mobile) is connected');
      if (room.id == data) {
            // basket.start = true; // REMOVE

            $('.chose_socket .play').removeClass('hide');

            basket.controller = "mobile";

            basket.showNotification('Smartphone Connection');
      }
});

socket.on('shooting', function(data) {
      mobile.power = data.power;
      basket.power = data.power;
      look.theUserIsShooting(mobile.position.gamma, mobile.position.beta);
});


socket.on('motiondatas', function(data) {
      mobile.position = data;
      look.AtTheObjectsMove(data.gamma, data.beta);
});

socket.on('mobile_disconnect', function() {
      if (basket.controller == 'mobile') {
            basket.showNotification('Smartphone Connection lost')

            if (basket.start && !basket.infoVisible) {
                  basket.pause();
            }
      }
});

socket.on('user_power', function(data) {
      if (basket.start) {
            $('.powerIndicator').css({
                  'bottom': 30 * data.power
            });
      }
})