var leap = {
      setPower: false,

      init: function() {
            this.controller = new Leap.Controller({
                  enableGestures: true
            });
            this.controller.on('frame', this.onFrame);
            this.controller.on('streamingStarted', this.onConnect);
            this.controller.on('streamingStopped', this.onDisconnect);
            this.controller.connect();
      },

      onConnect: function() {
            $('.chose_leap .play').removeClass('hide');
            basket.controller = 'leap';
            basket.showNotification('Leap Connected');

            if (basket.start && !basket.infoVisible) {
                  basket.pause();
            }
      },

      onDisconnect: function() {
            $('.chose_leap .play').addClass('hide');
            basket.controller = 'mouse';
            basket.showNotification('Leap Disconnected');

            if (basket.start && !basket.infoVisible) {
                  basket.pause();
            }
      },

      onFrame: function(frame) {
            /**
             *
             * Autoupdate powerindicator if leap is connected
             *
             */

            try {
                  if (basket.start) {
                        if (!ball.shot) {
                              this.hands = frame.hands;

                              ball.position.x = Math.ceil(this.hands[0].stabilizedPalmPosition[0] * 1.4);
                              ball.__dirtyPosition = true;

                              basket.power = Math.ceil(this.hands[0].stabilizedPalmPosition[1] * 2.5);

                              if (this.hands[0].stabilizedPalmPosition[1] < 350 && this.hands[0].stabilizedPalmPosition[1] > 0) {
                                    $('.powerIndicator').css({
                                          'bottom': this.hands[0].stabilizedPalmPosition[1] - 50
                                    });
                              }
                        }
                  }
            } catch (e) {}
      }
}