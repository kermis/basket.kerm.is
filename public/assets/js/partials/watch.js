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

    theUserIsShooting : function(event) {



         var x = (event.x - sceneW)+ sceneW /2;
         var y = sceneH - event.y;
         var z = -550;

         if(!ball.shot) {
            ball.setAngularFactor(new THREE.Vector3( 1, 1, 1 ));
            ball.setLinearFactor(new THREE.Vector3( 1, 1, 1 ));
            ball.setLinearVelocity(new THREE.Vector3(  x , y, z ));
            ball.setAngularVelocity(new THREE.Vector3( -10, 0, 0 ));
            ball.shot = true;
            basket.reload = true;
          }

          setTimeout(function() {
            if(basket.reload) {
              yeswecan.build_theball();
              basket.reload = false;
            }
          }, 2000);
    },

    theMouseIsMoving : function ( event ) {
            basket.movementX = event.movementX       ||
                        event.mozMovementX    ||
                        event.webkitMovementX ||
                        0,
            basket.movementY = event.movementY       ||
                            event.mozMovementY    ||
                            event.webkitMovementY ||
                            0;

         // moveStuff(movementX, movementY);
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

            switch ( event.keyCode ) {

                case 40: // down
                    camera.position.z += 10;
                    break;
                case 37: // links
                    camera.rotation.y -= 0.1;
                    break;
                case 39: // rechts
                    camera.rotation.y += 0.1;
                    break;
                case 38: // up
                    camera.position.z -= 10;
                    break;
                case 32 : // spatie
                  break;
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
