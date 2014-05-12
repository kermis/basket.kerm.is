if (!Detector.webgl) Detector.addGetWebGLMessage();

setTimeout(function() {
    setup.createGUI();
}, 1000);


setup.init();
setup.animate();



THREEx.WindowResize(setup.renderer, setup.camera);