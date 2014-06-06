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
            renderer.setSize(sceneW, sceneH)
            renderer.setClearColor(0x66ccff); // background color
            renderer.shadowMapEnabled = true;
            renderer.shadowMapSoft = true;
            renderer.shadowMapType = THREE.PCFShadowMap;
            renderer.shadowMapAutoUpdate = true;
            container.appendChild(renderer.domElement);

      },

      /**
       *
       * Build the THREE camera's
       *
       */

      build_thecamera : function() {

            var mainCamera = new THREE.PerspectiveCamera(50, sceneW / sceneH, 1, 10000);
            mainCamera.position.z =  1050; // move back
            mainCamera.position.y = 100; // move up
            mainCamera.name = "main";
            mainCamera.lookAt(new THREE.Vector3(0,0,0)); // point it down at the center of the 3D scene

            // var backCamera = new THREE.PerspectiveCamera(50, sceneW / sceneH, 1, 10000);
            // backCamera.position.z =  1200; // move back
            // backCamera.position.y = 300; // move up
            // backCamera.name = "back";
            // backCamera.lookAt(new THREE.Vector3(0,0,0)); // point it down at the center of the 3D scene

            this.get_thecurrentCam = 0;
            this.get_AllTheCameras = [mainCamera];

            yeswecan.get_theSceneCam = yeswecan.get_AllTheCameras[yeswecan.get_thecurrentCam];

      },

      /**
       *
       * Build the groud, basketstand
       *
       */

      build_thebasketstand : function() {

            /**
             *
             * Build the ground
             *
             */


            yeswecan_setSomeArguments = {
              'type' : 'plane', 'width' : 1000,
              'height' : 1000, 'wSegments' : 10,
              'hSegments' : 10, 'color' : 0xCC0030,
              'transparent' : false, 'texture' : 'court.jpg', 'opacity' : 1,
              'friction' : .1, 'restitution' : .3,
              'posZ' : 500, 'rotX' : -90, 'name' : 'ground'
            }
            this.build_thelowpolystand(yeswecan_setSomeArguments);

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



            var court = new THREE.ObjectLoader();

            court.load('assets/js/models/court.js', function (mesh) {

                mesh.scale.set(70, 70, 70);
                mesh.position.set(1300, -20, 2500);
                mesh.rotation.y = helpMe.calculate('rad', 90);


                console.log(mesh);
                mesh.name = 'court';
                scene.add(mesh);

            });


                        var plane = new THREE.ObjectLoader();

                        plane.load('assets/js/models/plane.js', function (mesh) {

                            mesh.scale.set(5, 5, 5);
                            mesh.position.set(3000, 400, -400);
                            mesh.rotation.y = helpMe.calculate('rad', 90);


                            console.log(mesh);
                            mesh.name = 'plane';
                            scene.add(mesh);


                            var materialFront = new THREE.MeshBasicMaterial( { color: 0xCC0030, transparent : true, opacity : 1 } );
                            var materialSide = new THREE.MeshBasicMaterial( { color: '#FFF', transparent: true, opacity: 0.5 } );
                            var materialArray = [ materialFront, materialSide ];
                            var textGeom = new THREE.TextGeometry( 'GO ROBBERT GO!!!',
                            {
                                  size: 20, height: 7, curveSegments: 3,
                                  font: "helvetiker", weight: "bold", style: "normal",
                                  bevelThickness: 0, bevelSize: 0, bevelEnabled: false,
                                  material: 0, extrudeMaterial: 1
                            });

                            var textMaterial = new THREE.MeshFaceMaterial(materialArray);
                            var textMesh = new THREE.Mesh(textGeom, textMaterial );

                            textGeom.computeBoundingBox();
                            var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

                            textMesh.position.set( 3180 , 390, -400 );
                            textMesh.name = 'gogogo';

                            scene.add(textMesh);


                            setTimeout(function() {


                            var flyPlain = setInterval(function() {
                              if(basket.start) {
                                if(mesh.position.x <= -3000)
                                {
                                  clearInterval(flyPlain);
                                }
                                else {
                                  mesh.position.x -= 2.5;
                                  textMesh.position.x -= 2.5;
                                }
                              }
                            }, 10)
                          }, 1000 + Math.random() * 2000);

                        });

            /**
             *
             * Create all the hitboxes
             *
             */

            hitboxes.create();

            yeswecan_setSomeArguments = {
              'type' : 'cube', 'width' : 500,
              'height' : 75, 'depth' : 15,
              'wSegments' : 10, 'hSegments' : 10,
              'color' : 0xCC0030, 'transparent' : true,
              'opacity' : 0, 'friction' : .4,
              'restitution' : .4, 'posY' : 45,
              'posZ' : 92, 'rotX' : 90, 'name' : 'wallprizetop'
            }
            this.build_thelowpolystand(yeswecan_setSomeArguments);

            yeswecan_setSomeArguments = {
              'type' : 'cube', 'width' : 500,
              'height' : 75, 'depth' : 15,
              'wSegments' : 10, 'hSegments' : 10,
              'color' : 0xFFFF00, 'transparent' : true,
              'opacity' : 0, 'friction' : .4,
              'restitution' : .4, 'posY' : 10,
              'posZ' : 120, 'name' : 'wallprizebottom'
            }
            this.build_thelowpolystand(yeswecan_setSomeArguments);

            yeswecan_setSomeArguments = {
              'type' : 'cube', 'width' : 200,
              'height' : 20, 'depth' : 15,
              'wSegments' : 10, 'hSegments' : 10,
              'color' : 0xFFFF00, 'transparent' : true,
              'opacity' : 0, 'friction' : .4,
              'restitution' : .4, 'posX' : -70, 'posY' : 10,
              'posZ' : 800, 'rotY' : 45, 'name' : 'blockballsleft'
            }
            this.build_thelowpolystand(yeswecan_setSomeArguments);

            yeswecan_setSomeArguments = {
              'type' : 'cube', 'width' : 200,
              'height' : 20, 'depth' : 15,
              'wSegments' : 10, 'hSegments' : 10,
              'color' : 0xFFFF00, 'transparent' : true,
              'opacity' : 0, 'friction' : .4,
              'restitution' : .4, 'posX' : 70, 'posY' : 10,
              'posZ' : 800, 'rotY' : -45, 'name' : 'blockballsleft'
            }
            this.build_thelowpolystand(yeswecan_setSomeArguments);

            // yeswecan_setSomeArguments = {
            //   'type' : 'cube', 'width' : 300,
            //   'height' : 200, 'depth' : 15,
            //   'wSegments' : 10, 'hSegments' : 10,
            //   'color' : 0xFFFF00, 'texture' : 'kdg.jpg', 'transparent' : true,
            //   'opacity' : 1, 'friction' : .4,
            //   'restitution' : .4, 'posX' : -500, 'posY' : 350,
            //   'posZ' : -220, 'rotY' : 2, 'name' : 'KDGwall'
            // }
            // this.build_thelowpolystand(yeswecan_setSomeArguments);


      },

      build_thelowpolystand : function(args) {


            if(args.type == 'plane')
            {
                var geometry = new THREE.PlaneGeometry(args.width, args.height, args.wSegments, args.hSegments); // width, height, widhtSegments, heightSegments
            }

            if(args.type == 'cube') {
                var geometry = new THREE.BoxGeometry(args.width, args.height, args.depth, args.wSegments, args.hSegments); // width, height, widhtSegments, heightSegments
            }

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();
            var texture;

            if(args.texture)
            {
              texture = THREE.ImageUtils.loadTexture( 'assets/img/' + args.texture );
              texture.wrapS =texture.wrapT = THREE.RepeatWrapping;
              // texture.repeat.set( 1, 1 );
            }

            if(args.name == 'ground')
            {
               var material = Physijs.createMaterial (
                  new THREE.MeshLambertMaterial( {  map : texture, transparent : args.transparent, opacity : args.opacity }),
                  args.friction,
                  args.restitution
              );
            }else {
                 var material = Physijs.createMaterial (
                    new THREE.MeshLambertMaterial( {  map : texture, color : args.color, transparent : args.transparent, opacity : args.opacity }),
                    args.friction,
                    args.restitution
                );
            }



            if(args.type == 'plane')
            {
                var mesh = new Physijs.HeightfieldMesh(geometry, material, 0); // matches a regular grid of height values given in the z-coordinates
            }
            if(args.type == 'cube')
            {
                var mesh = new Physijs.BoxMesh(geometry, material, 0); // matches a regular grid of height values given in the z-coordinates
            }

            if(args.posX) mesh.position.x = args.posX;
            if(args.posY) mesh.position.y = args.posY;
            if(args.posZ) mesh.position.z = args.posZ;
            if(args.rotX)  mesh.rotation.x = helpMe.calculate('rad', args.rotX);
            if(args.rotY)  mesh.rotation.y = helpMe.calculate('rad', args.rotY);
            if(args.rotZ)  mesh.rotation.z = helpMe.calculate('rad', args.rotZ);
            mesh.name = args.name;

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

       buildBacks : function(totalBacks, mesh, i) {

              var basketMaterial = new THREE.MeshPhongMaterial( {  color : totalBacks[i].physics.color, transparent : true, opacity : 0 }, 1, 1 );
              var basketBack = new Physijs.BoxMesh(
                    new THREE.CubeGeometry( totalBacks[i].physics.width, totalBacks[i].physics.height, totalBacks[i].physics.depth ),
                    basketMaterial,
                    0
              );

              basketBack.position.set(totalBacks[i].physics.posX, totalBacks[i].physics.posY, totalBacks[i].physics.posZ); // rechts = center = 0  links =
              basketBack.receiveShadow = true;
              basketBack.name = totalBacks[i].physics.name;
              basketBack.castShadow = true;
              basketBack.number = i;
              scene.add(basketBack);

                  basket.back = {
                    'physics' : basketBack,
                    'model' : mesh,
                  };
                  basketBacks.push(basket.back)

       },

       buildRings: function(totalRings, mesh, i){

               var ringMaterial = new THREE.MeshLambertMaterial( { color: totalRings[i].physics.color, transparent : true, opacity : 0 } );
                  basketRing = new Physijs.ConcaveMesh(
                        new THREE.TorusGeometry( 27, 3, 7, 100),
                        ringMaterial,
                        0
                   );

                  basketRing.position.set(totalRings[i].physics.posX, totalRings[i].physics.posY, totalRings[i].physics.posZ); // ring right = 150, ring center = 0, ring left = -150
                  basketRing.receiveShadow = true;
                  basketRing.rotation.x = helpMe.calculate('rad', totalRings[i].physics.rotX);
                  basketRing.name = totalRings[i].physics.name;
                  basketRing.castShadow = true;
                  scene.add(basketRing);

                  basket.ring = {
                    'physics' : basketRing,
                    'model' : mesh,
                  };

                  basketRings.push(basket.ring)
       },

      build_thebasket : function() {

            /**
             *
             * Create Basketback
             *
             */

             var totalBacks = levels[basket.level].totalRings.back;


            var b =  0;

            var basketLoader = new THREE.ObjectLoader();


            for(var i = 0; i < totalBacks.length; i ++) //  for(var i = 0; i < 12; i += 4)
            {
                  basketLoader.load('assets/js/models/basketback2.js', function (mesh) {

                    mesh.scale.set(totalBacks[b].model.scale, totalBacks[b].model.scale, totalBacks[b].model.scale);
                    mesh.position.set(totalBacks[b].model.posX, totalBacks[b].model.posY, totalBacks[b].model.posZ);
                    mesh.name= totalBacks[b].model.name;
                    mesh.number = b;
                    mesh.material = new THREE.MeshLambertMaterial({
                        color: '#' + totalBacks[b].model.color
                    });
                    scene.add(mesh);

                    console.log(b, totalBacks[b].model.color);

                      yeswecan.buildBacks(totalBacks, mesh, b);

                     b++;
                      console.log(basketBacks);
                  });
            }




            /**
             *
             * Create Basket ring
             *
             */

            var k = 0;

            var totalRings = levels[basket.level].totalRings.ring;
            var ringLoader = new THREE.ObjectLoader();

            for(var i = 0; i < totalRings.length; i++)
            {
                  ringLoader.load('assets/js/models/basketring.js', function (mesh) {

                      mesh.scale.set(totalRings[k].model.scale, totalRings[k].model.scale, totalRings[k].model.scale);
                      mesh.position.set(totalRings[k].model.posX, totalRings[k].model.posY, totalRings[k].model.posZ);
                      mesh.rotation.y = helpMe.calculate('rad', totalRings[k].model.rotY);
                      mesh.material = new THREE.MeshLambertMaterial({
                        color: '#' + totalRings[k].model.color
                      });
                      mesh.name= totalRings[k].model.name;
                      mesh.number = k;

                      scene.add(mesh);



                      yeswecan.buildRings(totalRings, mesh, k);

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

            $('.powerIndicator').css({ 'bottom' : 0});
            basket.power = 0;
            basket.way = 'up';


            var ballTexture = THREE.ImageUtils.loadTexture( 'assets/img/basket.png' );
            ballTexture.wrapS =ballTexture.wrapT = THREE.RepeatWrapping;
            ballTexture.repeat.set( 1, 1 );



            var ballMaterial = Physijs.createMaterial (
                new THREE.MeshBasicMaterial( { map : ballTexture, color: 0xff8000 }),
                .8,
                1.5
            );

            ball = new Physijs.SphereMesh(
                  new THREE.SphereGeometry( 13, 10, 7),
                  ballMaterial
            );

            ball.position.set(0, 30, 800);
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

            //ball.addEventListener( 'collision', look.theBallIsBouncing);

      }

}