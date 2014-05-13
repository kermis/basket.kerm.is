var basket = {

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






    var geometry = new THREE.CylinderGeometry( 7, 15 , 22, 4 );
    var material = Physijs.createMaterial (
      new THREE.MeshLambertMaterial( {color : 0xCC0030, transparent : true, opacity : 0 }),
      .4,
      .4
    );

    var cylinder = new Physijs.CylinderMesh( geometry, material, 0 );
    cylinder.position.z = 170;
    cylinder.position.x = -195;
    cylinder.position.y = 53;
    cylinder.rotation.y = helpMe.calculate('rad', 145);
    cylinder.rotation.x = helpMe.calculate('rad', -3);
    cylinder.rotation.z = helpMe.calculate('rad', 3);
    cylinder.scale.set(3, 3, 3);
    scene.add( cylinder );


    var geometry = new THREE.CylinderGeometry( 7, 15 , 45, 4 );
    var material = Physijs.createMaterial (
      new THREE.MeshLambertMaterial( {color : 0xCC0030, transparent : true, opacity : 0 }),
      .4,
      .4
    );

    var cylinder = new Physijs.CylinderMesh( geometry, material, 0 );
    cylinder.position.z = 100;
    cylinder.position.x = -200;
    cylinder.position.y = 80;
    cylinder.rotation.y = helpMe.calculate('rad', 45);
    cylinder.rotation.x = helpMe.calculate('rad', -3);
    cylinder.scale.set(3, 3, 3);
    scene.add( cylinder );

    var geometry = new THREE.BoxGeometry( 10, 70 , 40, 4, 4 );
    var material = Physijs.createMaterial (
      new THREE.MeshLambertMaterial( {color : 0xCC0030, transparent : true, opacity : 0 }),
      .4,
      .4
    );

    var cylinder = new Physijs.BoxMesh( geometry, material, 0 );
    cylinder.position.z =  -65;
    cylinder.position.x = -220;
    cylinder.position.y = 112;
    cylinder.rotation.y = helpMe.calculate('rad', -10);
    cylinder.rotation.x = helpMe.calculate('rad', -20);
    cylinder.scale.set(3, 3, 3);
    scene.add( cylinder );












  },


  /**
   *
   * Update the physics engine and render every frame
   *
   */


  animate : function() {
      //ball.__dirtyPosition = true;

      scene.simulate(); // run physics
      renderer.render(scene, camera); // render the scene
      stats.update();
      requestAnimationFrame(basket.animate); // continue animating
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

var ball;

var stats;


// The element we'll make fullscreen and pointer locked.
var fullscreenElement;







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

