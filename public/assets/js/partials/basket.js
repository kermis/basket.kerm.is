var collidableMeshList = [];



var basket = {

    level : 1,
    reload : false,
    start : false,
    controller : mouse,
    totalBalls : 10,
    totalScore : 0,

  /**
   *
   * Initialize the game
   *
   */

    init : function() {

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

    createStats();
    physics.build_scene(); // buildPhysicsScene();


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






    // var geometry = new THREE.CylinderGeometry( 7, 10 , 40, 4 );
    // var material = Physijs.createMaterial (
    //   new THREE.MeshLambertMaterial( {color : 0xCC0030, transparent : true, opacity : 0.7 }),
    //   .4,
    //   .4
    // );

    // var cylinder = new Physijs.CylinderMesh( geometry, material, 0 );
    // cylinder.position.z = 65;
    // cylinder.position.x = -261;
    // cylinder.position.y = 20;
    // cylinder.rotation.y = helpMe.calculate('rad', -45);
    // // cylinder.rotation.x = helpMe.calculate('rad', -3);
    // // cylinder.rotation.z = helpMe.calculate('rad', 3);
    // cylinder.scale.set(3, 3, 3);
    // scene.add( cylinder );


    // var geometry = new THREE.CylinderGeometry( 7, 15 , 45, 4 );
    // var material = Physijs.createMaterial (
    //   new THREE.MeshLambertMaterial( {color : 0xCC0030, transparent : true, opacity : 0 }),
    //   .4,
    //   .4
    // );

    // var cylinder = new Physijs.CylinderMesh( geometry, material, 0 );
    // cylinder.position.z = 100;
    // cylinder.position.x = -200;
    // cylinder.position.y = 80;
    // cylinder.rotation.y = helpMe.calculate('rad', 45);
    // cylinder.rotation.x = helpMe.calculate('rad', -3);
    // cylinder.scale.set(3, 3, 3);
    // scene.add( cylinder );

    // var geometry = new THREE.BoxGeometry( 10, 70 , 40, 4, 4 );
    // var material = Physijs.createMaterial (
    //   new THREE.MeshLambertMaterial( {color : 0xCC0030, transparent : true, opacity : 0 }),
    //   .4,
    //   .4
    // );

    // var cylinder = new Physijs.BoxMesh( geometry, material, 0 );
    // cylinder.position.z =  -65;
    // cylinder.position.x = -220;
    // cylinder.position.y = 112;
    // cylinder.rotation.y = helpMe.calculate('rad', -10);
    // cylinder.rotation.x = helpMe.calculate('rad', -20);
    // cylinder.scale.set(3, 3, 3);
    // scene.add( cylinder );



    /**
     *
     * LEFT
     *
     */

    // ROOD VLAK LINKS  #DONE
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(12,81 );
    rectShape.lineTo( 40, 81 );
    rectShape.lineTo( 50, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xff0000, transparent : true, opacity : 0 } ) ) ;

    rectMesh.position.z = 147;
    rectMesh.position.x = -288;
    rectMesh.position.y = 0;
    rectMesh.rotation.y = helpMe.calculate('rad', -1);
    rectMesh.rotation.x = helpMe.calculate('rad', -18);
    scene.add( rectMesh );

    //helpMe.makeACross(rectMesh, 0, 0, 0);




    // ROOD VLAK RECHTS #TODO
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(12,81 );
    rectShape.lineTo( 40, 81 );
    rectShape.lineTo( 50, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xff0000, transparent : true, opacity : 0 } ) ) ;

    rectMesh.position.z = 149;
    rectMesh.position.x = 238;
    rectMesh.position.y = 0;
    rectMesh.rotation.y = helpMe.calculate('rad', 2);
    rectMesh.rotation.x = helpMe.calculate('rad', -18);
    scene.add( rectMesh );

    //helpMe.makeACross(rectMesh, 0, 0, 0);











    // GROEN VLAK  LINKS #DONE
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(0,53 );
    rectShape.lineTo( 25, 53 );
    rectShape.lineTo( 25, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0x00FF00, transparent : true, opacity : 0 } ) ) ;

   rectMesh.position.z = 121;
    rectMesh.position.x = -274;
    rectMesh.position.y = 78;
    rectMesh.rotation.x = helpMe.calculate('rad', -87);
    scene.add( rectMesh );

    //helpMe.makeACross(rectMesh, 0, 0, 0);

    // GROEN VLAK  RECHTS #DONE
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(0,53 );
    rectShape.lineTo( 25, 53 );
    rectShape.lineTo( 25, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0x00FF00, transparent : true, opacity : 0 } ) ) ;

    rectMesh.position.z = 121;
    rectMesh.position.x = 250;
    rectMesh.position.y = 78;
    rectMesh.rotation.x = helpMe.calculate('rad', -87);
    scene.add( rectMesh );

    //helpMe.makeACross(rectMesh, 0, 0, 0);



   //BLAUW VLAK LINKS #DONE
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(7, 95 );
    rectShape.lineTo( 24, 95 );
    rectShape.lineTo( 25, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0x0000FF, transparent : true, opacity : 0 } ) ) ;

   rectMesh.position.z = 68;
    rectMesh.position.x = -274;
    rectMesh.position.y = 80;
    rectMesh.rotation.x = helpMe.calculate('rad', -33);
    scene.add( rectMesh );

   //helpMe.makeACross(rectMesh, 0, 0, 0);

   //BLAUW VLAK  RECHTS #DONE
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(0, 95 );
    rectShape.lineTo( 18, 95 );
    rectShape.lineTo( 25, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0x0000FF, transparent : true, opacity : 0 } ) ) ;

   rectMesh.position.z = 68;
    rectMesh.position.x = 249;
    rectMesh.position.y = 80;
    rectMesh.rotation.x = helpMe.calculate('rad', -33);
    scene.add( rectMesh );

    //helpMe.makeACross(rectMesh, 0, 0, 0);


  //GRIJS VLAK #DONE
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(0, 160 );
    rectShape.lineTo(20, 215 );
    rectShape.lineTo( 105, 265 );
    rectShape.lineTo( 270, 290 );
    rectShape.lineTo( 442, 264 );
    rectShape.lineTo( 520, 215 );
    rectShape.lineTo( 530, 165 );
    rectShape.lineTo( 540, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xFF0F0F0, transparent : true, opacity : 0 } ) ) ;

   rectMesh.position.z = -74;
    rectMesh.position.x = -270;
    rectMesh.position.y = 0;

    rectMesh.rotation.x = helpMe.calculate('rad', -5);
    rectMesh.rotation.y = helpMe.calculate('rad',-1);
    scene.add( rectMesh );




    // GREEN VLAK 2 LINKS TOP #DONE
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(-2,120 );
    rectShape.lineTo( 22, 120 );
    rectShape.lineTo( 17, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0x00FF00 } ) ) ;

   rectMesh.position.z =16;
    rectMesh.position.x = -267;
    rectMesh.position.y = 159.5;
    rectMesh.rotation.x = helpMe.calculate('rad', -90);
    scene.add( rectMesh );

    // GREEN VLAK 2 RECHTS TOP
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(-5,120 );
    rectShape.lineTo( 18, 120 );
    rectShape.lineTo( 17, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0x00FF00, transparent : true, opacity : 0 } ) ) ;

   rectMesh.position.z =16;
    rectMesh.position.x = 250;
    rectMesh.position.y = 159.5;
    rectMesh.rotation.x = helpMe.calculate('rad', -90);
    scene.add( rectMesh );




    // ROOS VLAK RECHTS SIDE
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(-12, 160 );
    rectShape.lineTo( 81, 157 );
    rectShape.lineTo( 130, 81 );
    rectShape.lineTo( 130, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xCC0030, transparent : true, opacity : 0 } ) ) ;
    rectMesh.position.z = -65;
    rectMesh.position.x = 248;
    rectMesh.position.y = 0;
    rectMesh.rotation.y = helpMe.calculate('rad', -90);
    scene.add( rectMesh );

    // GREEN VLAK RECHTS SIDE
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(0, 80 );
    rectShape.lineTo( 57, 77 );
    rectShape.lineTo( 80, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0x00FF00, transparent : true, opacity : 0 } ) ) ;
    rectMesh.position.z = 65;
    rectMesh.position.x = 248;
    rectMesh.position.y = 0;
    rectMesh.rotation.y = helpMe.calculate('rad', -90);
    scene.add( rectMesh );



    // ROOS VLAK LINKS SIDE
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(0, 80 );
    rectShape.lineTo( 53, 160 );
    rectShape.lineTo( 160, 160 );
    rectShape.lineTo( 200, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xCC0030, transparent : true, opacity : 0 } ) ) ;
    rectMesh.position.z = 68;
    rectMesh.position.x = -248;
    rectMesh.position.y = 0;
    rectMesh.rotation.y = helpMe.calculate('rad', 90);
    scene.add( rectMesh );

    // GREEN VLAK LINKS SIDE
    var rectShape = new THREE.Shape();
    rectShape.moveTo( 0,0 );
    rectShape.lineTo(25, 78 );
    rectShape.lineTo( 80, 80 );
    rectShape.lineTo( 80, 0 );
    rectShape.lineTo( 0, 0 );

    var rectGeom = new THREE.ShapeGeometry( rectShape );
    var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0x00FF00, transparent : true, opacity : 0 } ) ) ;
    rectMesh.position.z = 147;
    rectMesh.position.x = -248;
    rectMesh.position.y = 0;
    rectMesh.rotation.y = helpMe.calculate('rad', 90);
    scene.add( rectMesh );


































    // ROOS VLAK #DONE
    // var rectShape = new THREE.Shape();
    // rectShape.moveTo( 0,0 );
    // rectShape.lineTo(27, 74 );
    // rectShape.lineTo( 95, 62 );

    // rectShape.lineTo( 178, 62 );
    // rectShape.lineTo( 110, 0 );
    // rectShape.lineTo( 0, 0 );

    // var rectGeom = new THREE.ShapeGeometry( rectShape );
    // var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xFF00FF } ) ) ;

    // rectMesh.position.z = 300; // 100
    // rectMesh.position.x = -40; // -240
    // rectMesh.position.y = 10;
    // rectMesh.rotation.y = helpMe.calculate('rad', 90);
    // rectMesh.rotation.x = helpMe.calculate('rad', -90);

    // scene.add( rectMesh );

    // helpMe.makeACross(rectMesh, 0, 0, 0);






    // APPELBLAUW VLAK #DONE
    // var rectShape = new THREE.Shape();
    // rectShape.moveTo( 0,0 );
    // rectShape.lineTo(60, 164);
    // rectShape.lineTo(164, 0);
    // rectShape.lineTo(0,  0);

    // var rectGeom = new THREE.ShapeGeometry( rectShape );
    // var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0x00FFFF } ) ) ;

    // rectMesh.position.z = 5 // 2
    // rectMesh.position.x = -240; // -249
    // rectMesh.position.y = 0;
    // rectMesh.rotation.y = helpMe.calculate('rad', 45);
    // rectMesh.rotation.x = helpMe.calculate('rad', -25);
    // rectMesh.rotation.z = helpMe.calculate('rad', 17);
    // scene.add( rectMesh );

   // helpMe.makeACross(rectMesh, 0, 0, 0);























































  },

  removeABall : function() {


    var i = 0;

     $.each(balls, function( index, basketball ) {

        if(i == 0)
        {

          if(basketball.shot)
          {
            if(basketball.position.z < 100 && basketball.position.y< 50 && basketball.position.x > -250 && basketball.position.x < 250) {
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
  },

  checkCollision : function() {
    //console.log('check collision');

    // var originPoint = ball.position.clone();
    // var i = 1;

    // for (var vertexIndex = 0; vertexIndex < ball.geometry.vertices.length; vertexIndex++)
    // {
    //     var localVertex = ball.geometry.vertices[vertexIndex].clone();
    //     var globalVertex = localVertex.applyMatrix4( ball.matrix );
    //     var directionVector = globalVertex.sub( ball.position );

    //      var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
    //     var collisionResults = ray.intersectObjects( collidableMeshList );

    //     if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
    //         //appendText(" Hit ");
    //         console.log('hit');
    //        // console.log(i);
    //         if(i == 1)
    //         {
    //             basket.score();
    //              i++;
    //         }
    //     }
    // }



    var ballPos = new THREE.Vector3( ball.position.x , ball.position.y , ball.position.z );
    var basketRingPos;



    for(var i = 0; i < basketRings.length; i++)
    {
      basketRingPos = new THREE.Vector3( basketRings[i].position.x , basketRings[i].position.y - 15  , basketRings[i].position.z );

      if(ballPos.distanceTo(basketRingPos) < 25)
      {

          if(!ball.score) {
           ball.score = true;
           basket.score();
          }

        }
    }

      for(var i = 0; i < basketRings.length; i++)
      {
        basketRingPos = new THREE.Vector3( basketRings[i].position.x , basketRings[i].position.y - 20  , basketRings[i].position.z );

        if(ballPos.distanceTo(basketRingPos) < 30)
        {
          if(!ball.score) {
            ball.score = true;
            basket.score();
          }
        }
      }
  },

  score : function() {
            // console.log('hit');


            // setTimeout(function() {
            //   var videoURL = capturer.save();
            //   capturer.stop();
            //   console.log(videoURL);
            // }, 2000);


            createjs.Sound.play("score", {loop:1});


            var materialFront = new THREE.MeshBasicMaterial( { color: 0xCC0030 } );
            var materialSide = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var materialArray = [ materialFront, materialSide ];
            var textGeom = new THREE.TextGeometry( "10",
            {
                size: 50, height: 10, curveSegments: 3,
                font: "helvetiker", weight: "bold", style: "normal",
                bevelThickness: 0, bevelSize: 0, bevelEnabled: false,
                material: 0, extrudeMaterial: 1
            });
            // font: helvetiker, gentilis, droid sans, droid serif, optimer
            // weight: normal, bold

            var textMaterial = new THREE.MeshFaceMaterial(materialArray);
            var textMesh = new THREE.Mesh(textGeom, textMaterial );

            textGeom.computeBoundingBox();
            var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

            textMesh.position.set( -200, 50, 130 );
            textMesh.rotation.y = helpMe.calculate('rad', 30);
            scene.add(textMesh);
            basket.totalScore += 10;

            console.log(basket.totalScore);

            //setInterval( function() { textMesh.position.y += 5 }, 100);
            setTimeout(function() { scene.remove(textMesh); }, 5000);
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





/**
 *
 * Create some render stats
 *
 */

var createStats = function() {

   stats = new Stats();
   stats.domElement.style.position = 'absolute';
   stats.domElement.style.top = '0px';
   stats.domElement.style.zIndex = 100;
   container.appendChild(stats.domElement);

 };









var moveStuff = function(movementX, movementY) {

    console.log('X', movementX, 'Y', movementY);

    ball.position.x = movementX;
    ball.position.y = movementY;

}




$(function() {
    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("complete", handleComplete, this);
    queue.on("progress", handleProgress, this);
    queue.loadManifest([
        // {id: "physijs_worker",src: "/js/libs/physijs_worker.js"},
        {
            id: "ammo",
            src: "/assets/js/libs/ammo.js"
        }, {
            id: "basketback",
            src: "/assets/js/models/basketback.js"
        }, {
            id: "basketring",
            src: "/assets/js/models/basketring.js"
        }, {
            id: "score",
            src: "/assets/sounds/score.mp3"
        }
    ]);


})

function handleComplete() {
    $('.preload').delay(10).fadeOut('slow');
    basket.init();
    basket.animate();

    // createjs.Sound.play("music", {loop:-1});
}

function handleProgress(e) {
    var percentLoaded = Math.round(e.loaded * 100);
    $('.percentLoaded').html(percentLoaded + ' %');
    $('.progress').css('width', percentLoaded + '%')
}
