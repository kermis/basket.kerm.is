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
            console.log('Leap Succesfully Connected ;)')

            $('.chose_leap .play').removeClass('hide');

            basket.controller = 'leap';

            basket.showNotification('Leap Connected');

            basket.pause();
      },

      onDisconnect: function() {
            console.log('Leap Succesfully disconnected ;)')
            $('.chose_leap .play').addClass('hide');

            basket.controller = 'mouse';

            basket.showNotification('Leap Disconnected');

            basket.pause();
      },

      onFrame: function(frame) {
            /**
             *
             * Autoupdate powerindicator if leap
             *
             */




            try {

                  if (basket.start) {
                        if (!ball.shot) {
                              this.hands = frame.hands;

                              ball.position.x = Math.ceil(this.hands[0].stabilizedPalmPosition[0] * 1.4);
                              basket.power = Math.ceil(this.hands[0].stabilizedPalmPosition[1] * 2.5);

                              if (this.hands[0].stabilizedPalmPosition[1] < 350 && this.hands[0].stabilizedPalmPosition[1] > 0) {
                                    $('.powerIndicator').css({
                                          'bottom': this.hands[0].stabilizedPalmPosition[1] - 50
                                    });
                              }

                              // console.log(basket.power);

                              // console.log(this.hands[0].stabilizedPalmPosition[1]);

                              ball.__dirtyPosition = true;


                        }
                  }


            } catch (e) {

            }


      }
}