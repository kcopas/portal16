'use strict';
var angular = require('angular');

//var test = {
//    "name": "Roads",
//    "url": "https://{s}.tiles.mapbox.com/v4/gbif.dec5e9ae/{z}/{x}/{y}.png?access_token=" + accessToken,
//        options: {
//        attribution: "&copy; <a href='https://www.mapbox.com/'>Mapbox</a> <a href='http://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap contributors</a>"
//    },
//    type: 'xyz',
//        layerOptions: {
//        "showOnSelector": false
//    }
//};

var accessToken = 'pk.eyJ1IjoiZ2JpZiIsImEiOiJjaWxhZ2oxNWQwMDBxd3FtMjhzNjRuM2lhIn0.g1IE8EfqwzKTkJ4ptv3zNQ';
var baseLayers = {
    defaultOption: 'classic',
    options: {
        'classic': {
            "name": "Classic",
            "url": "https://{s}.tiles.mapbox.com/v4/gbif.faa58830/{z}/{x}/{y}.png?access_token=" + accessToken,
            options: {
                attribution: "&copy; <a href='https://www.mapbox.com/'>Mapbox</a> <a href='http://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap contributors</a>"
            },
            type: 'xyz',
            layerOptions: {
                "showOnSelector": false,
                palette: 'yellows_reds'
            }
        },
        'dark': {
            "name": "Night",
            "url": "https://{s}.tiles.mapbox.com/v4/gbif.dec5e9ae/{z}/{x}/{y}.png?access_token=" + accessToken,
            options: {
                attribution: "&copy; <a href='https://www.mapbox.com/'>Mapbox</a> <a href='http://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap contributors</a>"
            },
            type: 'xyz',
            layerOptions: {
                "showOnSelector": false,
                saturation: true
            }
        },
        //'ocean': {
        //    "name": "Terrain",
        //    "url": "http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{Z}/{Y}/{X}.png",
        //    "attribution": "Esri, DeLorme, FAO, USGS, NOAA, GEBCO, IHO-IOC GEBCO, NGS, NIWA",
        //    "png-render-style": "palette=yellows_reds",
        //    "subdomains": [],
        //    "enabled": false
        //},
        //'satellite': {
        //    "name": "Satellite",
        //    "url": "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{Z}/{Y}/{X}.png",
        //    "attribution": "Esri, DeLorme, FAO, NOAA, DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community",
        //    "png-render-style": "palette=yellows_reds",
        //    "subdomains": [],
        //    "enabled": false
        //},
        //'light': {
        //    "name": "High contrast",
        //    "url": "http://{S}tiles.mapbox.com/v4/gbif.e8bcd045/{Z}/{X}/{Y}.png?access_token=" + accessToken,
        //    "attribution": "<a href='https://www.mapbox.com/'>Mapbox</a> <a href='http://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap contributors</a>",
        //    "png-render-style": "colors=%2C%2C%23CC0000FF",
        //    "subdomains": ['a.', 'b.', 'c.'],
        //    "enabled": false
        //},
        'grey-blue': {
            name: 'Roads',
            url: "http://2.maps.nlp.nokia.com/maptile/2.1/maptile/newest/normal.day.grey/{z}/{x}/{y}/256/png8?app_id=_peU-uCkp-j8ovkzFGNU&app_code=gBoUkAMoxoqIWfxWA5DuMQ",
            options: {
                attribution: '&copy; <a href="https://legal.here.com/en/terms/serviceterms/us/">Nokia</a>'
            },
            type: 'xyz',
            layerOptions: {
                colors: '%2C%2C%23CC0000FF',
                "showOnSelector": false
            }
        }
    }
};


(function () {


    angular
        .module('portal')
        .constant('mapConstants', {
            baseLayers: baseLayers
        });
})();