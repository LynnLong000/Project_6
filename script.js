/*global $ weatherApiKey navigator position */

$(document).ready(function(){

    var lat = undefined;
    var lon = undefined;   
    var weatherTemp = undefined;
    
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
    }
    
    function getWeather() {
        
        var url = "https://api.openweathermap.org/data/2.5/weather?";
        var data = {lat:lat,lon:lon,appid:weatherApiKey};
        
        $.ajax({
            url: url,
            data:data,
            type:"GET",
            success: function(response){
                
                var nextLine = "<br>";
                var weather = response.weather[0];
                var html = "";
                weatherTemp = (response.main.temp * (9/5)) - 459.67; // change from kevlin to Fahrenheit

                
                html += response.name;
                html += nextLine;
                html += weatherTemp;
                html += nextLine;
                html += weather.main;
                html += nextLine;
                html += "<img src="+"https://openweathermap.org/img/w/"+weather.icon+".png>";
                html += nextLine;
                html += weather.description;                
                

                $(".weather").html(html);
              
            }
        });
    }


    $("#click").on('click',function(){
        
        var url = "https://api.openweathermap.org/data/2.5/weather?";
        var data = {lat:lat,lon:lon,appid:weatherApiKey};
        
        $.ajax({
            url: url,
            data:data,
            type:"GET",
            success: function(response){
                
                var nextLine = "<br>";
                var weather = response.weather[0];
                var html = "";
                weatherTemp = response.main.temp - 273.15; // change from kevlin to Celsius
                
                html += response.name;
                html += nextLine;
                html += weatherTemp;
                html += nextLine;
                html += weather.main;
                html += nextLine;
                html += "<img src="+"https://openweathermap.org/img/w/"+weather.icon+".png>";
                html += nextLine;
                html += weather.description;                
                

                $(".weather").html(html);
              
            }
        });
    });
    

});