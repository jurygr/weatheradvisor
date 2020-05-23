window.onload = function(){
  getWeatherByCity("Genova");
};

$(function(){
  $("#request").submit(function(){
        getWeatherByCity( $("#city").val() );
        return false;
  });

  $("state-icon").attr("onerror", "$(this).hide");
});

function getWeatherByCity(request){
  var key = "b310f6270445159372008a5d13e7e7a0";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + key + "&units=metric&lang=it&q=";

    $.ajax({
      dataType: "json",
      url: apiUrl + request,
      data:"",
      success: function(){console.log("weather-advisor@> Request Completed") },
      statusCode: {
         400: function(){
            swal({
              title: "No..",
              text: "Prova a inserire un'altra città!",
              icon: "error"
            });
           },
          404: function(){
            swal({
              title: "Sei sicuro?",
              text:"Non conosco quella città, sicuro di averla scritta giusta?",
              icon: "warning"
            });
          }
      }
    });

    $.getJSON(apiUrl+request, function(data){
        assign(data);
    });
}

function assign(data){
  $("#city-name").html(data.name);
  $("#country").html(data.sys.country);
  var day = new Date();
  var month = new Array();
month[0] = "Gennaio";
month[1] = "Febbraio";
month[2] = "Marzo";
month[3] = "Aprile";
month[4] = "Maggio";
month[5] = "Giugno";
month[6] = "Luglio";
month[7] = "Agosto";
month[8] = "Settembre";
month[9] = "Ottobre";
month[10] = "Novembre";
month[11] = "Dicembre";

  $("#day").html(day.getDate()+  month[day.getMonth()] + day.getFullYear() );

  $("#state-icon").attr("src", "icon/" + data.weather[0].icon + ".png");
  $("#state-icon").attr("title", data.weather[0].main);

  $("#state").html(data.weather[0].description);
  $("#temp").html(data.main.temp + "°c");

  $("#temp-max").html(data.main.temp_max + "°c");
  $("#temp-min").html(data.main.temp_min + "°c");
  $("#pressure").html(data.main.pressure + "hpa");
  $("#humidity").html(data.main.humidity + "%");
  $("#visibility").html(data.visibility);

  $("#speed").html(data.wind.speed + "m/s");
  $("#deg").html(data.wind.deg + "°");

  var sunrise = new Date(data.sys.sunrise * 1000);
  var sunset = new Date(data.sys.sunset * 1000);

  $("#sunrise").html( sunrise.getHours() + ":" + sunrise.getMinutes() + ":" + sunrise.getSeconds() );
  $("#sunset").html(sunset.getHours() + ":" + sunset.getMinutes() + ":" + sunset.getSeconds() );

}
