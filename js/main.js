/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [36.23, -104.82],
  zoom: 3,
  zoomControl: false
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var pres_birth_data = "https://raw.githubusercontent.com/primetime5502/presproject_mt/master/pres_birth.geojson";
var pres_ugrad_data = "https://raw.githubusercontent.com/primetime5502/presproject_mt/master/pres_ugrad.geojson";

var pres_birth_parsed;
var pres_ugrad_parsed;
var slidervalue=0;

var birthCallback = $.ajax(pres_birth_data).done(function(data) {
    pres_birth_parsed = JSON.parse(data);
});
var ugradCallback = $.ajax(pres_ugrad_data).done(function(data) {
    pres_ugrad_parsed = JSON.parse(data);
});

var homeIcon = L.icon({
    iconUrl: 'C:/Users/Deonp/Desktop/Midterm1/images/house.png'});
var schoolIcon = L.icon({
    iconUrl: 'C:/Users/Deonp/Desktop/Midterm1/images/university.png'});
var whitehouseIcon = L.icon({
    iconUrl: 'C:/Users/Deonp/Desktop/Midterm1/images/whitehouse.png'});

var colleges = [];

    //map subsetted values
    var layerGroup = L.layerGroup().addTo(map);
    var mapMarkers = function() {
      var zoom = 5;
    L.marker([birth_matches[0].geometry.coordinates[1],birth_matches[0].geometry.coordinates[0]],{icon: homeIcon})
    .addTo(layerGroup)
    .bindPopup(birth_matches[0].properties.birthplace);

    map.setView([birth_matches[0].geometry.coordinates[1],birth_matches[0].geometry.coordinates[0]], zoom);

    for(i=0; i<ugrad_matches.length; i++){
    L.marker([ugrad_matches[i].geometry.coordinates[1],ugrad_matches[i].geometry.coordinates[0]],{icon: schoolIcon})
    .addTo(layerGroup)
    .bindPopup(ugrad_matches[i].properties.ugrad);
    }

    L.marker([38.8976805,-77.0452845],{icon: whitehouseIcon})
    .addTo(layerGroup)
    .bindPopup("The White House");
    };


//for subsetting later
var ugrad_matches;
var birth_matches;

$(document).ready(function() {
  //slider as primary operator
  $('#slider').slider({

    //on slider change, generate html text, etc.
      change: function(event, ui) {
          slidervalue = ui.value;
      $('#pres_name').empty();
      $('#born').empty();
      $('#degree').empty();
      var oldImgSrc = "";
      var newSrc = pres_birth_parsed.features[slidervalue-1].properties.pres_image_link;

      $('#image_link').attr('src', oldImgSrc);

      var birthdate = pres_birth_parsed.features[slidervalue-1].properties.birthdate;
      var birthplace = pres_birth_parsed.features[slidervalue-1].properties.birthplace;

      ugrad_matches =  _.filter(pres_ugrad_parsed.features, function (data) {
            return  data.properties.pres_num==slidervalue;}
          );
      birth_matches =  _.filter(pres_birth_parsed.features, function (data) {
            return  data.properties.pres_num==slidervalue;}
          );

      //wanted to use case statement but it's only evaluated once
      if (ugrad_matches.length == 0) {
      $("#born").text('This President was born in ' + birthplace + " on " + birthdate + ".");
      $("#degree").text('Some Presidents did not earn an undergraduate degree for various reasons (like war or family hardship), but may have attended classes at various universities. This President did not earn an undergraduate degree.');
      }
      if (ugrad_matches.length == 1) {
      $("#born").text('This President was born in ' + birthplace + " on " + birthdate + ", and received an undergraduate degree from " + ugrad_matches[0].properties.ugrad + " in " + ugrad_matches[0].properties.ugrad_location + ".");
      }
      if (ugrad_matches.length == 2) {
      $("#born").text('This President was born in ' + birthplace + " on " + birthdate + ", and received an undergraduate degree from " + ugrad_matches[0].properties.ugrad + " in " + ugrad_matches[0].properties.ugrad_location + ".");
      $("#degree").text('Prior to receiving a degree, this President also attended ' + ugrad_matches[1].properties.ugrad + " in " + ugrad_matches[1].properties.ugrad_location + " before receiving his degree.");
      }
      if (ugrad_matches.length == 3) {
      $("#born").text('This President was born in ' + birthplace + " on " + birthdate + ", and received an undergraduate degree from " + ugrad_matches[0].properties.ugrad + " in " + ugrad_matches[0].properties.ugrad_location + ".");
      $("#degree").text('Prior to receiving a degree, this President also attended ' + ugrad_matches[1].properties.ugrad + " in " + ugrad_matches[1].properties.ugrad_location + " and "+ ugrad_matches[2].properties.ugrad +" in "+ ugrad_matches[2].properties.ugrad_location +" before receiving his degree.");
      }
      if (ugrad_matches.length == 4) {
      $("#born").text('This President was born in ' + birthplace + " on " + birthdate + ", and received an undergraduate degree from " + ugrad_matches[0].properties.ugrad + " in " + ugrad_matches[0].properties.ugrad_location + ".");
      $("#degree").text('This President also attended ' + ugrad_matches[1].properties.ugrad + " in " + ugrad_matches[1].properties.ugrad_location + ", "+ ugrad_matches[2].properties.ugrad +" in "+ ugrad_matches[2].properties.ugrad_location + " and "+ ugrad_matches[3].properties.ugrad +" in "+ ugrad_matches[3].properties.ugrad_location + " in the course of his studies.");
      }

      layerGroup.clearLayers();
      mapMarkers();

    }
  });

//show answer
  $("button").click(function() {
    var oldImgSrc = "";
    var newSrc = pres_birth_parsed.features[slidervalue-1].properties.pres_image_link;
    var pres_name = pres_birth_parsed.features[slidervalue-1].properties.pres_name;
      $('#pres_name').text(pres_name);
      $('#image_link').attr('src', newSrc);
    });

//add map markers and lines
});
