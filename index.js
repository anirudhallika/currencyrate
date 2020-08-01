const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.listen(3000, function(req,res) {
  console.log("Server started on port 3000");
});
app.get("/",function(req,res){
  res.render("home");
})
app.post("/",function(req,res){
  let sourcecurrency=req.body.sourcecurrency;
  console.log(sourcecurrency);
  let targetcurrency = req.body.targetcurrency;
  console.log(targetcurrency);
//  const url="https://api.exchangeratesapi.io/latest?base="+sourcecurrency+"";
const url="https://open.exchangerate-api.com/v6/latest";
  console.log(url);
  https.get(url,function(response){
    response.on("data",function(data){
      if(response.statusCode===200)
      {
      const bc= JSON.parse(data);
      console.log(bc.rates.USD);
      console.log(targetcurrency);
      const cd = (bc.rates);
      console.log(cd[targetcurrency]);
      res.write("<body style=background-color:Yellow>")
      res.end("<h1 style=text-align:center>The currency value of "+targetcurrency+" is " +cd[targetcurrency]+"</h1>");
    }
    else{
      console.log("error");
    }
    })
  })
})

// api key a17c3268bfd3da1b0a69453118da4ec2
