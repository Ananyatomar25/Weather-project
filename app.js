const express = require("express");

//NATIVE NODE MODULE - HTTPS

const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));


//response our server will serve to the client
app.get("/", function(req, res) {
 res.sendFile(__dirname + "/index.html");
 });

 app.post("/", function(req,res){
   const query = req.body.cityName;
   const appId = "fe0dc029fa50bae8d0dd1f74ca984724";
   const unit = "metric";
   //response our server will get from another server  (data of API)
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appId+"&units="+unit;
   https.get(url, function(response) {
       console.log(response.status);

     //FETCHING LIVE DATA

     response.on("data", function(data) {
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const weatherDes = weatherData.weather[0].description;
       const weatherIcon = weatherData.weather[0].icon;
       const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

       res.write("<p>The weather is currently " + weatherDes + "</p>");
       res.write("<h1>The temperature in " +query+ " is " + temp + " degree Celsius</h1>");
       res.write("<img src=" + imageUrl + ">");
       res.send();
     });
   });

 });




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
