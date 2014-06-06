/**
 *
 * Preload all the models and sounds
 *
 */


$(function() {
    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("complete", handleComplete, this);
    queue.on("progress", handleProgress, this);
    queue.loadManifest([
        {
            id: "ammo",
            src: "/assets/js/libs/ammo.js"
        }, {
            id: "basketback1",
            src: "/assets/js/models/basketback1.js"
        }, {
            id: "basketback2",
            src: "/assets/js/models/basketback2.js"
        }, {
            id: "basketback3",
            src: "/assets/js/models/basketback3.js"
        }, {
            id: "basketring",
            src: "/assets/js/models/basketring.js"
        }, {
            id: "score",
            src: "/assets/sounds/score.mp3"
        },
        {
            id: "texture",
            src: "/assets/img/basket.png"
        }
    ]);


})


/**
 *
 * Start game and start animation loop
 *
 */



function handleComplete() {
    $('.overlay').delay(10).fadeOut('slow', function() {
        $('.info').addClass('slide_down');
     });

    basket.init();
    basket.animate();
}

/**
 *
 * Show loading progress
 *
 */



function handleProgress(e) {
    var percentLoaded = Math.round(e.loaded * 100);
    $('.percentLoaded').html(percentLoaded + ' %');
    $('.progress').css('width', percentLoaded + '%')
}


