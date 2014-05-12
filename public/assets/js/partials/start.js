var start = {
    step : 1,

    init : function() {
        console.log('start.init');

        $('.step-' + this.step).delay(500).fadeIn(500);

         start.step_length = $('.step').not('.final').length;


        $('.step .button').on('click', function() {
            console.log($(this).parent());

            console.log($('.step').not('.final').length);

            if(start.step_length > start.step)
            {

                console.log($('.step').length, start.step, ('.step').length >= start.step);

                $(this).parent().fadeOut(500).next().fadeIn(500);

                start.step++;

            }
            else {
                console.log('done');
            }

        });

    }
}
