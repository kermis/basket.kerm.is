var basket = {

    /**
     *
     * Set some game variables
     *
     */


    level : 0,
    reload : false,
    start : false,
    controller : 'mouse',
    totalPoints : 0,
    totalScored : 0,
    totalMissed : 0,

  /**
   *
   * Initialize the game
   *
   */

    init : function() {

      basket.totalBalls = levels[basket.level].totalBalls;


    /**
     *
     * Store the scene dimensions
     *
     */

    sceneW = container.offsetWidth;
    sceneH = container.offsetHeight;

    /**
     *
     * Build our 3D World
     *
     */

    basket.createStats();
    physics.build_scene();


    /**
     *
     * Call functions in canwebuildit.js
     *
     */

     yeswecan.build_therenderer();
     yeswecan.build_thecamera();
     yeswecan.build_everything();




  },

  /**
   *
   * Remove balls when the are inside the basketstand otherwise keep them visible
   *
   */


  removeABall : function() {

    var i = 0;

     $.each(balls, function( index, basketball ) {

        if(i == 0)
        {

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


  /**
   *
   * Update the physics engine and render every frame
   *
   */


  animate : function() {
      //ball.__dirtyPosition = true;

      scene.simulate(); // run physics
      renderer.render(scene, yeswecan.get_theSceneCam); // render the scene
      stats.update();
      requestAnimationFrame(basket.animate); // continue animating


      //capturer.capture( renderer.domElement );


      basket.checkCollision();

      /**
       *
       * Set game info in info box
       *
       */




      if(basket.totalScored == levels[basket.level].totalBalls)
      {
        $('.the_bonus span').text(levels[basket.level].bonusPoints);
      }

      $('.balls').text('Balls : '  + basket.totalBalls);
      $('.points').text('Score : ' + basket.totalPoints);
      $('.level').text('Level ' + (basket.level + 1));

      $('.scored span').text(basket.totalScored);
      $('.missed span').text(basket.totalMissed);

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

        var ballPos = new THREE.Vector3(
            ball.position.x,
            ball.position.y,
            ball.position.z
        );

        var basketRingPos;

        /**
         *
         * Double check to be 100% sure a ball went through
         *
         */


        for(var i = 0; i < basketRings.length; i++)
        {
            basketRingPos = new THREE.Vector3(
                basketRings[i].position.x,
                basketRings[i].position.y - 15,
                basketRings[i].position.z
            );

          if(ballPos.distanceTo(basketRingPos) < 25)
          {

              if(!ball.score) {
                ball.score = true;
                basket.score(basketRings[i].number);
              }

            }
        }

        for(var i = 0; i < basketRings.length; i++)
        {
            basketRingPos = new THREE.Vector3(
                basketRings[i].position.x,
                basketRings[i].position.y - 20,
                basketRings[i].position.z
            );

            if(ballPos.distanceTo(basketRingPos) < 30)
            {

              if(!ball.score) {
                console.log('basket', basketRings[i]);
                ball.score = true;
                basket.score(basketRings[i].number);
              }

            }
          }
      },

      score : function(ringnumber) {
                // console.log('hit');


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


                // createjs.Sound.play("score", {loop:1}); // #PLAY SOUND


                /**
                 *
                 * Show points in 3D
                 *
                 */

                 basket.totalScored++;
                 basket.totalMissed--;

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

                textMesh.position.set( basketRings[ringnumber].position.x , 200, 30 );
                textMesh.name = 'points';
                // textMesh.rotation.y = helpMe.calculate('rad', 30);

                scene.add(textMesh);

                /**
                 *
                 * Update users score
                 *
                 */


                basket.totalPoints += levels[basket.level].pointsPerGoal;

                setInterval(function() {
                  textMesh.position.y += 2;
                }, 100);


                setTimeout(function() {
                  setInterval(function() {
                      textMesh.material.materials[0].opacity -= .1;
                      textMesh.material.materials[1].opacity -= .1;
                  }, 100)
                }, 1000);
                //setTimeout(function() { scene.remove(textMesh); }, 5000);
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

var camera, scene, renderer;
var sceneW, sceneH;
var physicsMaterial;

var throwing = false;

var ball, basketRing;
var basketRings = [];
var balls = [];

var stats;


// The element we'll make fullscreen and pointer locked.
var fullscreenElement;


// var capturer = new CCapture( { // FOR CAPTURING A REPLAY
//     framerate: 24
// } );
