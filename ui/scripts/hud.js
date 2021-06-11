let overLoadRPM = false;
let isOverLoad = false;
let s_Rpm = 0.0;
let o_rpm;
let currentCarAcceleration;
let degradingFailureThreshold = 677.0;
let cascadingFailureThreshold = 310.0;

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
                    if (Math.round(data.fuelLevel) < 10) {
                        $('svg.fuel-progress circle').css('stroke', '#c61b26');
                        $('.fuel img').attr('src', 'icons/030-gas-fuel_red.png');
                    } else {
                        $('svg.fuel-progress circle').css('stroke', '#ffffff');
                        $('.fuel img').attr('src', 'icons/030-gas-fuel_white.png');
                    }
                    //$('.fuel-progress .percentage').text(Math.round(data.fuelLevel) + "%");
                }

                if (data.oilLevel) {
                    let radius = $('.oil-progress circle.complete').attr('r');
                    let circumference = 2 * Math.PI * radius;
                    let strokeDashOffset = circumference - ((data.oilLevel * circumference) / 100);
                    $('.oil-progress circle.complete').css('stroke-dashoffset', strokeDashOffset);
                    if (Math.round(data.oilLevel) < 10) {
                        $('svg.oil-progress circle').css('stroke', '#c61b26');
                        $('.oil img').attr('src', 'icons/035-car-oil_red.png');
                    } else {
                        $('svg.oil-progress circle').css('stroke', '#ffffff');
                        $('.oil img').attr('src', 'icons/035-car-oil_white.png');
                    }
                    //$('.oil-progress .percentage').text(Math.round(data.oilLevel) + "%");
                }

                if (data.engineHealth && data.engineHealth <= cascadingFailureThreshold) {
                    $('.engine').removeClass('orange');
                    $('.engine').addClass('red');
                } else if (data.engineHealth && data.engineHealth <= degradingFailureThreshold) {
                    $('.engine').removeClass('red');
                    $('.engine').addClass('orange');
                } else {
                    $('.engine').removeClass('red');
                    $('.engine').removeClass('orange');
                }

                if (data.tankHealth && data.tankHealth <= cascadingFailureThreshold) {
                    $('.tank').removeClass('orange');
                    $('.tank').addClass('red');
                } else if (data.tankHealth && data.tankHealth <= degradingFailureThreshold) {
                    $('.tank').removeClass('red');
                    $('.tank').addClass('orange');
                } else {
                    $('.tank').removeClass('red');
                    $('.tank').removeClass('orange');
                }

                $('body').show();
                break;
            case "beltTrigger":
                if (data.beltOn)
                    $('.belt').hide();
                else
                    $('.belt').show();
                break;
            default:
                break;
        }
    });
});