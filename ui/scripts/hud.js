let overLoadRPM = false;
let isOverLoad = false;
let s_Rpm = 0.0;
let o_rpm;
let currentCarAcceleration;

$(function() {
    //gauge.update();
    $('body').hide();

    window.addEventListener('message', function(event) {
        var data = event.data;
        switch (data.type) {
            case "hide":
                $('body').hide();
                break;
            case "show":
                let currentCarRPM = data.currentCarRPM;
                currentCarAcceleration = data.CurrentCarAcceleration;
                let calcRpm = (currentCarRPM * 9);
                if (calcRpm >= 9) {
                    isOverLoad = true;
                    if (overLoadRPM) {
                        calcRpm = 9;
                        s_Rpm = 9;
                        overLoadRPM = false;
                    } else {
                        var tempRandom = Math.random();
                        calcRpm = 8 + tempRandom;
                        s_Rpm = 8 + tempRandom;
                        overLoadRPM = true;
                    }
                } else {
                    isOverLoad = false;
                }
                // Vehicle RPM display
                $("#rpm").attr("data-value", calcRpm.toFixed(2));
                $(".speed").html(data.currentSpeedTranslated);
                $(".unit").html(data.speedUnits);

                if (data.fuelLevel) {
                    let radius = $('.fuel-progress circle.complete').attr('r');
                    let circumference = 2 * Math.PI * radius;
                    let strokeDashOffset = circumference - ((data.fuelLevel * circumference) / 100);
                    $('.fuel-progress circle.complete').css('stroke-dashoffset', strokeDashOffset);
                    $('.fuel-progress .percentage').text(Math.round(data.fuelLevel) + "%");
                }

                if (data.oilLevel) {
                    let radius = $('.oil-progress circle.complete').attr('r');
                    let circumference = 2 * Math.PI * radius;
                    let strokeDashOffset = circumference - ((data.oilLevel * circumference) / 100);
                    $('.oil-progress circle.complete').css('stroke-dashoffset', strokeDashOffset);
                    $('.oil-progress .percentage').text(Math.round(data.oilLevel) + "%");
                }

                $('body').show();
            default:
                break;
        }
    });
});