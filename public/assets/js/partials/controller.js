// function of main.js
url.check();

var room_id = room.getID();
var allowed = false;

var socket = io.connect(url.currentURL);

var power = 0;
var way = 'up';
var powerCheck;

$(function() {
      // console.log = function() {};

      socket.on('connect', function() {

            socket.emit('room', room_id, 'smartphone');

            socket.emit('message', {
                  message: 'Controller joined to the room : ' + room_id
            });

            socket.on('checkroom', function(data) {

                  $('#controller_message').text(data);

                  socket.emit('connected_user', room_id);
            });

            socket.on('connected_person', function() {
                  console.log('connected person controller.js');
            });
      });

      $('.shoot').on('touchstart', function() {
            power = 0;
            howMuchPower();
      });

      // Check if user can join room
      socket.on('roomJoined', function(roomdata) {
            if (roomdata.length < 3) {
                  allowed = true;
                  console.log('allowed');
            } else {
                  console.log('not allowed');
            }
            if (!allowed) {
                  $('#controller_message').text('You can not connect to this room');
            }
      })

      $('.shoot').on('touchend', function() {
            socket.emit('shoot', {
                  room: room_id,
                  power: power
            });
            clearInterval(powerCheck);
      });
});


var howMuchPower = function() {
      powerCheck = setInterval(function() {

            if (way == 'up') {
                  if (power < 10) {
                        power++;
                  } else {
                        way = 'down';
                  }
            }

            if (way == 'down') {
                  if (power > 1) {
                        power--;
                  } else {
                        way = 'up';
                        power++;
                  }
            }

            socket.emit('power', {
                  room: room_id,
                  power: power
            });

      }, 250);
}