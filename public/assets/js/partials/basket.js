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

var ball;

var stats;


// The element we'll make fullscreen and pointer locked.
var fullscreenElement;

/**
 *
 * Initialize the game
 *
 */

function init() {

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
  buildPhysicsScene();
  buildRenderer();
  buildCamera();
  buildGround();
  buildLights();
  buildGoal();
  buildBall();

}

/**
 *
 * Update the physics engine and render every frame
 *
 */

var animate = function() {

  scene.simulate(); // run physics
  renderer.render(scene, camera); // render the scene
  stats.update();
  requestAnimationFrame(animate); // continue animating

};


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


/**
 *
 * Initialize Physi.js
 * Build a Physi.js scene, which takes the place of a THREE scene
 *
 */

var buildPhysicsScene = function() {

  /**
   *
   * Set the path of the web worker javascripts
   *
   */

  Physijs.scripts.worker = '../assets/js/libs/physijs_worker.js';
  Physijs.scripts.ammo = 'ammo.js'; // The must be relative to the physijs_worker.js

  /**
   *
   * Init the scene
   *
   */

  scene = new Physijs.Scene({ reportsize : 50, fixedTimeStep : 1/60 });
  scene.setGravity(new THREE.Vector3(0, -800, 0)); // x, y , z

  scene.addEventListener(
      'update',
      function() {
        scene.simulate( undefined, 2 );
      }
    );

}

/**
 *
 * Build the WebGL renderer
 *
 */

var buildRenderer = function() {

  renderer = new THREE.WebGLRenderer({ antialias : true });
  renderer.setSize(sceneW, sceneH);
  renderer.setClearColor(0x66ccff); // background color
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMapType = THREE.PCFShadowMap;
  renderer.shadowMapAutoUpdate = true;

  container.appendChild(renderer.domElement);

}

/**
 *
 * Build the THREE camera
 *
 */

var buildCamera = function() {

  camera = new THREE.PerspectiveCamera(50, sceneW / sceneH, 1, 10000);
  camera.position.z = 600; // move back
  camera.position.y = 100; // move up
  camera.lookAt(new THREE.Vector3(0,0,0)); // point it down at the center of the 3D scene

}

/**
 *
 * Build the ground and wall plane and rotate it to be flat
 *
 */

var buildGround = function() {

  /**
   *
   * Build the ground
   *
   */



  var groundGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10); // width, height, widhtSegments, heightSegments
  groundGeometry.computeFaceNormals();
  groundGeometry.computeVertexNormals();

  var material = Physijs.createMaterial (
      new THREE.MeshBasicMaterial( {  color : 0xCC0030 }),
      .4,
      .4
      // transparent : true, opacity : 0
  );

  var ground = new Physijs.HeightfieldMesh(groundGeometry, material, 0); // matches a regular grid of height values given in the z-coordinates
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.castShadow = true;
  ground.name = "ground";

  scene.add( ground );

   /**
   *
   * Build the prizewall
   *
   */



  var wallprizeGeometry = new THREE.PlaneGeometry(500, 100, 10, 10); // width, height, widhtSegments, heightSegments
  wallprizeGeometry.computeFaceNormals();
  wallprizeGeometry.computeVertexNormals();

  var material = Physijs.createMaterial (
      new THREE.MeshBasicMaterial( {  color : 0x16ced8, transparent : true, opacity : 0 }),
      .4,
      .4
      // transparent : true, opacity : 0
  );

  var wallprize = new Physijs.HeightfieldMesh(wallprizeGeometry, material, 0); // matches a regular grid of height values given in the z-coordinates
  wallprize.rotation.x = -Math.PI / 2;
  wallprize.position.y = 53;
  wallprize.receiveShadow = true;
  wallprize.castShadow = true;
  wallprize.name = "wallprize";

  scene.add( wallprize );


  /**
   *
   * Build the back wall
   *
   */

  var wallGeometry = new THREE.PlaneGeometry(500, 250, 10, 10); // width, height, widhtSegments, heightSegments
  wallGeometry.computeFaceNormals();
  wallGeometry.computeVertexNormals();

  var wallmaterial = Physijs.createMaterial (
      new THREE.MeshBasicMaterial( {  color : 0xff6fcf, transparent : true, opacity : 0 }),
      .4,
      .4
      // transparent : true, opacity : 0
  );

  var wall = new Physijs.HeightfieldMesh(wallGeometry, wallmaterial, 0); // matches a regular grid of height values given in the z-coordinates
  //wall.rotation.x = -Math.PI / 2;
  wall.receiveShadow = true;
  wall.castShadow = true;
  wall.position.z = -60;
  wall.position.y = 130;
  wall.name = "wall";

  scene.add( wall );

  /**
   *
   * Build the left wall
   *
   */

  var wallLeftGeometry = new THREE.PlaneGeometry(150, 200, 10, 10); // width, height, widhtSegments, heightSegments
  wallLeftGeometry.computeFaceNormals();
  wallLeftGeometry.computeVertexNormals();

  var wallLeftmaterial = Physijs.createMaterial (
      new THREE.MeshBasicMaterial( {  color : 0x8000040, transparent : true, opacity :  0 }),
      .4,
      .4
      // transparent : true, opacity : 0
  );

  var wallLeft = new Physijs.HeightfieldMesh(wallLeftGeometry, wallLeftmaterial, 0); // matches a regular grid of height values given in the z-coordinates
  //wallLeft.rotation.x = -Math.PI / 2;
  wallLeft.receiveShadow = true;
  wallLeft.castShadow = true;
  wallLeft.position.z = 30;
  wallLeft.position.x = -200;
  wallLeft.rotation.y = deg2rad(84);
  wallLeft.position.y = 100;
  wallLeft.name = "wallLeft";

  scene.add( wallLeft );


  /**
   *
   * Build the right wall
   *
   */

  var wallRightGeometry = new THREE.PlaneGeometry(150, 200, 10, 10); // width, height, widhtSegments, heightSegments
  wallRightGeometry.computeFaceNormals();
  wallRightGeometry.computeVertexNormals();

  var wallRightmaterial = Physijs.createMaterial (
      new THREE.MeshBasicMaterial( {  color : 0x8000040, transparent : true, opacity :  0 }),
      .4,
      .4
  );

  var wallRight = new Physijs.HeightfieldMesh(wallRightGeometry, wallRightmaterial, 0); // matches a regular grid of height values given in the z-coordinates
  //wallRight.rotation.x = -Math.PI / 2;
  wallRight.receiveShadow = true;
  wallRight.castShadow = true;
  wallRight.position.z = 100;
  wallRight.position.x = 174;
  wallRight.rotation.y = deg2rad(-90);
  wallRight.position.y = 111;
  wallRight.name = "wallRight";

  scene.add( wallRight );





  /**
   *
   * Load basket stand
   *
   */

    var landscape = new THREE.ObjectLoader();
    landscape.load('assets/js/models/stand.js', function (mesh) {

          mesh.scale.set(0.25, 0.25, 0.25);
          mesh.position.set(0, 0, 100);

          scene.add(mesh);

        });


}



/**
 *
 * Create the basket goal
 *
 */

var buildGoal = function() {

  /**
   *
   * Create Ring
   *
   */


  var ringMaterial = new THREE.MeshPhongMaterial( {  color : 0xff0000, transparent : true, opacity : 0 }, 1, 1 );
  var ring = new Physijs.BoxMesh(
    new THREE.CubeGeometry( 100, 60, 20 ),
    ringMaterial
   );
  ring.position.set(0, 200, -60);
  ring.receiveShadow = true;
  ring.name = "ring";
  ring.castShadow = true;
  scene.add(ring);

  // Freeze object
  ring.setLinearFactor(new THREE.Vector3( 0, 0, 0 ));
  ring.setAngularFactor(new THREE.Vector3( 0, 0, 0 ));
  ring.setAngularVelocity(new THREE.Vector3( 0, 0, 0 ));
  ring.setLinearVelocity(new THREE.Vector3( 0, 0, 0 ));

  /**
   *
   * Create Basket
   *
   */

  var basketMaterial = new THREE.MeshBasicMaterial( { color: 0xCC0030, transparent : true, opacity : 1 } );
  var basket = new Physijs.ConcaveMesh(
    new THREE.TorusGeometry( 30, 3, 7, 200),
    basketMaterial
   );
  basket.position.set(0, 185, -20);
  //basket.position.set(0, 70, 50);
  basket.receiveShadow = true;
  basket.rotation.x = deg2rad(-90);
  basket.name = "basket";
  basket.castShadow = true;
  scene.add(basket);

  // Freeze object
  basket.setLinearFactor(new THREE.Vector3( 0, 0, 0 ));
  basket.setAngularFactor(new THREE.Vector3( 0, 0, 0 ));
  basket.setAngularVelocity(new THREE.Vector3( 0, 0, 0 ));
  basket.setLinearVelocity(new THREE.Vector3( 0, 0, 0 ));

  // /**
  //  *
  //  * Create Basket pole
  //  *
  //  */

  // var poleMaterial = new THREE.MeshPhongMaterial( {  color : 0xCC0030 }, 1, 1 );
  // var pole = new Physijs.BoxMesh(
  //   new THREE.CylinderGeometry( 25, 15, 200 ),
  //   poleMaterial
  //  );
  // pole.position.set(0, 100, -320);
  // pole.receiveShadow = true;
  // pole.name = "pole";
  // pole.castShadow = true;
  // scene.add(pole);

  // // Freeze object
  // pole.setLinearFactor(new THREE.Vector3( 0, 0, 0 ));
  // pole.setAngularFactor(new THREE.Vector3( 0, 0, 0 ));
  // pole.setAngularVelocity(new THREE.Vector3( 0, 0, 0 ));
  // pole.setLinearVelocity(new THREE.Vector3( 0, 0, 0 ));




}

/**
 *
 * Create an ambient light and a spot light
 *
 */

var buildLights = function() {

  var light = new THREE.HemisphereLight(0xFFE7B3, 1.2)
  scene.add(light)

}


/**
 *
 * Build the ball and draw its texture with a 2D canvas
 *
 */

var buildBall = function() {

  var ballMaterial = Physijs.createMaterial (
      new THREE.MeshBasicMaterial( { color: 0xff8000 }),
      .8,
      1.5
  );

  ball = new Physijs.SphereMesh(
    new THREE.SphereGeometry( 13, 10, 7),
    ballMaterial
   );

  ball.position.set(0, 30, 457);
  ball.receiveShadow = true;
  ball.rotation.x = deg2rad(-85);
  ball.name = "ball";
  ball.castShadow = true;



  scene.add(ball);

  ball.setAngularFactor(new THREE.Vector3( 0, 0, 0 ));
  ball.setLinearFactor(new THREE.Vector3( 0, 0, 0 ));
  ball.setLinearVelocity(new THREE.Vector3( 0, 0, 0 ));
  ball.setAngularVelocity(new THREE.Vector3( 0, 0, 0 ));


  // Enable CCD if the object moves more than 1 meter in one simulation frame
  ball.setCcdMotionThreshold(10);

  // Set the radius of the embedded sphere such that it is smaller than the object
  ball.setCcdSweptSphereRadius(0.2);


  ball.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
      // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`

      if(other_object.name == 'basket' || other_object.name == 'ring')
      {
        console.log('collide', other_object);
      }
  });

}


/**
 *
 * Update THREE objects on resize
 *
 */

var onWindowResize = function() {
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
}




var  makeCrossAndSetPosition = function(objectToAddTo, x,y,z){
    var geometry = new THREE.CubeGeometry(1, 100, 1)
    var material = new THREE.MeshBasicMaterial()
    var stick = new THREE.Mesh(geometry, material)
    stick.position = new THREE.Vector3( x, y, z );

    var stick2 = stick.clone();
    stick2.rotation.x = deg2rad(90);

    var stick3 = stick.clone();
    stick3.rotation.z = deg2rad(90);

    objectToAddTo.add(stick);objectToAddTo.add(stick2);objectToAddTo.add(stick3);

}


var deg2rad = function(angle) {

    return angle * .017453292519943295; // (angle / 180) * Math.PI;
}

var rad2deg = function(angle) {

    return angle * 57.29577951308232; // angle / Math.PI * 180
}



 var mousemove = function ( event ) {
    if(mobile.connected == false)
    {
      var movementX = event.movementX       ||
                    event.mozMovementX    ||
                    event.webkitMovementX ||
                    0,
        movementY = event.movementY       ||
                    event.mozMovementY    ||
                    event.webkitMovementY ||
                    0;

                   // moveRifle(movementX, movementY);
      }

}


var fullscreenChange = function() {
  if (document.webkitFullscreenElement === elem ||
      document.mozFullscreenElement === elem ||
      document.mozFullScreenElement === elem) { // Older API upper case 'S'.
    // Element is fullscreen, now we can request pointer lock
    elem.requestPointerLock = elem.requestPointerLock    ||
                              elem.mozRequestPointerLock ||
                              elem.webkitRequestPointerLock;
    elem.requestPointerLock();
  }
}

var pointerLockChange = function() {
  if (document.mozPointerLockElement === elem ||
      document.webkitPointerLockElement === elem) {
    console.log("Pointer Lock was successful.");
  } else {
    console.log("Pointer Lock was lost.");
  }
}

var pointerLockError = function() {
  console.log("Error while locking pointer.");
}



var lockPointer = function() {
  console.log('click');

  elem = document.getElementById("container");
  // Start by going fullscreen with the element. Current implementations
  // require the element to be in fullscreen before requesting pointer
  // lock--something that will likely change in the future.
  elem.requestFullscreen = elem.requestFullscreen    ||
                           elem.mozRequestFullscreen ||
                           elem.mozRequestFullScreen || // Older API upper case 'S'.
                           elem.webkitRequestFullscreen;
  elem.requestFullscreen();
}

var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {

            case 40: // down
                camera.position.y -= 10;
                break;
            case 37: // links
                camera.position.z += 10;
                break;
            case 39: // rechts
                camera.position.z -= 10;
                break;
            case 38: // up
                camera.position.y += 10;
                break;
            case 32 : // spatie
              break;
        }

};




var moveRifle = function(movementX, movementY) {

}

var shoot = function() {
  console.log('click');
  ball.setAngularFactor(new THREE.Vector3( 1, 1, 1 ));
  ball.setLinearFactor(new THREE.Vector3( 1, 1, 1 ));
  ball.setLinearVelocity(new THREE.Vector3( 0, 550, -550 ));
  ball.setAngularVelocity(new THREE.Vector3( 0, 0, 0 ));


  setTimeout(function() {
      buildBall();
  }, 2000);

}