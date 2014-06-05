var basket = {

      /**
       *
       * Set some game variables
       *
       */

      level : 0, reload : false, start : false,
      controller : 'mouse', totalPoints : 0,
      totalScored : 0, globalPoints : 0, totalMissed : 0, isNextLevel : false,

      /**
       *
       * Initialize the game
       *
       */

      init : function() {

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

            yeswecan.build_therenderer();
            yeswecan.build_thecamera();
            yeswecan.build_thebasketstand();
            yeswecan.build_thelights();
            yeswecan.build_thebasket();
            yeswecan.build_theball();


            /**
             *
             * Leap motion
             *
             */

            leap.init();
      },

      endGame : function() {
                  basket.start = false;


                  var newTicket = $('.info-score').clone();
                  newTicket.removeClass('active');

                  $('.info-score').addClass('ripping');

                  setTimeout(function() {
                        $('.info-score').removeClass('ripping').addClass('big')



                        setTimeout(function() {
                              basket.isNextLevel = true;
                               $('.level-button').fadeIn();
                               $('.ticket-holder').append(newTicket)
                        }, 2500)

                   }, 1000)
      },

      replayLevel : function() {
            $('.big').css({
                  right: '500%'
              });

             //only do this after the big ticket is gone from the screen
              setTimeout(function() {
                  $('.big').remove();

                  $('.info-score').addClass('active');


                  if(basket.level < levels.length)
                  {
                      basket.totalBalls = levels[basket.level].totalBalls;
                      basket.totalPoints = 0;
                      basket.totalScored = 0;
                      basket.totalMissed = 0;


                              reloadScene();

                              basket.start = true;
                              basket.isNextLevel = false;
                      }
                      else {
                          alert('You have successfully completed this game.');
                      }
                    }, 500)


      },

      nextLevel : function() {

            $('.big').css({
                  right: '500%'
              });
              //only do this after the big ticket is gone from the screen
              setTimeout(function() {
                  $('.big').remove();

                  $('.info-score').addClass('active');


                  if(basket.level < levels.length)
                  {
                      basket.globalPoints += basket.totalPoints;
                      console.log(basket.globalPoints);
                      basket.level++;
                      basket.totalBalls = levels[basket.level].totalBalls;
                      basket.totalPoints = 0;
                      basket.totalScored = 0;
                      basket.totalMissed = 0;
                      // yeswecan.build_thecamera();
                      // yeswecan.build_thebasket();

                              reloadScene();

                              basket.start = true;
                              basket.isNextLevel = false;

                              // $('.totall').fadeOut('slow', function() {
                              //     $('.totall').removeClass('score').removeClass('active');
                              //     basket.start = true;
                              //     $('.totall').fadeIn('slow', function() {
                              //         $('.totall').addClass('active');
                              //     });
                              // })

                              // $('.level_overlay').fadeOut('slow', function() {
                              //     basket.start = true;
                              //     $('.totall').addClass('active');
                              // });
                      }
                      else {
                          alert('You have successfully completed this game.');
                      }
                    }, 500)

      },

      /**
       *
       * Update the physics engine and render every frame
       *
       */

      animate : function() {

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

            if(basket.start) {
                  if(levels[basket.level].animate) {

                              for(var i = 0; i < levels[basket.level].animate.length; i++)
                              {
                                    console.log('length', levels[basket.level].animate[i].ring);

                                    basket.animateRings(levels[basket.level].animate[i].ring);
                              }

                  }
            }

      },


      /**
       *
       * Create some render stats
       *
       */

      createStats : function() {

            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            stats.domElement.style.zIndex = 100;
            container.appendChild(stats.domElement);

      },

      checkCollision : function() {

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

            for(var i = 0; i < basketRings.length; i++) {

                  basketRingPos = new THREE.Vector3(
                        basketRings[i].model.position.x,
                        basketRings[i].model.position.y - posY,
                        basketRings[i].model.position.z
                  );

                  if(ballPos.distanceTo(basketRingPos) < distanceTo) {

                        if(!ball.score) {
                              ball.score = true;
                              console.log('number', i);
                              basket.score(i);
                        }

                  }
            }

      },

      score : function(ringnumber) {

            console.log(ringnumber);

            // setTimeout(function() {
            //   var videoURL = capturer.save();
            //   capturer.stop();
            //   console.log(videoURL);
            // }, 2000);


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

            var materialFront = new THREE.MeshBasicMaterial( { color: 0xCC0030, transparent : true, opacity : 1 } );
            var materialSide = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent : true, opacity : 1 } );
            var materialArray = [ materialFront, materialSide ];
            var textGeom = new THREE.TextGeometry( levels[basket.level].pointsPerGoal,
            {
                  size: 10, height: 10, curveSegments: 3,
                  font: "helvetiker", weight: "bold", style: "normal",
                  bevelThickness: 0, bevelSize: 0, bevelEnabled: false,
                  material: 0, extrudeMaterial: 1
            });

            var textMaterial = new THREE.MeshFaceMaterial(materialArray);
            var textMesh = new THREE.Mesh(textGeom, textMaterial );

            textGeom.computeBoundingBox();
            var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

            textMesh.position.set( basketRings[ringnumber].model.position.x , 200, 30 );
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

                        if(textMesh.material.materials[0].opacity == 0 && textMesh.material.materials[1].opacity == 0) {
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


      removeABall : function() {

            var i = 0;

            $.each(balls, function( index, basketball ) {

                  if(i == 0) {

                    if(basketball.shot)
                    {
                      if( basketball.position.z < 100
                          && basketball.position.y< 50
                          && basketball.position.x > -250
                          && basketball.position.x < 250) {

                        scene.remove(basketball);
                        balls.splice(index, 1);
                        i++

                      }
                    }

                  }

            });
      },

      updateInfo : function() {

            $('.level').text(basket.level + 1);
            $('.count').text(basket.totalBalls);
            $('.score').text(basket.totalPoints);


            // if(basket.totalScored == levels[basket.level].totalBalls)
            // {
            //   $('.the_bonus span').text(levels[basket.level].bonusPoints);
            // }
            //$('.level').text('Level ' + (basket.level + 1));
            // $('.scored span').text(basket.totalScored);
            // $('.missed span').text(basket.totalMissed);

      },

      animateRings : function(i) {

            if(levels[basket.level].animate[i].position == 'up') {
                  if(basketRings[i].model.position.y < 200) {
                        basketRings[i].model.position.y += 0.5;
                        basketRings[i].physics.position.y += 0.5;

                        basketBacks[i].model.position.y += 0.5;
                        basketBacks[i].physics.position.y += 0.5;
                  }
                  else {
                        basketRings[i].model.position.y -= 0.5;
                        basketRings[i].physics.position.y -= 0.5;
                        levels[basket.level].animate[i].position = 'down';

                        basketBacks[i].model.position.y -= 0.5;
                        basketBacks[i].physics.position.y -= 0.5;
                  }
            }

            if(levels[basket.level].animate[i].position == 'down')
            {
                  if(basketRings[i].model.position.y > levels[basket.level].animate[i].length) {
                        basketRings[i].model.position.y -= 0.5;
                        basketRings[i].physics.position.y -= 0.5;

                        basketBacks[i].model.position.y -= 0.5;
                        basketBacks[i].physics.position.y -= 0.5;
                  }
                  else {
                        basketRings[i].model.position.y += 0.5;
                        basketRings[i].physics.position.y += 0.5;
                        levels[basket.level].animate[i].position = 'up';

                        basketBacks[i].model.position.y += 0.5;
                        basketBacks[i].physics.position.y += 0.5;
                  }
            }

            basketRings[i].model.__dirtyPosition = true;
            basketRings[i].physics.__dirtyPosition = true;

            basketBacks[i].model.__dirtyPosition = true;
            basketBacks[i].physics.__dirtyPosition = true;
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
var basketRings = [], basketBacks =  [];
var balls = [];

var stats;


// The element we'll make fullscreen and pointer locked.
var fullscreenElement;



