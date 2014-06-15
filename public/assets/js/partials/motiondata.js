var motionD;

/**
 *
 * DEVICE ORIENTATION V2
 *
 */

// buffer object to track recent values
var ValueBuffer = function(numSamples) {
      console.log('create value buffer of', numSamples);
      this.numSamples = numSamples;
      this.initBuffer();
}

// create an array of values, defaulted to zero
ValueBuffer.prototype.initBuffer = function() {
      console.log('create array of', this.numSamples);
      this.sampleIndex = 0;
      this.buffer = [];
      for (var i = 0; i < this.numSamples; i++) this.buffer.push(0);
}

// replace the oldest value in the buffer with the current value
ValueBuffer.prototype.update = function(value) {
      this.sampleIndex++;
      if (this.sampleIndex == this.numSamples) this.sampleIndex = 0;
      this.buffer[this.sampleIndex] = value;
}

// return the sum of the buffer's value
ValueBuffer.prototype.sum = function() {
      var sum = 0;
      for (var i = 0; i < this.numSamples; i++) sum += this.buffer[i];

      return sum;
}

var tiltZAxis = tiltXAxis = compass = 0;

var updateOrientation = function(e) {
      // store accelerometer values
      tiltZAxis = parseFloat(e.gamma); // left right
      tiltXAxis = parseFloat(e.beta); // up down
      compass = parseFloat(e.alpha);

      // update the gesture buffer
      updateRollGesture(tiltZAxis);
}

window.addEventListener('deviceorientation', updateOrientation, false);


var tiltBuffer = new ValueBuffer(10);
var lastTiltValue = 0;

var updateRollGesture = function(tilt) {
      var tiltDelta = tilt - lastTiltValue;
      tiltBuffer.update(tiltDelta);
      lastTiltValue = tilt;

      if (tilt.toFixed(0) == 0 || tilt.toFixed(0) == -1 || tilt.toFixed(0) == 1)
            tilt = 0;

      motionD = {
            gamma: tilt.toFixed(0),
            beta: tilt,
            room: room.getID()
      }

      if (motionD.room != false) {
            if (allowed) {
                  socket.emit('motiondata', motionD);
            }
      }
}



// let the user know if there's no accelerometer data available after 1 second of listening
// (for desktops and non-capable mobile devices).
// This would be a good place to conditionally fall back to touch-based controls
// setTimeout(function(){
//   if( (isNaN(tiltZAxis) && isNaN(tiltXAxis)) || (tiltZAxis == 0 && tiltXAxis == 0) ) {
//     alert('You don\'t seem to have an accelerometer, which is required for this demo.');
//   }
// },1000);






/**
 *
 * DEVICE ORIENTATION V1
 *
 */



// $(function() {



// 	if(window.DeviceOrientationEvent) {
// 		window.addEventListener('deviceorientation', devOrientHandler, false);
// 	}

//             // if(window.DeviceMotionEvent) {
//             //     window.addEventListener('devicemotion', devMotionHandler, false);
//             // }

// });


// function devOrientHandler(eventData) {

//     console.log('event', eventData);

// 	 motionD = {
//         gamma: eventData.gamma,
//         beta: eventData.beta,
//         room : room.getID()
//     }

//     socket.emit('motiondata', motionD );
// }

// // function devMotionHandler(eventData) {



// //     if(i == 0) { alert(eventData.rotationRate.alpha); i++; }

// motionD = {
//       gamma: eventData.gamma,
//       beta: eventData.beta,
//       room : room.getID()
//   }

//   socket.emit('motiondata', motionD );
// // }


// // setInterval(function() {
// //             socket.emit('motiondata', motionD);
// // }, 200);









/**
 *
 * SWIPE
 *
 */






// $(function() {
//      var scene = document.getElementById('container');


//      // mouse/touch tracking ---------------------------------------------------------------------------
//       var mouseX = 0;
//       function mouseMoved(e) {
//         var x = (e.touches) ? e.touches[0].clientX : e.clientX;
//         mouseX = (x - Math.round(window.innerWidth / 2)) * 100;

//            motionD = {
//                 gamma: mouseX,

//                 room : room.getID()
//             }

//         socket.emit('motiondata', motionD );


//       }

//      // document.addEventListener( 'mousemove', mouseMoved, false );
//       document.addEventListener( 'touchmove', mouseMoved, false );

//       // mobile helpers ---------------------------------------------------------------------------------
//       var lockTouchScreen = function( isLocked ) {
//         ( isLocked == false ) ? document.ontouchmove = null : document.ontouchmove = function(e) { e.preventDefault(); };
//       };

//       // lock screen for scrolling on mouse/touch of interactive scene
//       scene.addEventListener( 'touchstart', function(e){
//         lockTouchScreen(true);
//       }, false );

//       document.addEventListener( 'touchend', function(e){
//         lockTouchScreen(false);
//       }, false );

// })