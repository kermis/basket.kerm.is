$(function() {

      /**
       *
       * Set the connect page + room number so the user knows where he has to go to connect
       *
       */



      $('.browser').html(url.currentURL + '/connect.html');
      $('.room_id').html(room.id);
});


var mobile = {
      connected: false
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
      socket.emit('message', {
            msg: 'you are connected to the room ' + room.id
      })
      socket.emit('room', room.id);
});

/**
 *
 * Do stuff when user is connected
 *
 */


socket.on('connected_person', function(data) {
      console.log('A new user (mobile) is connected');
      if (room.id == data) {
            basket.start = true;

            // $('.info').fadeOut();

            // $('.info-score').addClass('active');

            $('.chose_socket .play').removeClass('hide');

            basket.controller = "mobile";

            basket.showNotification('Smartphone Connection');

            // basket.pause();
      }
});

socket.on('shooting', function(data) {
      console.log('shoot', data.power);
      //shoot();

      mobile.power = data.power;
      basket.power = data.power;

      look.theUserIsShooting(mobile.position.gamma, mobile.position.beta);

});


socket.on('motiondatas', function(data) {

      //console.log('motiondatas', data);

      mobile.position = data;

      //moveRifle(data.gamma, data.beta);

      look.AtTheObjectsMove(data.gamma, data.beta);
});

socket.on('mobile_disconnect', function() {
      console.log('lost connection')

      if (basket.controller == 'mobile') {
            basket.showNotification('Smartphone Connection lost')
            basket.pause();
      }

      // if (!game.paused) {
      //       game.updatePauseMessage();
      //       game.pause();
      // }
});

socket.on('user_power', function(data) {


      // console.log('power', data.power);
      //  if(data.power <= 5) {
      //     data.color = 'orange';
      //   }

      //   if(data.power == 6 ) {
      //     data.color = 'green';
      //   }

      //   if(data.power >= 7) {
      //     data.color = 'red';
      //   }

      if (basket.start) {
            $('.powerIndicator').css({
                  'bottom': 30 * data.power
            });
      }
})