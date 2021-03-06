/**
 *
 * canwebuiltit.js #YESWECAN
 *
 */

var yeswecan = {
      /**
       *
       * Build everything
       *
       */
      build_everything: function() {
            yeswecan.build_therenderer();
            yeswecan.build_thecamera();
            yeswecan.build_thebasketstand();
            yeswecan.build_thelights();
            yeswecan.build_thebasket();
            yeswecan.build_theball();
            yeswecan.build_thecloud();
            yeswecan.build_theplane();
      },

      /**
       *
       * Build the WebGL renderer
       *
       */

      build_therenderer: function() {
            renderer = new THREE.WebGLRenderer({
                  antialias: true
            });
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

      build_thecamera: function() {
            var mainCamera = new THREE.PerspectiveCamera(45, sceneW / sceneH, 1, 10000);
            mainCamera.position.z = 850; // move back
            mainCamera.position.y = 100; // move up
            mainCamera.name = "main";

            this.get_thecurrentCam = 0;
            this.get_AllTheCameras = [mainCamera];

            yeswecan.get_theSceneCam = yeswecan.get_AllTheCameras[yeswecan.get_thecurrentCam];
      },

      /**
       *
       * Build the groud, basketstand
       *
       */

      build_thebasketstand: function() {

            /**
             *
             * Build the ground
             *
             */
            yeswecan_setSomeArguments = {
                  'type': 'plane',
                  'width': 1000,
                  'height': 1000,
                  'wSegments': 10,
                  'hSegments': 10,
                  'color': 0xCC0030,
                  'transparent': false,
                  'texture': 'court.jpg',
                  'opacity': 1,
                  'friction': .1,
                  'restitution': .3,
                  'posZ': 500,
                  'rotX': -90,
                  'name': 'ground'
            }
            this.build_thelowpolystand(yeswecan_setSomeArguments);

            /**
             *
             * Load basket stand
             *
             */
            loader.load('assets/js/models/stand.js', function(mesh) {
                  mesh.scale.set(0.25, 0.25, 0.25);
                  mesh.position.set(0, 0, 100);
                  mesh.name = 'basketstand';
                  scene.add(mesh);
            });

            loader.load('assets/js/models/court.js', function(mesh) {
                  mesh.scale.set(70, 70, 70);
                  mesh.position.set(1300, -20, 2500);
                  mesh.rotation.y = helpMe.calculate('rad', 90);
                  mesh.name = 'court';
                  scene.add(mesh);
            });

            /**
             *
             * Create all the hitboxes
             *
             */

            hitboxes.create();
      },

      build_theplane: function() {
            loader.load('assets/js/models/plane.js', function(mesh) {
                  mesh.scale.set(5, 5, 5);
                  mesh.position.set(3000, 400, -400);
                  mesh.rotation.y = helpMe.calculate('rad', 90);
                  mesh.name = 'plane';
                  scene.add(mesh);

                  //create motivation text
                  var random = 1 + Math.ceil(Math.random() * slogans.length);

                  createTextOptions();

                  var textGeom = new THREE.TextGeometry(slogans[random], setOptions(20));
                  var textMesh = new THREE.Mesh(textGeom, textMaterial);
                  textGeom.computeBoundingBox();
                  var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
                  textMesh.position.set(3180, 390, -400);
                  textMesh.name = 'gogogo';
                  scene.add(textMesh);

                  // animate plane and text
                  yeswecan.animateThePlane(mesh, textMesh);
            });
      },

      animateThePlane: function(mesh, textMesh) {
            var fly = setTimeout(function() {
                  var flyPlain = setInterval(function() {
                        if (basket.start) {
                              if (mesh.position.x <= -3000) {
                                    clearInterval(flyPlain);
                              } else {
                                    mesh.position.x -= 2.5;
                                    textMesh.position.x -= 2.5;
                              }
                        }
                  }, 10)
            }, 1000 + Math.random() * (levels[basket.level].time * 1000));
      },

      build_thelowpolystand: function(args) {

            if (args.texture) {
                  texture = THREE.ImageUtils.loadTexture('assets/img/' + args.texture);
                  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }

            if (args.name == 'ground') {
                  var material = Physijs.createMaterial(
                        new THREE.MeshLambertMaterial({
                              map: texture,
                              transparent: args.transparent,
                              opacity: args.opacity
                        }),
                        args.friction,
                        args.restitution
                  );
            } else {
                  var material = Physijs.createMaterial(
                        new THREE.MeshLambertMaterial({
                              map: texture,
                              color: args.color,
                              transparent: args.transparent,
                              opacity: args.opacity
                        }),
                        args.friction,
                        args.restitution
                  );
            }

            if (args.type == 'plane') {
                  var geometry = new THREE.PlaneGeometry(args.width, args.height, args.wSegments, args.hSegments); // width, height, widhtSegments, heightSegments
                  var mesh = new Physijs.HeightfieldMesh(geometry, material, 0); // matches a regular grid of height values given in the z-coordinates
            }

            if (args.type == 'cube') {
                  var geometry = new THREE.BoxGeometry(args.width, args.height, args.depth, args.wSegments, args.hSegments); // width, height, widhtSegments, heightSegments
                  var mesh = new Physijs.BoxMesh(geometry, material, 0); // matches a regular grid of height values given in the z-coordinates

            }

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            if (args.posX) mesh.position.x = args.posX;
            if (args.posY) mesh.position.y = args.posY;
            if (args.posZ) mesh.position.z = args.posZ;
            if (args.rotX) mesh.rotation.x = helpMe.calculate('rad', args.rotX);
            if (args.rotY) mesh.rotation.y = helpMe.calculate('rad', args.rotY);
            if (args.rotZ) mesh.rotation.z = helpMe.calculate('rad', args.rotZ);

            mesh.name = args.name;
            scene.add(mesh);
      },

      /**
       *
       * Create an ambient light and a spot light
       *
       */

      build_thelights: function() {
            var light = new THREE.HemisphereLight(0xffffff, 0x000000, 1)
            light.name = 'light';
            scene.add(light)
      },

      /**
       *
       * Create the basket goal
       *
       */

      buildBacks: function(totalBacks, mesh, i) {

            var basketMaterial = new THREE.MeshPhongMaterial({
                  color: totalBacks[i].physics.color,
                  transparent: true,
                  opacity: 0
            }, 1, 1);

            var basketBack = new Physijs.BoxMesh(
                  new THREE.CubeGeometry(totalBacks[i].physics.width, totalBacks[i].physics.height, totalBacks[i].physics.depth),
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
                  'physics': basketBack,
                  'model': mesh,
            };

            basketBacks.push(basket.back)

      },

      buildRings: function(totalRings, mesh, i) {

            var ringMaterial = new THREE.MeshLambertMaterial({
                  color: totalRings[i].physics.color,
                  transparent: true,
                  opacity: 0
            }, 1, 1);

            basketRing = new Physijs.ConcaveMesh(
                  new THREE.TorusGeometry(27, 3, 7, 100),
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
                  'physics': basketRing,
                  'model': mesh,
            };

            basketRings.push(basket.ring)
      },

      build_thebasket: function() {

            /**
             *
             * Create Basketbacks
             *
             */

            var totalBacks = levels[basket.level].totalRings.back;
            var b = 0;


            for (var i = 0; i < totalBacks.length; i++) //  for(var i = 0; i < 12; i += 4)
            {
                  loader.load('assets/js/models/basketback2.js', function(mesh) {

                        mesh.scale.set(totalBacks[b].model.scale, totalBacks[b].model.scale, totalBacks[b].model.scale);
                        mesh.position.set(totalBacks[b].model.posX, totalBacks[b].model.posY, totalBacks[b].model.posZ);
                        mesh.name = totalBacks[b].model.name;
                        mesh.number = b;
                        mesh.material = new THREE.MeshLambertMaterial({
                              color: '#' + totalBacks[b].model.color
                        });
                        scene.add(mesh);

                        yeswecan.buildBacks(totalBacks, mesh, b);
                        b++;
                  });
            }


            /**
             *
             * Create Basketrings
             *
             */

            var k = 0;
            var totalRings = levels[basket.level].totalRings.ring;


            for (var i = 0; i < totalRings.length; i++) {
                  loader.load('assets/js/models/basketring.js', function(mesh) {

                        mesh.scale.set(totalRings[k].model.scale, totalRings[k].model.scale, totalRings[k].model.scale);
                        mesh.position.set(totalRings[k].model.posX, totalRings[k].model.posY, totalRings[k].model.posZ);
                        mesh.rotation.y = helpMe.calculate('rad', totalRings[k].model.rotY);
                        mesh.material = new THREE.MeshLambertMaterial({
                              color: '#' + totalRings[k].model.color
                        });
                        mesh.name = totalRings[k].model.name;
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

      build_theball: function() {

            $('.powerIndicator').css({
                  'bottom': 0
            });

            basket.power = 0;
            basket.way = 'up';

            ball = new Physijs.SphereMesh(
                  new THREE.SphereGeometry(13, 10, 7),
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

            ball.setAngularFactor(new THREE.Vector3(0, 0, 0));
            ball.setLinearFactor(new THREE.Vector3(0, 0, 0));
            ball.setLinearVelocity(new THREE.Vector3(0, 0, 0));
            ball.setAngularVelocity(new THREE.Vector3(0, 0, 0));
      },

      build_thecloud: function() {
            loader.load('assets/js/models/wolk.js', function(mesh) {
                  mesh.scale.set(2, 2, 2);
                  mesh.position.set(-500, -400, -500);
                  mesh.name = 'cloud';
                  scene.add(mesh);
                  basket.clouds = mesh;
            });
      }
}