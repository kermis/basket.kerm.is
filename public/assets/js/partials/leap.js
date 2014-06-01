var leap = {
	init : function() {
		this.controller = new Leap.Controller({ enableGestures : true });
		this.controller.on('frame' , this.onFrame);
		this.controller.on('streamingStarted', this.onConnect);
		this.controller.on('streamingStopped', this.onDisconnect);
		this.controller.connect();


	},

	onConnect : function() {
		console.log('Leap Succesfully Connected ;)')

		$('.play').removeClass('hide');

		basket.controller = 'leap';
	},

	onDisconnect : function() {
		console.log('Leap Succesfully disconnected ;)')
		$('.play').addClass('hide');

		basket.controller = 'mouse';
	},

	onFrame : function(frame) {

		 try {

                            if(basket.start)
                            {
                                    if(!ball.shot)
                                    {
                                            this.hands = frame.hands;

                                            ball.position.x = Math.ceil(this.hands[0].stabilizedPalmPosition[0] * 1.4);
                                            basket.power = Math.ceil(this.hands[0].stabilizedPalmPosition[1] * 2.5);

                                            if(this.hands[0].stabilizedPalmPosition[1] < 350 && this.hands[0].stabilizedPalmPosition[1] > 0)
                                            {
                                            	$('.powerIndicator').css({ 'bottom' :  this.hands[0].stabilizedPalmPosition[1] - 50 });
                                            }

                                            // console.log(basket.power);

                                            // console.log(this.hands[0].stabilizedPalmPosition[1]);

                                            ball.__dirtyPosition = true;
                                    }
                            }
			// if(!setup.throwed)
			// {

			// 	if(setup.basketball)
			// 	{
			// 		setup.basketball.__dirtyPosition = true;
			// 		setup.basketball.__dirtyRotation = true;
			// 	}


			// 	this.hands = frame.hands;


			// 	//console.log(this.hands[0].palmPosition[1]);
			// 	setup.basketball.position.x = this.hands[0].palmPosition[0] / 5;


			// 	setup.basketball.position.y = this.hands[0].palmPosition[1] / 5;
			// }

		} catch(e) {
			// if(setup.basketball)
			// {
			// 	setup.basketball.__dirtyPosition = false;
			// 	setup.basketball.__dirtyRotation = false;
			// }
			//console.log('error leap.onFrame', e);
		}

		for( var i =  0; i < frame.gestures.length; i++){

	    	var gesture  = frame.gestures[0];
	    	//Per gesture code goes here

	    	var type = gesture.type;

			switch( type ) {
			    case "circle":
			      leap.onCircle( gesture );
			      break;
			    case "swipe":
			      leap.onSwipe( gesture );
                                            ball.__dirtyPosition = false;
			      break;
			    case "screenTap":
			      leap.onScreenTap( gesture );
			      break;
			    case "keyTap":
			      leap.onKeyTap( gesture );
			      break;
		  	}
	  	}
	},
	onSwipe: function( gesture ) {
	      //console.log('swipe', gesture);

                         // basket.controller = 'leap';

		// //Classify swipe as either horizontal or vertical
	          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
	          //Classify as right-left or up-down
	          if(!isHorizontal){

                            if(gesture.direction[1] > 0){
                              //  console.log('is up', gesture.speed);
	                  //swipeDirection = "up";
	                  // if(gesture.speed > 700)
	                  // {
	            	//console.log('THROW A BALL SWIPED');
                                    basket.power = gesture.speed;
	            	look.theUserIsShooting(gesture);
		      // }

	              }
	          }
	},

	onCircle: function( gesture ){
	  //console.log('circle');
	},

	onScreenTap: function( gesture ){
	   	//console.log('THROW A BALL TAPPED');

	   	// console.log(setup.scene);

	   	//setup.throwBall();

	   	// var _vector = new THREE.Vector3;



	   	// console.log('vector', _vector);
	},

	onKeyTap: function( gesture ){
	   	//console.log('NEW BALL');

	   	//setup.loadBall();
	}
}