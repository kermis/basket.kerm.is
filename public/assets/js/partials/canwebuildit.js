/**
 *
 * canwebuiltit.js #YESWECAN
 *
 */



var yeswecan = {

    /**
     *
     * Build the WebGL renderer
     *
     */

    build_therenderer : function() {

      renderer = new THREE.WebGLRenderer({ antialias : true });
      renderer.setSize(sceneW, sceneH);
      renderer.setClearColor(0x66ccff); // background color
      renderer.shadowMapEnabled = true;
      renderer.shadowMapSoft = true;
      renderer.shadowMapType = THREE.PCFShadowMap;
      renderer.shadowMapAutoUpdate = true;

      container.appendChild(renderer.domElement);

    },

    /**
     *
     * Build the THREE camera
     *
     */

    build_thecamera : function() {

      camera = new THREE.PerspectiveCamera(50, sceneW / sceneH, 1, 10000);
      camera.position.z = 600; // move back
      camera.position.y = 100; // move up
      camera.lookAt(new THREE.Vector3(0,0,0)); // point it down at the center of the 3D scene

    },

    /**
     *
     * Build the basketstand
     *
     */

    build_thebasketstand : function() {

      /**
       *
       * Build the ground
       *
       */

       this.build_thelowpolystand('plane', 1000, 1000, 10, 10, 0xCC0030, false, 0,  .4, .4, false, false, false, -90, false, false, 'ground');

       /**
       *
       * Build the prizewall
       *
       */

        this.build_thelowpolystand('cube', 500, 100, 10, 10, 0x16ced8, true, 0,  .4, .4, false, 45, false, -90, false, false, 'wallprize');


        /**
        *
        * Build the back wall
        *
        */

        this.build_thelowpolystand('cube', 400, 240, 10, 10, 0xff6fcf, true, 0,  4, .4, false, 100, -80, -10, false, false, 'backwall');

        /**
        *
        * Build the left wall
        *
        */

        //this.build_thelowpolystand('plane', 150, 200, 10, 10, 0x8000040, true, .5,  .4, .4, -200, 100, 30, false, 84, false, 'leftwall');

        /**
        *
        * Build the right wall
        *
        */

        this.build_thelowpolystand('plane', 230, 200, 10, 10, 0x8000040, true, 0,  .4, .4, 174, 111, 70, false, -90, false, 'rightwall');


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


    },

    build_thelowpolystand : function(object, width, height, wSegments, hSegments, color, transparent, opacity, friction, restitution, posX, posY, posZ, rotX, rotY, rotZ, name) {
            if(object == 'plane')
            {
                var geometry = new THREE.PlaneGeometry(width, height, wSegments, hSegments); // width, height, widhtSegments, heightSegments
            }
            if(object == 'cube') {
                var geometry = new THREE.BoxGeometry(width, height, 15, wSegments, hSegments); // width, height, widhtSegments, heightSegments
            }

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            var material = Physijs.createMaterial (
                new THREE.MeshBasicMaterial( {  color : color, transparent : transparent, opacity : opacity }),
                friction,
                restitution
            );

            if(object == 'plane')
            {
                var mesh = new Physijs.HeightfieldMesh(geometry, material, 0); // matches a regular grid of height values given in the z-coordinates
            }
            if(object == 'cube')
            {
                var mesh = new Physijs.BoxMesh(geometry, material, 0); // matches a regular grid of height values given in the z-coordinates
            }

            if(posX) mesh.position.x = posX;
            if(posY) mesh.position.y = posY;
            if(posZ) mesh.position.z = posZ;
            if(rotX)  mesh.rotation.x = helpMe.calculate('rad', rotX);
            if(rotY)  mesh.rotation.y = helpMe.calculate('rad', rotY);
            if(rotZ)  mesh.rotation.z = helpMe.calculate('rad', rotZ);
            // ground.receiveShadow = true;
            // ground.castShadow = true;
            mesh.name = name;

            scene.add( mesh );
    },

    /**
     *
     * Create an ambient light and a spot light
     *
     */

    build_thelights : function() {

      var light = new THREE.HemisphereLight(0xFFE7B3, 1.2)
      scene.add(light)

    },

    /**
     *
     * Create the basket goal
     *
     */

    build_thebasket : function() {

      /**
       *
       * Create Ring
       *
       */


       for(var i = 0; i < 9; i += 3)
       {
          var ringMaterial = new THREE.MeshPhongMaterial( {  color : 0xff0000, transparent : true, opacity : 0 }, 1, 1 );
          var ring = new Physijs.BoxMesh(
            new THREE.CubeGeometry( 100, 60, 20 ),
            ringMaterial,
            0
           );

          ring.position.set(280 + (-40 * (i +4)), 200, -60);
          ring.receiveShadow = true;
          ring.name = "ring";
          ring.castShadow = true;
          scene.add(ring);
        }

      /**
       *
       * Create Basket Back
       *
       */

       var j = 100;
       for(var i = 0; i < 9; i += 3)
       {
          var basketMaterial = new THREE.MeshBasicMaterial( { color: 0xCC0030, transparent : true, opacity : 1 } );
          var basket = new Physijs.ConcaveMesh(
            new THREE.TorusGeometry( 30, 3, 7, 100 + j ),
            basketMaterial,
            0
           );
          basket.position.set(280 + (-40 * (i +4)), 185, -20);
          console.log(basket.position);
          //basket.position.set(0, 70, 50);
          basket.receiveShadow = true;
          basket.rotation.x = helpMe.calculate('rad', -90);
          basket.name = "basket";
          basket.castShadow = true;
          scene.add(basket);

          j += 250;
      }

    },

    /**
     *
     * Build the ball and draw its texture with a 2D canvas
     *
     */

    build_theball : function() {


       var ballTexture = THREE.ImageUtils.loadTexture( 'assets/img/basket.png' );
       ballTexture.wrapS =ballTexture.wrapT = THREE.RepeatWrapping;
       ballTexture.repeat.set( 1, 0 );



      var ballMaterial = Physijs.createMaterial (
          new THREE.MeshBasicMaterial( { map : ballTexture, color: 0xff8000 }),
          .8,
          1.5
      );

      ball = new Physijs.SphereMesh(
        new THREE.SphereGeometry( 13, 10, 7),
        ballMaterial
       );

      ball.position.set(0, 30, 457);
      ball.receiveShadow = true;
      ball.rotation.x = helpMe.calculate('rad', -85);
      ball.name = "ball";
      ball.castShadow = true;



      scene.add(ball);

      ball.setAngularFactor(new THREE.Vector3( 0, 0, 0 ));
      ball.setLinearFactor(new THREE.Vector3( 0, 0, 0 ));
      ball.setLinearVelocity(new THREE.Vector3( 0, 0, 0 ));
      ball.setAngularVelocity(new THREE.Vector3( 0, 0, 0 ));


      // // Enable CCD if the object moves more than 1 meter in one simulation frame
      // ball.setCcdMotionThreshold(10);

      // // Set the radius of the embedded sphere such that it is smaller than the object
      // ball.setCcdSweptSphereRadius(0.2);

      ball.addEventListener( 'collision', look.theBallIsBouncing);

    }

}