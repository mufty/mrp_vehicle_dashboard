MRP_CLIENT = null;
let carRPM, carSpeed, carGear, carIL, carAcceleration, carHandbrake, carBrakeABS, carLS_r, carLS_o, carLS_h;

emit('mrp:getSharedObject', obj => MRP_CLIENT = obj);

while (MRP_CLIENT == null) {
    print('Waiting for shared object....');
}

setInterval(() => {
    let cycle = async () => {
        let ped = PlayerPedId();
        if (ped && IsPedInAnyVehicle(ped)) {
            let playerCar = GetVehiclePedIsIn(ped, false);

            //TODO: not sure if show only to driver
            //if (playerCar && GetPedInVehicleSeat(playerCar, -1) == ped){
            if (playerCar) {
                let ccarRPM = GetVehicleCurrentRpm(playerCar);
                let ccarSpeed = GetEntitySpeed(playerCar);
                let ccarGear = GetVehicleCurrentGear(playerCar);
                let ccarIL = GetVehicleIndicatorLights(playerCar);
                let ccarAcceleration = IsControlPressed(0, 71);
                let ccarHandbrake = GetVehicleHandbrake(playerCar);
                let ccarBrakeABS = (GetVehicleWheelSpeed(playerCar, 0) <= 0.0) && (carSpeed > 0.0)
                let [ccarLS_r, ccarLS_o, ccarLS_h] = GetVehicleLightsState(playerCar);

                let update = false;
                if (carRPM != ccarRPM || ccarSpeed != carSpeed || ccarGear != carGear || carIL != ccarIL || ccarAcceleration != carAcceleration ||
                    ccarHandbrake != carHandbrake || ccarBrakeABS != carBrakeABS || ccarLS_r != carLS_r || ccarLS_o != carLS_o || ccarLS_h != carLS_h)
                    update = true;

                if (update) {
                    carRPM = ccarRPM;
                    carSpeed = ccarSpeed;
                    carGear = ccarGear;
                    carIL = ccarIL;
                    carAcceleration = ccarAcceleration;
                    carHandbrake = ccarHandbrake;
                    carBrakeABS = ccarBrakeABS;
                    carLS_r = ccarLS_r;
                    carLS_o = ccarLS_o;
                    carLS_h = ccarLS_h;

                    let currentSpeedTranslated = Math.ceil(carSpeed * 3.6);

                    let speedUnits = GetConvar("mrp:vehicle:speedUnits", "kmh");
                    if (speedUnits == "mph")
                        currentSpeedTranslated = Math.ceil(carSpeed * 2.236936);

                    SendNuiMessage(JSON.stringify({
                        type: 'show',
                        currentCarRPM: carRPM,
                        currentCarGear: carGear,
                        currentCarSpeed: carSpeed,
                        currentSpeedTranslated: currentSpeedTranslated,
                        currentCarIL: carIL,
                        currentCarAcceleration: carAcceleration,
                        currentCarHandbrake: carHandbrake,
                        currentCarABS: GetVehicleWheelBrakePressure(playerCar, 0) > 0 && !carBrakeABS,
                        currentCarLS_r: carLS_r,
                        currentCarLS_o: carLS_o,
                        currentCarLS_h: carLS_h,
                        playerID: GetPlayerServerId(GetPlayerIndex())
                    }));
                } else {
                    await MRP_CLIENT.sleep(100);
                }
            }
        } else {
            SendNuiMessage(JSON.stringify({
                type: 'hide'
            }));
            await MRP_CLIENT.sleep(100);
        }
    };
    cycle();
}, 50);