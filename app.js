const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
var countries = require("./countries");

app.use(express.urlencoded());
app.use(express.json());

// 1] /countries/country-code : This api will be GET request and accept the country code as query
// parameter. Response should be the data of the country whose code has been passed as
// parameter.
app.get("/countries/:countries_code", async(req,res)=>{
    try{
        const code = req.params.countries_code.toLowerCase();
        const country = await countries.find(element => element.code.toLowerCase() == code);
        if(country){
            return res.status(200).send({msg: "success", data : country});
        }
        return res.status(404).send({msg: "No Data Found", data: []});
    }catch(e){
        console.log(e);
    }
})

// 2] /add/country : This api will be a GET request which will accept the country name, country
//code, country id and that data should get added (appended) to existing countries.json file.
app.get("/add/country/:country/:country_code/:country_id", async(req,res)=>{
    try{
        countries.push(req.params);
        if(countries){
            return res.status(200).send({msg: "success", countries});
        }
        return res.status(404).send({msg: "No Data Found", data: []});
    }catch(e){
        console.log(e);
    }
})

// JSON WEB TOKEN API's
// 1] /generateToken : This api should generate a token
app.post("/generateToken", async(req,res)=>{
    try{
        const data = {id: 101};
        const token = jwt.sign({data}, "my-secret-key-is-complete-the-assignment");
        if(token){
            return res.status(200).send({msg: "success", token});
        }
        return res.status(404).send({msg: "No Data Found", token: []});
    }catch(e){
    console.log(e)
    }
})


// 2]  /verifyToken: This api should verify the generated token
app.post("/verifyToken", async(req, res)=>{
    try{
        const token = req.body.token;
        const result = jwt.verify(token, "my-secret-key-is-complete-the-assignment");
        if(result){
            return res.status(200).send({msg: "success", valid: true});
        }
        return res.status(401).send({msg: "Invalid token", valid: false});
    }catch(e){
        console.log(e);
    }
})

app.listen(3000, ()=>{
    console.log("port is 3000");
})