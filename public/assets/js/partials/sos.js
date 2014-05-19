var helpMe = {
    makeACross : function(objectToAddTo, x,y,z){
        var geometry = new THREE.CubeGeometry(1, 100, 1)
        var material = new THREE.MeshBasicMaterial()
        var stick = new THREE.Mesh(geometry, material)
        stick.position = new THREE.Vector3( x, y, z );

        var stick2 = stick.clone();
        stick2.rotation.x = this.calculate('rad', 90);

        var stick3 = stick.clone();
        stick3.rotation.z = this.calculate('rad', 90);

        objectToAddTo.add(stick);objectToAddTo.add(stick2);objectToAddTo.add(stick3);

    },

    calculate : function(what, angle) {
        if(what == 'rad') return angle * .017453292519943295; // (angle / 180) * Math.PI;

        if(what == 'deg')  return angle * 57.29577951308232; // angle / Math.PI * 180
    }

}
