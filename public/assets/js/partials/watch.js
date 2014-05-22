var look = {
    /**
     *
     * Update THREE objects on resize
     *
     */

    theWindowIsResizing : function() {
      /**
        *
        * store scene dimensions
        *
        */

        sceneW = container.offsetWidth;
        sceneH = container.offsetHeight;

        /**
         *
         * Update Camera
         *
         */

        camera.aspect = sceneW / sceneH;
        camera.updateProjectionMatrix();

        /**
         *
         * Set renderer size
         *
         */

        renderer.setSize( sceneW, sceneH );
    },

    theUserIsGettingPower : function() {

      console.log('power');

      if(basket.start)
      {
        if(!ball.shot) {
          basket.power = 0;
          basket.way = 'up';

          basket.powerCheck = setInterval(function() {

            if(basket.way == 'up')
            {
                if(basket.power < 10) {
                    basket.power++;
                }
                else {
                    basket.way = 'down';
                }
            }

            if(basket.way == 'down')
            {
                if(basket.power > 1) {
                    basket.power--;
                }
                else {
                    basket.way = 'up';
                    basket.power++;
                }
            }



            if(basket.power <= 5) {
              basket.color = 'orange';
            }

            if(basket.power == 6 ) {
              basket.color = 'green';
            }

            if(basket.power >= 7) {
              basket.color = 'red';
            }


            $('.power').css({ 'height' : (10 * basket.power), 'background-color' : basket.color });

          }, 250);
        }
      }
    },


    theUserIsShooting : function(event) {

       clearInterval(basket.powerCheck);


      if(basket.start) {

         // console.log('start capturing');
         //  capturer.start();


        if(basket.controller == 'mobile') {
          var x =  (event.x - sceneW)+ sceneW /2;
          var y = 100 * mobile.power;
          var z = -550;
        }
        else if(basket.controller == 'mouse') {

         var x = (event.x - sceneW)+ sceneW /2;
         var y = 100 * basket.power;
         var z = -550;

        }
        else if(basket.controller == 'leap') {

        }

        // #TODO delay on direct shooten

         if(!ball.shot) {

           basket.totalMissed++;

           console.log('missed', basket.totalMissed);

            console.log('shoot');
            ball.setAngularFactor(new THREE.Vector3( 1, 1, 1 ));
            ball.setLinearFactor(new THREE.Vector3( 1, 1, 1 ));
            ball.setLinearVelocity(new THREE.Vector3(  x , y, z ));
            ball.setAngularVelocity(new THREE.Vector3( -10, 0, 0 ));
            ball.shot = true;
            basket.reload = true;


          if(basket.reload) {

            basket.totalBalls--;

            setTimeout(function() {





                if(basket.totalBalls == 0)
                {
                  basket.start = false;

                  //console.log('Congrats you have scored ' + basket.totalPoints + ' points in level ' + basket.level);

                  $('.the_level span').text(basket.level + 1);
                  $('.the_points span').text(basket.totalPoints);
                  $('.next_level span').text(basket.level + 2);

                  //$('.totall').removeClass('active');

                  $('.totall').addClass('score');

                  // $('.level_overlay').fadeIn('slow');



                  // console.log(levels, basket.level);
                  // basket.totalBalls = levels[basket.level].totalBalls;
                  // basket.totalPoints = 0;

                  //yeswecan.build_thecamera();

               }
               else {
                  yeswecan.build_theball();
                  basket.reload = false;
              }

                setTimeout(function() {
                       basket.removeABall();
                }, 5000);

            }, 2000);
          }
        }
      }
    },

    theMouseIsMoving : function ( event ) {
        if(basket.start) {
          if(basket.controller == 'mouse') {
            //console.log('mobile not connected');
            basket.movementX = event.movementX       ||
                        event.mozMovementX    ||
                        event.webkitMovementX ||
                        0,
            basket.movementY = event.movementY       ||
                            event.mozMovementY    ||
                            event.webkitMovementY ||
                            0;

                            //console.log(basket.movementY);

            look.AtTheObjectsMove(basket.movementX, basket.movementY);
          }
        }
    },

    AtTheObjectsMove : function(x, y) {

      // console.log(mobile.connected);

      // console.log('move', x, y);

      if(!ball.shot)
      {
        if(basket.controller == 'mobile') {
          ball.position.x = x * 5;
        }
        else if(basket.controller == 'mouse') {
          ball.position.x += x * 0.9;
        }

        ball.__dirtyPosition = true;
      }
      else {
        ball.__dirtyPosition = false;
      }

    },

    theScreenIsGoingFullscreen : function() {
      if (document.webkitFullscreenElement === elem ||
          document.mozFullscreenElement === elem ||
          document.mozFullScreenElement === elem) { // Older API upper case 'S'.
        // Element is fullscreen, now we can request pointer lock
        elem.requestPointerLock = elem.requestPointerLock    ||
                                  elem.mozRequestPointerLock ||
                                  elem.webkitRequestPointerLock;
        elem.requestPointerLock();
      }
    },

    thePointerIsBeingLocked : function() {
      if (document.mozPointerLockElement === elem ||
          document.webkitPointerLockElement === elem) {
        console.log("Pointer Lock was successful.");
      } else {
        console.log("Pointer Lock was lost.");
      }
    },

    thePointerLockHasGoneWrong : function() {
      console.log("Error while locking pointer.");
    },

    theUserIsLockingThePointer : function() {
          console.log('lockPointer');
          elem = document.getElementById("container");

          // Start by going fullscreen with the element. Current implementations
          // require the element to be in fullscreen before requesting pointer
          // lock--something that will likely change in the future.
          elem.requestFullscreen = elem.requestFullscreen    ||
                                   elem.mozRequestFullscreen ||
                                   elem.mozRequestFullScreen || // Older API upper case 'S'.
                                   elem.webkitRequestFullscreen;
          elem.requestFullscreen();
    },

    theKeyIsGoingDown : function ( event ) {

        if(basket.start) {
            switch ( event.keyCode ) {

                case 40: // down
                    yeswecan.get_theSceneCam.position.z += 10;
                    break;
                case 37: // links
                    yeswecan.get_theSceneCam.rotation.y -= 0.1;
                    break;
                case 39: // rechts
                    yeswecan.get_theSceneCam.rotation.y += 0.1;
                    break;
                case 38: // up
                    yeswecan.get_theSceneCam.position.z -= 10;
                    break;
                case 32 : // spatie
                   console.log('spatie');

                    if(yeswecan.get_thecurrentCam < yeswecan.get_AllTheCameras.length -1)
                    {
                      yeswecan.get_thecurrentCam++;
                    }
                    else {
                      yeswecan.get_thecurrentCam = 0;
                    }

                    yeswecan.get_theSceneCam = yeswecan.get_AllTheCameras[yeswecan.get_thecurrentCam];
                  break;
            }
          }

    },

    theBallIsBouncing : function( other_object, relative_velocity, relative_rotation, contact_normal ) {
        // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`

        if(other_object.name == 'basket' || other_object.name == 'ring')
        {
            //console.log('collide', other_object);
        }
    }
}
