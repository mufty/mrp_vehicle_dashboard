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
