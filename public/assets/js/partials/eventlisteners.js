$(function() {
      /**
       *
       * Call functions in watch.js
       *
       */

      document.addEventListener('mousedown', look.theMouseIsGoingDown, false);
      document.addEventListener('mouseup', look.theMouseIsGoingUp, false);
      document.addEventListener('mousemove', look.theMouseIsMoving, false);
      document.addEventListener('keydown', look.theKeyIsGoingDown, false);
      window.addEventListener('resize', look.theWindowIsResizing, false);

      var fullscreenchange = 'fullscreenchange' || 'mozfullscreenchange' || 'webkitfullscreenchange';
      document.addEventListener(fullscreenchange, look.theScreenIsGoingFullscreen, false);

      var pointerlockchange = 'pointerlockchange' || 'mozpointerlockchange' || 'webkitpointerlockchange';
      document.addEventListener(pointerlockchange, look.thePointerIsBeingLocked, false);

      var pointerlockerror = 'pointerlockerror' || 'mozpointerlockerror' || 'webkitpointerlockerror';
      document.addEventListener(pointerlockerror, look.thePointerLockHasGoneWrong, false);
})