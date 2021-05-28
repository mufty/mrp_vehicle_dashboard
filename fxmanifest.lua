fx_version 'cerulean'
game 'gta5'

author 'mufty'
description 'MRP Vehicle dashboard'
version '0.0.1'

ui_page 'ui/index.html'

dependencies {
    "mrp_vehicle"
}

files {
    'ui/icons/030-gas-fuel_red.png',
    'ui/icons/030-gas-fuel_white.png',
    'ui/icons/033-seat-belt_red.png',
    'ui/icons/035-car-oil_red.png',
    'ui/icons/035-car-oil_white.png',
    'ui/font/made-black.otf',
    'ui/scripts/hud.js',
    'ui/lib/gauge.min.js',
    'ui/styles/style.css',
    'ui/index.html',
    'client.js',
}

client_scripts {
    'client.js',
}
