// function of main.js
url.check();

var room_id = room.getID();

// var motion;

var socket = io.connect(url.currentURL);

var power = 0;
var way = 'up';
var powerCheck;

$(function() {

	socket.on('connect', function() {
		socket.emit('room', room_id);
		socket.emit('message', {message : 'Controller joined to the room : ' + room_id});

		socket.on('checkroom', function(data) {
		    $('#controller_message').text(data);

                            socket.emit('connected_user', room_id);
	           });

                        socket.on('connected_person', function() {
                        	console.log('connected person controller.js');
                        });


	});

            // $('.shoot').on('click', function() {
            //     console.log('test');
            //     socket.emit('shoot', {message :  room_id});
            // })

            $('.shoot').on('touchstart', function() {
                power = 0;
                howMuchPower();
            });

            $('.shoot').on('touchend', function() {
                socket.emit('shoot', {message :  room_id, power : power});

                clearInterval(powerCheck);

            });

});


var howMuchPower = function() {
    powerCheck = setInterval(function() {

        if(way == 'up')
        {
            if(power < 10) {
                power++;
            }
            else {
                way = 'down';
            }
        }

        if(way == 'down')
        {
            if(power > 1) {
                power--;
            }
            else {
                way = 'up';
                power++;
            }
        }

        socket.emit('power', {message :  room_id, power : power });

    }, 250);
}