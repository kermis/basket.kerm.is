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
      camera.position.z = 750; // move back
      camera.position.y = 100; // move up
      camera.name = "front";
      camera.lookAt(new THREE.Vector3(0,0,0)); // point it down at the center of the 3D scene

      this.get_thecurrentCam = 0;

      var  Topcamera = new THREE.PerspectiveCamera(50, sceneW / sceneH, 1, 10000);
      Topcamera.position.z = -100; // move back
      Topcamera.position.y = 550; // move up
      Topcamera.position.x = 0;
      Topcamera.name = "top";
      Topcamera.rotation.x = helpMe.calculate('rad', -75);
      //camera.lookAt(new THREE.Vector3(0,0,0)); // point it down at the center of the 3D scene

      var rightCamera = new THREE.PerspectiveCamera(50, sceneW / sceneH, 1, 10000);
      rightCamera.position.z = 5; // move back
      rightCamera.position.y = 100; // move up
      rightCamera.position.x = 0;
      rightCamera.rotation.y = helpMe.calculate('rad', 90);
      rightCamera.name = "right";

      var cams = new THREE.PerspectiveCamera(50, sceneW / sceneH, 1, 10000);
      cams.position.z = 105; // move back
      cams.position.y =220; // move up
      cams.position.x = 0;
      //cams.rotation.y = helpMe.calculate('rad', 90);
      cams.name = "right";

      // // camera.lookAt(new THREE.Vector3(0,0,0)); // point it down at the center of the 3D scene

      this.get_AllTheCameras = [camera, Topcamera, rightCamera, cams];

      yeswecan.get_theSceneCam = yeswecan.get_AllTheCameras[yeswecan.get_thecurrentCam];

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

       this.build_thelowpolystand('plane', 1000, 1000, 10, 10, 0xCC0030, false, 0,  .4, .4, false, false, 100, -90, false, false, 'ground');

       /**
       *
       * Build the prizewall
       *
       */

      this.build_thelowpolystand('cube', 500, 75, 10, 10, 0xCC0030, true, 0,  .4, .4, false, 45, 92, -90, false, false, 'wallprize');
      this.build_thelowpolystand('cube', 500, 75, 10, 10, 0xFFFF00, true, 0,  .4, .4, false, 10, 120, false, false, false, 'wallprizebottom');


        /**
        *
        * Build the back wall
        *
        */

        //this.build_thelowpolystand('cube', 490, 230, 10, 10, 0xff6fcf, true, 0,  4, .4, false, 100, -83, 0, false, false, 'backwall');

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

        //this.build_thelowpolystand('plane', 230, 200, 10, 10, 0x8000040, true, .5,  .4, .4, 174, 111, 70, false, -90, false, 'rightwall');


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

      var light = new THREE.HemisphereLight(0xffffff, 0x000000, 1)
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
       * Create Basketback
       *
       */



       var l = 0;
       for(var i = 0; i < 12; i += 4)
       {
          var basketMaterial = new THREE.MeshPhongMaterial( {  color : 0xCC0030, transparent : true, opacity : 0 }, 1, 1 );
          var basketBack = new Physijs.BoxMesh(
            new THREE.CubeGeometry( 100, 60, 20 ),
            basketMaterial,
            0
           );

          basketBack.position.set(304 + (-38 * (i +4)), 200, -60);
          basketBack.receiveShadow = true;
          basketBack.name = "basketBack";
          basketBack.castShadow = true;
          scene.add(basketBack);

          var basketLoader = new THREE.ObjectLoader();
          basketLoader.load('assets/js/models/basketback.js', function (mesh) {

              mesh.scale.set(0.25, 0.25, 0.25);
              mesh.position.set(150 - (150 * l), 200, -60);
              mesh.name= "basketback-" + l;

              // console.log('mesh', l, mesh);
              scene.add(mesh);

              l++;

            });

        }

      /**
       *
       * Create Basket ring
       *
       */

       var j = 100, k = 0;
       for(var i = 0; i < 12; i += 4)
       {
          var ringMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent : true, opacity : 0 } );
          basketRing = new Physijs.ConcaveMesh(
            new THREE.TorusGeometry( 27, 3, 7, 100 + j ),
            ringMaterial,
            0
           );
          basketRing.position.set(302 + (-37.7 * (i +4)), 180, -30);
          //console.log(basket.position);
          //basket.position.set(0, 70, 50);
          basketRing.receiveShadow = true;
          basketRing.rotation.x = helpMe.calculate('rad', -90);
          basketRing.name = "basketRing";
          basketRing.castShadow = true;
          scene.add(basketRing);
          basketRings.push(basketRing);


          var ringLoader = new THREE.ObjectLoader();
          ringLoader.load('assets/js/models/basketring.js', function (mesh) {

              mesh.scale.set(0.25, 0.25, 0.25);
              mesh.position.set(150 - (150 * k), 180, -30);
              mesh.rotation.y = helpMe.calculate('rad', 10 + k);
              mesh.name= "ring-" + k;

              scene.add(mesh);

              k++;

            });


          j += 250;


      }




         // var wallGeometry = new THREE.CylinderGeometry( 30, 30, 5, 20 );
         // var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, transparent : true, opacity : 0 } );
         // var wall = new THREE.Mesh(wallGeometry, wireMaterial);
         // wall.position.set(0, 180, -35);
         // scene.add(wall);
         // collidableMeshList.push(wall);

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

      ball.position.set(0, 30, 600);
      ball.receiveShadow = true;
      ball.rotation.x = helpMe.calculate('rad', -85);
      ball.name = "ball";
      ball.shot = false;
      ball.castShadow = true;



      scene.add(ball);

      balls.push(ball);

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