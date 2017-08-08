/*global $ weatherApiKey navigator position */

$(document).ready(function(){

    var lat = undefined;
    var lon = undefined;    
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(currentLocation,errCallBack,{timeout:10000});
    }
    
    function errCallBack(err){
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
    }
    
    function currentLocation(position){
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        getWeather();
        //console.log("Latitude : " + lat + " Longitude: " + lon);        
    }
    
    function getWeather() {
        
        var url = "https://api.openweathermap.org/data/2.5/weather?";
        var data = {lat:lat,lon:lon,appid:weatherApiKey};
        
        //console.log("Latitude : " + lat + " Longitude: " + lon +" appiID: "+ weatherApiKey); 
        $.ajax({
            url: url,
            data:data,
            type:"GET",
            success: function(response){
                console.log(response); 
            }
        });
    }
});