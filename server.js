const express = require("express");


const app = express();


app.use(express.static('public'));

app.get("/",function(request, response){
    response.sendFile(__dirname  + "/homepage/index.html");

});
app.get("/about",function(request, response){
    response.sendFile(__dirname  + "/AboutUs/about.html");

});
app.get("/contact",function(request, response){
    response.sendFile(__dirname  + "/contactus/contact.html");

});
app.get("/range",function(request, response){
    response.sendFile(__dirname  + "/Our Range/range.html");

});
app.listen(3000,function(){
      console.log("Server started at 3000");
});