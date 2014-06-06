var basket = {

      /**
       *
       * Set some game variables
       *
       */

      level: 2,
      reload: false,
      start: false,
      controller: 'mouse',
      totalPoints: 0,
      totalScored: 0,
      globalPoints: 0,
      totalMissed: 0,
      isNextLevel: false,

      /**
       *
       * Initialize the game
       *
       */

      init: function() {

            /**
             *
             * Set totalBalls and show the level
             *
             */

            basket.totalBalls = levels[basket.level].totalBalls;
            $('.level').text('Level ' + (basket.level + 1));


            /**
             *
             * Store the scene dimensions
             *
             */

            sceneW = container.offsetWidth;
            sceneH = container.offsetHeight;

            /**
             *
             * Build our 3D World and Create the stats
             *
             */

            physics.build_scene();
            basket.createStats();

            /**
             *
             * Call functions in canwebuildit.js
             *
             */

            yeswecan.build_everything();


            /**
             *
             * Leap motion initialization
             *
             */

            leap.init();
      },

      endGame: function() {
            basket.start = false;

            var newTicket = $('.info-score').clone();
            newTicket.removeClass('active');

            $('.info-score').addClass('ripping');

            setTimeout(function() {
                  $('.info-score').removeClass('ripping').addClass('big');

                  setTimeout(function() {
                        basket.isNextLevel = true;
                        $('.level-button').fadeIn();
                        $('.ticket-holder').append(newTicket)
                  }, 2500)

            }, 1000)
      },

      resetGame: function(type) {
            $('.big').css({
                  right: '500%'
            });

            //only do this after the big ticket is gone from the screen
            setTimeout(function() {
                  $('.big').remove();

                  $('.info-score').addClass('active');

                  if (basket.level < levels.length) {

                        if (type == 'next') {
                              // #POST SCOREE
                              $.ajax({
                                    type: 'POST',
                                    url: "http://kermisdatabasevanbartenrobbert.herokuapp.com/addhighscore/basket",
                                    data: {
                                          'score': basket.totalPoints
                                    }
                              }).done(function() {
                                    console.log('added');
                              });

                              basket.globalPoints += basket.totalPoints;
                              basket.level++;
                        }


                        basket.totalBalls = levels[basket.level].totalBalls;
                        basket.totalPoints = 0;
                        basket.totalScored = 0;
                        basket.totalMissed = 0;

                        reloadScene();

                        basket.start = true;
                        basket.isNextLevel = false;
                  } else {
                        alert('You have successfully completed this game.');
                  }
            }, 500)

      },

      replayLevel: function() {
            basket.resetGame('replay');
      },

      nextLevel: function() {
            basket.resetGame('next');
      },

      /**
       *
       * Update the physics engine and render every frame
       *
       */

      animate: function() {

            scene.simulate(); // run physics
            renderer.render(scene, yeswecan.get_theSceneCam); // render the scene
            stats.update(); // update the stats
            requestAnimationFrame(basket.animate); // continue animating

            /**
             *
             * Check if the user has scored
             *
             */

            basket.checkCollision();

            /**
             *
             * Update the game info in the ticket
             *
             */
            basket.updateInfo();

            /**
             *
             * Check if we have to animate the basketrings during a level
             *
             */

            basket.animateObjects();

      },

      /**
       *
       * Create some render stats
       *
       */

      createStats: function() {

            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            stats.domElement.style.zIndex = 100;
            container.appendChild(stats.domElement);

      },

      checkCollision: function() {

            /**
             *
             * Double check to be 100% sure a ball went through
             *
             */

            basket.checkDistanceTo(5, 15); // posY, distanceTo 25
            basket.checkDistanceTo(20, 20); // posY, distanceTo 30

      },

      checkDistanceTo: function(posY, distanceTo) {

            var ballPos = new THREE.Vector3(
                  ball.position.x,
                  ball.position.y,
                  ball.position.z
            );

            var basketRingPos;

            for (var i = 0; i < basketRings.length; i++) {
                  basketRingPos = new THREE.Vector3(
                        basketRings[i].model.position.x,
                        basketRings[i].model.position.y - posY,
                        basketRings[i].model.position.z
                  );

                  if (ballPos.distanceTo(basketRingPos) < distanceTo) {
                        if (!ball.score) {
                              ball.score = true;
                              console.log('number', i);
                              basket.score(i);
                        }
                  }
            }
      },

      score: function(ringnumber) {

            console.log(ringnumber);

            /**
             *
             * Play sound when user scored
             *
             */

            //createjs.Sound.play("score", {loop:1}); // #PLAY SOUND


            /**
             *
             * Update total scored, missed and points
             *
             */

            basket.totalScored++;
            basket.totalMissed--;
            basket.totalPoints += levels[basket.level].pointsPerGoal;

            /**
             *
             * Show points in 3D
             *
             */

            var materialFront = new THREE.MeshBasicMaterial({
                  color: 0xCC0030,
                  transparent: true,
                  opacity: 1
            });

            var materialSide = new THREE.MeshBasicMaterial({
                  color: 0x00ff00,
                  transparent: true,
                  opacity: 1
            });

            var materialArray = [materialFront, materialSide];
            var textGeom = new THREE.TextGeometry(levels[basket.level].pointsPerGoal, {
                  size: 10,
                  height: 10,
                  curveSegments: 3,
                  font: "helvetiker",
                  weight: "bold",
                  style: "normal",
                  bevelThickness: 0,
                  bevelSize: 0,
                  bevelEnabled: false,
                  material: 0,
                  extrudeMaterial: 1
            });

            var textMaterial = new THREE.MeshFaceMaterial(materialArray);
            var textMesh = new THREE.Mesh(textGeom, textMaterial);
            textGeom.computeBoundingBox();
            var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
            textMesh.position.set(basketRings[ringnumber].model.position.x, 200, 30);
            textMesh.name = 'points';
            scene.add(textMesh);

            /**
             *
             * Animate the 3D score up and fadeit after a couple of seconds
             * when it is totally faded remove it from the scene
             *
             */

            var animateUp = setInterval(function() {
                  textMesh.position.y += 2;
            }, 100);

            setTimeout(function() {
                  var fadeOut = setInterval(function() {
                        textMesh.material.materials[0].opacity -= .1;
                        textMesh.material.materials[1].opacity -= .1;

                        if (textMesh.material.materials[0].opacity == 0 && textMesh.material.materials[1].opacity == 0) {
                              clearInterval(animateUp);
                              clearInterval(fadeOut);
                              scene.remove(textMesh);
                        }
                  }, 100)
            }, 1000);
      },

      /**
       *
       * Remove balls when the are inside the basketstand otherwise keep them visible
       *
       */

      removeABall: function() {

            var i = 0;

            $.each(balls, function(index, basketball) {
                  if (i == 0) {
                        if (basketball.shot) {
                              if (basketball.position.z < 100 && basketball.position.y < 50 && basketball.position.x > -250 && basketball.position.x < 250) {
                                    scene.remove(basketball);
                                    balls.splice(index, 1);
                                    i++
                              }
                        }
                  }
            });
      },

      /**
       *
       * Update info in ticket
       *
       */


      updateInfo: function() {
            $('.level').text(basket.level + 1);
            $('.count').text(basket.totalBalls);
            $('.score').text(basket.totalPoints);
      },

      /**
       *
       * If level has animated rings animate them
       *
       */


      animateObjects: function() {
            if (basket.start) {
                  if (levels[basket.level].animate) {
                        for (var i = 0; i < levels[basket.level].animate.length; i++) {
                              basket.animateRings(i, levels[basket.level].animate[i].ring);
                        }
                  }
            }
      },

      animateRings: function(i, ringNumber) {

            if (levels[basket.level].animate[i].position == 'right' || levels[basket.level].animate[i].position == 'square-right') {

                  if (levels[basket.level].animate[i].position == 'right') {
                        basket.MaxPos = basketRings[ringNumber].model.position.x < levels[basket.level].animate[i].max
                  }

                  if (levels[basket.level].animate[i].position == 'square-right') {
                        basket.MaxPos = basketRings[ringNumber].model.position.x < (levels[basket.level].animate[i].max - (levels[basket.level].animate[i].max / 2));
                  }

                  if (basket.MaxPos) {
                        basketRings[ringNumber].model.position.x += 0.5;
                        basketRings[ringNumber].physics.position.x += 0.5;

                        basketBacks[ringNumber].model.position.x += 0.5;
                        basketBacks[ringNumber].physics.position.x += 0.5;
                  } else {
                        basketRings[ringNumber].model.position.x -= 0.5;
                        basketRings[ringNumber].physics.position.x -= 0.5;

                        if (levels[basket.level].animate[i].position == 'right') {
                              levels[basket.level].animate[i].position = 'left';
                        }

                        if (levels[basket.level].animate[i].position == 'square-right') {
                              levels[basket.level].animate[i].position = 'square-down'
                        }

                        basketBacks[ringNumber].model.position.x -= 0.5;
                        basketBacks[ringNumber].physics.position.x -= 0.5;
                  }
            }

            if (levels[basket.level].animate[i].position == 'left' || levels[basket.level].animate[i].position == 'square-left') {

                  if (levels[basket.level].animate[i].position == 'left') {
                        basket.MinPos = basketRings[ringNumber].model.position.x > levels[basket.level].animate[i].min;
                  }

                  if (levels[basket.level].animate[i].position == 'square-left') {
                        basket.MinPos = basketRings[ringNumber].model.position.x > -levels[basket.level].animate[i].min;
                  }

                  if (basket.MinPos) {
                        basketRings[ringNumber].model.position.x -= 0.5;
                        basketRings[ringNumber].physics.position.x -= 0.5;

                        basketBacks[ringNumber].model.position.x -= 0.5;
                        basketBacks[ringNumber].physics.position.x -= 0.5;
                  } else {
                        basketRings[ringNumber].model.position.x += 0.5;
                        basketRings[ringNumber].physics.position.x += 0.5;

                        if (levels[basket.level].animate[i].position == 'left') {
                              levels[basket.level].animate[i].position = 'right';
                        }

                        if (levels[basket.level].animate[i].position == 'square-left') {
                              levels[basket.level].animate[i].position = 'square-up'
                        }


                        basketBacks[ringNumber].model.position.x += 0.5;
                        basketBacks[ringNumber].physics.position.x += 0.5;
                  }
            }

            if (levels[basket.level].animate[i].position == 'up' || levels[basket.level].animate[i].position == 'square-up') {
                  if (basketRings[ringNumber].model.position.y < levels[basket.level].animate[i].max) {
                        basketRings[ringNumber].model.position.y += 0.5;
                        basketRings[ringNumber].physics.position.y += 0.5;

                        basketBacks[ringNumber].model.position.y += 0.5;
                        basketBacks[ringNumber].physics.position.y += 0.5;
                  } else {
                        basketRings[ringNumber].model.position.y -= 0.5;
                        basketRings[ringNumber].physics.position.y -= 0.5;

                        if (levels[basket.level].animate[i].position == 'up') {
                              levels[basket.level].animate[i].position = 'down';
                        }

                        if (levels[basket.level].animate[i].position == 'square-up') {
                              levels[basket.level].animate[i].position = 'square-right';
                        }

                        basketBacks[ringNumber].model.position.x -= 0.5;
                        basketBacks[ringNumber].physics.position.x -= 0.5;
                  }
            }


            if (levels[basket.level].animate[i].position == 'down' || levels[basket.level].animate[i].position == 'square-down') {
                  if (basketRings[ringNumber].model.position.y > levels[basket.level].animate[i].min) {
                        basketRings[ringNumber].model.position.y -= 0.5;
                        basketRings[ringNumber].physics.position.y -= 0.5;

                        basketBacks[ringNumber].model.position.y -= 0.5;
                        basketBacks[ringNumber].physics.position.y -= 0.5;
                  } else {
                        basketRings[ringNumber].model.position.y += 0.5;
                        basketRings[ringNumber].physics.position.y += 0.5;


                        if (levels[basket.level].animate[i].position == 'square-down') {
                              levels[basket.level].animate[i].position = 'square-left';
                        }

                        if (levels[basket.level].animate[i].position == 'down') {
                              levels[basket.level].animate[i].position = 'up';
                        }

                        basketBacks[ringNumber].model.position.y += 0.5;
                        basketBacks[ringNumber].physics.position.y += 0.5;
                  }
            }

            basketRings[ringNumber].model.__dirtyPosition = true;
            basketRings[ringNumber].physics.__dirtyPosition = true;

            basketBacks[ringNumber].model.__dirtyPosition = true;
            basketBacks[ringNumber].physics.__dirtyPosition = true;
      }
}









/**
 *
 * Get the container element
 *
 */

var container = document.getElementById('container');

/**
 *
 * Some THREE objects
 *
 */

var /* camera, */ scene, renderer;
var sceneW, sceneH;
var physicsMaterial;

var throwing = false;

var ball, basketRing;
var basketRings = [],
      basketBacks = [];
var balls = [];

var stats;


// The element we'll make fullscreen and pointer locked.
var fullscreenElement;