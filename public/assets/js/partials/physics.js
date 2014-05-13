var physics = {

    /**
     *
     * Initialize Physi.js
     * Build a Physi.js scene, which takes the place of a THREE scene
     *
     */
    build_scene : function() {

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
}