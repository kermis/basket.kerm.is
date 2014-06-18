$(function() {

      // override the console log
      console.log = function() {};

      //redirect if on mobile
      if (Modernizr.touch) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                  window.location.replace("http://basket.kerm.is/connect");
            }
      }

      createQRcode();

      $('.choose_button').on('click', showInfo);
      $('.back-button').on('click', goBack);
      $('.play').on('click', startGame);
      $('.score-submit').on('click', addHighscore);

});

var createQRcode = function() {
      // add qrcode
      var qrcode = new QRCode("qrcode", {
            text: url.currentURL + "/mobile/#" + room.id,
            width: 200,
            height: 200,
            colorDark: "#f26f40",
            correctLevel: QRCode.CorrectLevel.H
      });
}

var showInfo = function() {
      var id = $(this).attr('id');
      $('.info .title').html('How do you play the game?')
      $('.back-button').show();
      switch (id) {
            case 'socket':
                  basket.controller = 'mobile';
                  $('.buttons').hide();
                  $('.chose_socket').removeClass('hide').show();
                  break;
            case 'leap':
                  basket.controller = 'leap';
                  $('.buttons').hide();
                  $('.chose_leap').removeClass('hide').show();
                  break;
            case 'computer':
                  basket.controller = 'mouse';
                  $('.buttons').hide();
                  $('.chose_computer').removeClass('hide').show();
                  break;
      }
}

var goBack = function() {
      $('.info .title').html('Which controller do you want to use?');
      $('.chose').addClass('hide');
      $('.chose_socket').hide();
      $('.chose_leap').hide();
      $('.chose_computer').hide();
      $('.buttons').show();
      $('.back-button').hide()
}

var startGame = function() {
      $('.info').removeClass('slide_down');
      //look.theUserIsLockingThePointer();
      $('.info-score').addClass('active');
      basket.infoVisible = false;
      basket.start = true;
      basket.timeLeft('play clicked');
      $(this).blur();
}

var addHighscore = function() {
      $('.score-submit').hide();
      $('.game-over').append('<span class="score-message">Sharing Score</span>');

      var name = $('.user-name').val();
      var score = basket.globalPoints;
      var level = basket.level + 1;
      var scored = basket.totalScored;
      var missed = basket.totalMissed;

      $.post("http://kermisdatabasevanbartenrobbert.herokuapp.com/addhighscore/basket", {
            name: name,
            score: score,
            level: level,
            scored: scored,
            missed: missed
      }).done(function() {
            $('.score-submit').hide();
            $('.score-message').html('score succesully shared.')

      }).fail(function() {
            $('.score-message').html('something went wrong, please try again');
            $('.score-submit').show();
      });
}


/**
 *
 * Global Vars
 *
 */

var container = document.getElementById('container');
var /* camera, */ scene, renderer;
var sceneW, sceneH;
var physicsMaterial;
var throwing = false;
var ball, basketRing;
var basketRings = [],
      basketBacks = [];
var timeRemaining;
var balls = [];
var stats;
var removeObject = [];
var fullscreenElement;
var mouseDown = false;
var basketRingPos, ballPos;
var texture;

/**
 *
 * Text material
 *
 */
var textOptions, materialFront, materialSide, materialArray, textMaterial;

var createTextOptions = function() {
      materialFront = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 1
      });
      materialSide = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: .8
      });
      materialArray = [materialFront, materialSide];
      textMaterial = new THREE.MeshFaceMaterial(materialArray);
}

var setOptions = function(size) {
      var textOptions = {
            size: size,
            height: 10,
            curveSegments: 3,
            font: "helvetiker",
            weight: "bold",
            style: "normal",
            bevelThickness: 0,
            bevelSize: 0,
            bevelEnabled: false,
            material: 0,
            extrudeMaterial: 1
      }

      return textOptions;
}

var loader = new THREE.ObjectLoader();

// basket ball texture + material
var ballTexture = THREE.ImageUtils.loadTexture('assets/img/basket.png');
ballTexture.wrapS = ballTexture.wrapT = THREE.RepeatWrapping;
ballTexture.repeat.set(1, 1);

var ballMaterial = Physijs.createMaterial(
      new THREE.MeshBasicMaterial({
            map: ballTexture,
            color: 0xff8000
      }),
      .8,
      1.5
);