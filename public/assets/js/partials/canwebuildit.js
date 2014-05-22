/**
 *
 * canwebuiltit.js #YESWECAN
 *
 */

var yeswecan = {

    build_everything : function() {
      yeswecan.build_thebasketstand();
      yeswecan.build_thelights();
      yeswecan.build_thebasket();
      yeswecan.build_theball();
    },

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
      camera.position.z =  750; // move back
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
      cams.position.z = -63; // move back
      cams.position.y =200; // move up
      cams.position.x = 0;
      cams.rotation.y = helpMe.calculate('rad', 180);
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
        * Load basket stand
        *
        */

        var landscape = new THREE.ObjectLoader();
        landscape.load('assets/js/models/stand.js', function (mesh) {

            mesh.scale.set(0.25, 0.25, 0.25);
            mesh.position.set(0, 0, 100);
            mesh.name = 'basketstand';

            scene.add(mesh);

        });

        /**
         *
         * Create all the hitboxes
         *
         */

        hitboxes.create();


    },

    build_theHitBoxes : function(points, color, transparent, opacity, posX, posY, posZ, rotX, rotY, rotZ) {

      var rectShape = new THREE.Shape();
      rectShape.moveTo( 0,0 );
      for(var i = 0; i < points.length; i++)
      {
          rectShape.lineTo(points[i].from, points[i].to );
      }
      rectShape.lineTo( 0, 0 );

      var rectGeom = new THREE.ShapeGeometry( rectShape );
      var rectMesh = new Physijs.ConvexMesh( rectGeom, new THREE.MeshBasicMaterial( { color: color, transparent : transparent, opacity : opacity } ) ) ;

      rectMesh.name = 'hitbox';

      if(posX) rectMesh.position.x = posX;
      if(posY) rectMesh.position.y = posY;
      if(posZ) rectMesh.position.z = posZ;
      if(rotX) rectMesh.rotation.x = helpMe.calculate('rad', rotX);
      if(rotY) rectMesh.rotation.y = helpMe.calculate('rad', rotY);
      if(rotZ) rectMesh.rotation.z = helpMe.calculate('rad', rotZ);

      scene.add( rectMesh );
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
      light.name = 'light';
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



      var totalBacks = levels[basket.level].totalRings.back;

       var b =  0;
      //var length = levels[basket.level].totalRings * 4;
       for(var i = 0; i < totalBacks.length; i ++) //  for(var i = 0; i < 12; i += 4)
       {
          var basketMaterial = new THREE.MeshPhongMaterial( {  color : totalBacks[i].physics.color, transparent : totalBacks[i].physics.transparent, opacity : totalBacks[i].physics.opacity }, 1, 1 );
          var basketBack = new Physijs.BoxMesh(
            new THREE.CubeGeometry( totalBacks[i].physics.width, totalBacks[i].physics.height, totalBacks[i].physics.depth ),
            basketMaterial,
            0
           );

          basketBack.position.set(totalBacks[i].physics.posX, totalBacks[i].physics.posY, totalBacks[i].physics.posZ); // rechts = center = 0  links =
          basketBack.receiveShadow = true;
          basketBack.name = totalBacks[i].physics.name;
          basketBack.castShadow = true;
          scene.add(basketBack);

          var basketLoader = new THREE.ObjectLoader();


          basketLoader.load('assets/js/models/basketback2.js', function (mesh) {

              mesh.scale.set(totalBacks[b].model.scale, totalBacks[b].model.scale, totalBacks[b].model.scale);
              mesh.position.set(totalBacks[b].model.posX, totalBacks[b].model.posY, totalBacks[b].model.posZ);
              mesh.name= totalBacks[b].model.name;
              mesh.material.color.setHex(totalBacks[b].model.color);
              scene.add(mesh);
              b++;

            });
        }

      /**
       *
       * Create Basket ring
       *
       */

       var k = 0;

      var totalRings = levels[basket.level].totalRings.ring;

      console.log('length rings', totalRings);

       for(var i = 0; i < totalRings.length; i++)
       {
          var ringMaterial = new THREE.MeshBasicMaterial( { color: totalRings[i].physics.color, transparent : totalRings[i].physics.transparent, opacity : totalRings[i].physics.opacity } );
          basketRing = new Physijs.ConcaveMesh(
            new THREE.TorusGeometry( totalRings[i].physics.radius, totalRings[i].physics.tube, totalRings[i].physics.segmentsR, totalRings[i].physics.segmentsT),
            ringMaterial,
            0
           );

          basketRing.position.set(totalRings[i].physics.posX, totalRings[i].physics.posY, totalRings[i].physics.posZ); // ring right = 150, ring center = 0, ring left = -150
          basketRing.receiveShadow = true;
          basketRing.rotation.x = helpMe.calculate('rad', totalRings[i].physics.rotX);
          basketRing.name = totalRings[i].physics.name;
          basketRing.number = i;
          basketRing.castShadow = true;
          scene.add(basketRing);
          basketRings.push(basketRing);

          var ringLoader = new THREE.ObjectLoader();
          ringLoader.load('assets/js/models/basketring.js', function (mesh) {

              mesh.scale.set(totalRings[k].model.scale, totalRings[k].model.scale, totalRings[k].model.scale);
              mesh.position.set(totalRings[k].model.posX, totalRings[k].model.posY, totalRings[k].model.posZ);
              mesh.rotation.y = helpMe.calculate('rad', totalRings[k].model.rotY);
              mesh.name= totalRings[k].model.name;

              scene.add(mesh);

              k++;

            });

      }


    },

    /**
     *
     * Build the ball and draw its texture with a 2D canvas
     *
     */

    build_theball : function() {

      // reset power
      $('.power').css({ 'height' : '10px', 'background-color' : 'orange' });
      basket.power = 0;
      basket.way = 'up';


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

      ball.addEventListener( 'collision', look.theBallIsBouncing);

    }

}