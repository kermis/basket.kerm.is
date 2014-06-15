var hitboxes = {
      create: function() {
            hitboxes.setPoints = [{
                  'from': 12,
                  'to': 81
            }, {
                  'from': 40,
                  'to': 81
            }, {
                  'from': 50,
                  'to': 0
            }];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, -288, 0, 147, -18, -1, false);

            hitboxes.setPoints = [{
                  'from': 12,
                  'to': 81
            }, {
                  'from': 40,
                  'to': 81
            }, {
                  'from': 50,
                  'to': 0
            }];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, 238, 0, 149, -18, 2, false);

            hitboxes.setPoints = [{
                  'from': 0,
                  'to': 53
            }, {
                  'from': 25,
                  'to': 53
            }, {
                  'from': 25,
                  'to': 0
            }];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, -274, 78, 121, -87, false, false);

            hitboxes.setPoints = [{
                  'from': 0,
                  'to': 53
            }, {
                  'from': 25,
                  'to': 53
            }, {
                  'from': 25,
                  'to': 0
            }];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, 250, 78, 121, -87, false, false);

            hitboxes.setPoints = [{
                  'from': 7,
                  'to': 95
            }, {
                  'from': 24,
                  'to': 95
            }, {
                  'from': 25,
                  'to': 0
            }];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, -274, 80, 68, -33, false, false);

            hitboxes.setPoints = [{
                  'from': 0,
                  'to': 95
            }, {
                  'from': 18,
                  'to': 95
            }, {
                  'from': 25,
                  'to': 0
            }];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, 249, 80, 68, -33, false, false);

            hitboxes.setPoints = [{
                  'from': 0,
                  'to': 160
            }, {
                  'from': 20,
                  'to': 215
            }, {
                  'from': 105,
                  'to': 265
            }, {
                  'from': 270,
                  'to': 290
            }, {
                  'from': 442,
                  'to': 264
            }, {
                  'from': 520,
                  'to': 215
            }, {
                  'from': 530,
                  'to': 165
            }, {
                  'from': 540,
                  'to': 0
            }, ];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, -270, 0, -74, -5, -1, false);

            hitboxes.setPoints = [{
                  'from': -2,
                  'to': 120
            }, {
                  'from': 22,
                  'to': 120
            }, {
                  'from': 17,
                  'to': 0
            }];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, -267, 159.5, 16, -90, false, false);

            hitboxes.setPoints = [{
                  'from': -5,
                  'to': 120
            }, {
                  'from': 18,
                  'to': 120
            }, {
                  'from': 17,
                  'to': 0
            }];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, 250, 159.5, 16, -90, false, false);

            hitboxes.setPoints = [{
                  'from': -12,
                  'to': 160
            }, {
                  'from': 81,
                  'to': 157
            }, {
                  'from': 130,
                  'to': 81
            }, {
                  'from': 130,
                  'to': 0
            }];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, 248, 0, -65, false, -90, false);

            hitboxes.setPoints = [{
                  'from': 0,
                  'to': 80
            }, {
                  'from': 57,
                  'to': 77
            }, {
                  'from': 80,
                  'to': 0
            }, ];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, 248, 0, 65, false, -90, false);

            hitboxes.setPoints = [{
                  'from': 0,
                  'to': 80
            }, {
                  'from': 53,
                  'to': 160
            }, {
                  'from': 160,
                  'to': 160
            }, {
                  'from': 200,
                  'to': 0
            }];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, -248, 0, 68, false, 90, false);

            hitboxes.setPoints = [{
                  'from': 25,
                  'to': 78
            }, {
                  'from': 80,
                  'to': 80
            }, {
                  'from': 80,
                  'to': 0
            }];

            hitboxes.build(hitboxes.setPoints, 0xff0000, true, 0, -248, 0, 147, false, 90, false);

            yeswecan_setSomeArguments = {
                  'type': 'cube',
                  'width': 500,
                  'height': 75,
                  'depth': 15,
                  'wSegments': 10,
                  'hSegments': 10,
                  'color': 0xCC0030,
                  'transparent': true,
                  'opacity': 0,
                  'friction': .4,
                  'restitution': .4,
                  'posY': 45,
                  'posZ': 92,
                  'rotX': 90,
                  'name': 'wallprizetop'
            }
            yeswecan.build_thelowpolystand(yeswecan_setSomeArguments);

            yeswecan_setSomeArguments = {
                  'type': 'cube',
                  'width': 500,
                  'height': 75,
                  'depth': 15,
                  'wSegments': 10,
                  'hSegments': 10,
                  'color': 0xFFFF00,
                  'transparent': true,
                  'opacity': 0,
                  'friction': .4,
                  'restitution': .4,
                  'posY': 10,
                  'posZ': 120,
                  'name': 'wallprizebottom'
            }
            yeswecan.build_thelowpolystand(yeswecan_setSomeArguments);

            yeswecan_setSomeArguments = {
                  'type': 'cube',
                  'width': 200,
                  'height': 20,
                  'depth': 15,
                  'wSegments': 10,
                  'hSegments': 10,
                  'color': 0xFFFF00,
                  'transparent': true,
                  'opacity': 0,
                  'friction': .4,
                  'restitution': .4,
                  'posX': -70,
                  'posY': 10,
                  'posZ': 600,
                  'rotY': 45,
                  'name': 'blockballsleft'
            }
            yeswecan.build_thelowpolystand(yeswecan_setSomeArguments);

            yeswecan_setSomeArguments = {
                  'type': 'cube',
                  'width': 200,
                  'height': 20,
                  'depth': 15,
                  'wSegments': 10,
                  'hSegments': 10,
                  'color': 0xFFFF00,
                  'transparent': true,
                  'opacity': 0,
                  'friction': .4,
                  'restitution': .4,
                  'posX': 70,
                  'posY': 10,
                  'posZ': 600,
                  'rotY': -45,
                  'name': 'blockballsleft'
            }
            yeswecan.build_thelowpolystand(yeswecan_setSomeArguments);
      },

      build: function(points, color, transparent, opacity, posX, posY, posZ, rotX, rotY, rotZ) {

            var rectShape = new THREE.Shape();
            rectShape.moveTo(0, 0);
            for (var i = 0; i < points.length; i++) {
                  rectShape.lineTo(points[i].from, points[i].to);
            }
            rectShape.lineTo(0, 0);

            var rectGeom = new THREE.ShapeGeometry(rectShape);
            var rectMesh = new Physijs.ConvexMesh(rectGeom, new THREE.MeshBasicMaterial({
                  color: color,
                  transparent: transparent,
                  opacity: opacity
            }));

            rectMesh.name = 'hitbox';

            if (posX) rectMesh.position.x = posX;
            if (posY) rectMesh.position.y = posY;
            if (posZ) rectMesh.position.z = posZ;
            if (rotX) rectMesh.rotation.x = helpMe.calculate('rad', rotX);
            if (rotY) rectMesh.rotation.y = helpMe.calculate('rad', rotY);
            if (rotZ) rectMesh.rotation.z = helpMe.calculate('rad', rotZ);

            scene.add(rectMesh);

      }
}