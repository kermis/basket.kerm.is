var look = {

      /**
       *
       * Update THREE objects on resize
       *
       */

      theWindowIsResizing: function() {
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

            yeswecan.get_theSceneCam.aspect = sceneW / sceneH;
            yeswecan.get_theSceneCam.updateProjectionMatrix();

            /**
             *
             * Set renderer size
             *
             */

            renderer.setSize(sceneW, sceneH);
      },

      /**
       *
       * The user is clicking / touching his mouse / smartphone to get power
       *
       */

      theUserIsGettingPower: function() {

            if (basket.start) {
                  if (!ball.shot) {
                        basket.power = 0;
                        basket.way = 'up';

                        basket.powerCheck = setInterval(function() {

                              if (basket.way == 'up') {
                                    if (basket.power < 10) {
                                          basket.power++;
                                    } else {
                                          basket.way = 'down';
                                    }
                              }

                              if (basket.way == 'down') {
                                    if (basket.power > 1) {
                                          basket.power--;
                                    } else {
                                          basket.way = 'up';
                                          basket.power++;
                                    }
                              }

                              if (basket.power <= 5) {
                                    basket.color = 'orange';
                              }

                              if (basket.power == 6) {
                                    basket.color = 'green';
                              }

                              if (basket.power >= 7) {
                                    basket.color = 'red';
                              }

                              $('.powerIndicator').css({
                                    'bottom': 30 * basket.power
                              });
                        }, 250);
                  }
            }
      },

      /**
       *
       * Shoot a ball after getting p ower
       *
       */

      theUserIsShooting: function(event) {
            clearInterval(basket.powerCheck);

            if (basket.start) {

                  var x, y, z;

                  if (basket.controller == 'mobile') {
                        x = (event.x - sceneW) + sceneW / 2;
                        y = 100 * mobile.power;
                        z = -550;
                  } else if (basket.controller == 'mouse') {
                        x = 0; // (event.x - sceneW) + sceneW / 2;
                        y = 100 * basket.power;
                        z = -550;
                  } else if (basket.controller == 'leap') {
                        console.log('controller is leap', basket.power);

                        x = 0
                        y = basket.power;
                        z = -550;
                        leap.setPower = false;
                  }

                  // #TODO delay on direct shooten

                  /**
                   *
                   * Check if current ball is alreay thrown
                   *
                   */

                  if (!ball.shot) {

                        basket.totalMissed++;
                        ball.setAngularFactor(new THREE.Vector3(1, 1, 1));
                        ball.setLinearFactor(new THREE.Vector3(1, 1, 1));
                        ball.setLinearVelocity(new THREE.Vector3(x, y, z));
                        ball.setAngularVelocity(new THREE.Vector3(-10, 0, 0));
                        ball.shot = true;
                        basket.reload = true;
                        basket.power = 0;

                        /**
                         *
                         * Check if we have to reload a new ball
                         *
                         */

                        if (basket.reload) {

                              basket.totalBalls--; // update total balls

                              setTimeout(function() {

                                    /**
                                     *
                                     * Check if we have balls left
                                     *
                                     */

                                    if (basket.totalBalls == 0) { // no balls left so stop the game
                                          basket.endGame();
                                    } else { // create new ball
                                          yeswecan.build_theball();
                                          basket.reload = false;
                                    }

                                    /**
                                     *
                                     * Remove a ball
                                     *
                                     */

                                    setTimeout(function() {
                                          basket.removeABall();
                                    }, 5000);
                              }, 2000); // #1000
                        }
                  }
            }
      },

      theMouseIsGoingDown: function() {
            if (ball.shot) {
                  mouseDown = true;
            }

            if (basket.controller == 'mouse' && !ball.shot) {
                  mouseDown = false;
                  look.theUserIsGettingPower();
            }
      },

      theMouseIsGoingUp: function() {
            if (basket.power === 0) {
                  basket.power = 1;
            }

            if (!mouseDown && basket.controller == 'mouse') {
                  look.theUserIsShooting(event);
                  mouseDown = false;
            }
      },

      theMouseIsMoving: function(event) {

            if (basket.start) {
                  if (basket.controller == 'mouse') { // check if controller is mouse

                        basket.movementX = event.movementX ||
                              event.mozMovementX ||
                              event.webkitMovementX ||
                              0,

                        basket.movementY = event.movementY ||
                              event.mozMovementY ||
                              event.webkitMovementY ||
                              0;

                        /**
                         *
                         * Update ball position
                         *
                         */

                        look.AtTheObjectsMove(basket.movementX, basket.movementY);
                  }
            }

      },

      AtTheObjectsMove: function(x, y) {

            /**
             *
             * Check if ball is thrown
             *
             */

            if (!ball.shot) {
                  if (basket.controller == 'mobile') {
                        ball.position.x = x * 5;
                  } else if (basket.controller == 'mouse') {
                        ball.position.x += x * 0.9;
                  }

                  ball.__dirtyPosition = true;
            } else {
                  ball.__dirtyPosition = false;
            }

      },

      theScreenIsGoingFullscreen: function() {

            if (document.webkitFullscreenElement === elem ||
                  document.mozFullscreenElement === elem ||
                  document.mozFullScreenElement === elem) { // Older API upper case 'S'.

                  // Element is fullscreen, now we can request pointer lock
                  elem.requestPointerLock = elem.requestPointerLock ||
                        elem.mozRequestPointerLock ||
                        elem.webkitRequestPointerLock;
                  elem.requestPointerLock();
            }

      },

      thePointerIsBeingLocked: function() {

            if (document.mozPointerLockElement === elem ||
                  document.webkitPointerLockElement === elem) {
                  // console.log('pointer locked');
            } else {
                  // console.log("Pointer Lock was lost."); // #TODO SHOW ERROR MESSAGE
            }

      },

      thePointerLockHasGoneWrong: function() {
            //console.log("Error while locking pointer."); // #TODO ERROR MESSAGE
      },

      theUserIsLockingThePointer: function() {

            elem = document.getElementById("container");

            // Start by going fullscreen with the element. Current implementations
            // require the element to be in fullscreen before requesting pointer
            // lock--something that will likely change in the future.
            elem.requestFullscreen = elem.requestFullscreen ||
                  elem.mozRequestFullscreen ||
                  elem.mozRequestFullScreen || // Older API upper case 'S'.
            elem.webkitRequestFullscreen;

            elem.requestFullscreen();
      },

      theKeyIsGoingDown: function(event) {
            if (basket.start) {
                  switch (event.keyCode) {

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
                        case 32: // spatie
                              if (basket.controller == "leap") {
                                    look.theUserIsShooting('shoot');
                              } else {
                                    if (yeswecan.get_thecurrentCam < yeswecan.get_AllTheCameras.length - 1) {
                                          yeswecan.get_thecurrentCam++;
                                    } else {
                                          yeswecan.get_thecurrentCam = 0;
                                    }

                                    yeswecan.get_theSceneCam = yeswecan.get_AllTheCameras[yeswecan.get_thecurrentCam];
                              }
                              break;
                        case 49: // shift 1
                              basket.replayLevel(0);
                              break;
                        case 50: // shift 2
                              basket.replayLevel(1);
                              break;
                        case 51: // shift 3
                              basket.replayLevel(2);
                              break;
                        case 52: // shift 4
                              basket.replayLevel(3);
                              break;
                        case 53: // shift 5
                              basket.replayLevel(4);
                              break;
                        case 54: // shift 6
                              basket.replayLevel(5);
                              break;
                        case 55: // shift 7
                              basket.replayLevel(6);
                              break;
                        case 56: // shift 8
                              basket.replayLevel(7);
                              break;
                        case 57: // shift 9
                              basket.replayLevel(8);
                              break;
                        case 48: // shift 0
                              basket.replayLevel(9);
                              break;
                  }
            } else {
                  if (basket.isNextLevel) {
                        switch (event.keyCode) {
                              case 32: // spatie
                                    if (!basket.gameOver) {
                                          basket.nextLevel(basket.level);
                                    }
                                    break;
                              case 82: // R
                                    if (!basket.gameOver) {
                                          basket.replayLevel(basket.level);
                                    }
                                    break;
                        }
                  }
            }

            if (event.keyCode == 27 && !basket.infoVisible) { // esc
                  event.preventDefault();
                  basket.pause()
            }
      }
}