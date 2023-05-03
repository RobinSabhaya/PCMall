require('dotenv').config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const pug = require("pug");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const validator = require("validator");
const cookieparser = require('cookie-parser');
const expbs = require('express-handlebars');
const Port = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;
const SECRET_KEY = process.env.SECRET_KEY;

//Express App Specific Stuffs
const app = express();
// app.engine('handlebars',expbs({
//     defaultLayouts : "Web14",
//     Layouts : path.join(__dirname,'/views'),
// }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, "/public/images")));
app.use(express.static(path.join(__dirname, "/public/image")));
hbs.registerPartials(path.join(__dirname, "/partials"));
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded());
app.use(cookieparser())

//Mongoose Specific Stuffs for Register
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Web14Schema = new mongoose.Schema({
    Name:String,
    email:String,
    Pass :String ,
    password:String,
    tokens :[
        {
            token : String,
        }
    ]
});
Web14Schema.methods.jwtoken = async function(){
    try {
       const token  = await jwt.sign({_id : this._id.toString()},SECRET_KEY);
        this.tokens = this.tokens.concat({token : token})
        await this.save();
        return token;
    } catch (error) {
       console.log(error)
    }
}
//For password hashing for..
// Web14Schema.pre('save',async function(req,res,next){
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password,10);
//     }
//    next();
// })
const Web14 = mongoose.model("Web14", Web14Schema);

//Get Specific Stuffs
const auth = async (req,res,next) =>{
    try {
        const cookie = req.cookies.login;
        const cookiedata = await jwt.verify(cookie,SECRET_KEY);
        const userdata = await Web14.findOne({'_id' : cookiedata});
        req.cookie = cookie;
        req.userdata = userdata;
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

app.get('/home',auth,(req,res)=>{
    res.status(200).render('./Web14.hbs');
})

app.get("/login", (req, res) => {
    res.status(200).render("./Login_Page.hbs");
});
app.get("/register", (req, res) => {
    res.status(200).render("./Register_Page.hbs");
});
app.get("/termcondition", (req, res) => {
    res.status(200).render("./Tc_Page.hbs");
});
app.get("/returnpolicy", (req, res) => {
    res.status(200).render("./Return_Page.hbs");
});
app.get("/supportpolicy", (req, res) => {
    res.status(200).render("./Support_Page.hbs");
});
app.get("/privacypolicy", (req, res) => {
    res.status(200).render("./Privacy_Page.hbs");
});
app.get('/allproduct',(req,res)=>{
    res.status(200).render('./Brand_Page.hbs');
})

// Post Request Specific Stuffs
// app.post("/login", async (req, res) => {
//     try{
//       const {Lemail,Lpassword} = req.body;
//       const data = await Web14.findOne({ email:Lemail});
//       const hash = await bcrypt.compare(Lpassword,data.password);
//       console.log("🚀 ~ file: Web14b.js:114 ~ app.post ~ Hashdata:", hash)
//     if (Lemail === data.email) {
//       hash ? res.status(200).render("./Web14.hbs") : res.render('./Error_Page.hbs');
//     } 
//   }
//   catch(err){
//     res.status(400).render('./Error_Page.hbs');
//   }

// });
app.post("/login", async (req, res) => {
    const {Lemail,Lpassword} = req.body;
    const data = await Web14.findOne({email : Lemail,password : Lpassword});
    // const hash = await bcrypt.compare(Lpassword,data.password)
    try {
        if(Lemail === data.email && Lpassword === data.password){
            const token = await data.jwtoken();
            res.cookie('login',token);
            res.status(200).render('./Web14.hbs',{username :data.Name,userpass : data.password});
        }
        else{
            res.status(400).json({'status' : 'Email and password are invalid!!','code' : 400});
        }
        return data;
    } catch (error) {
       res.status(404).send(error);
    }
});
app.get('/profile',(req,res)=>{
    res.status(200).render('./Profile.hbs',{name : 'data.Name'});
});
app.post("/register", async(req, res) => {
   try {
    if (req.body.Pass === req.body.password) {
        const Web14data = new Web14(req.body);
        const token = await Web14data.jwtoken();
        res.cookie('register',token);
        Web14data.save().then(() => {
            res.status(200).json({"status" : "sucess",
            "code" : "200" });
        });
    } else {
        res.status(400).json({"status" : "password and confirm password are not same!!",
        "code" : "400" });
    }
   } catch (error) {
    res.status(400).json({'status' : 'Email is laready exist!!','code' : 400});
   }
});
app.get('/logout',auth,async (req,res)=>{
    try {
        req.userdata.tokens = [];
        res.clearCookie('login');
        res.clearCookie('register');
        await req.userdata.save();
        res.status(200).render('./Login_Page.hbs')
        
    } catch (error) {
        res.status(400).json({'status' : error , 'code' : 400})
    }
})


//Get Request For Error Page Specific Stuffs
app.get("/home/*", (req, res) => {
    res.status(404).render("./Error_Page.hbs");
});
app.get("/login/*", (req, res) => {
    res.status(404).render("./Error_Page.hbs");
});
app.get("/profile/*", (req, res) => {
    res.status(404).render("./Error_Page.hbs");
});
app.get("/register/*", (req, res) => {
    res.status(404).render("./Error_Page.hbs");
});
app.get("logout/*", (req, res) => {
    res.status(404).render("./Error_Page.hbs");
});
app.get("/termcondition/*", (req, res) => {
    res.status(404).render("./Error_Page.hbs");
});
app.get("/returnpolicy/*", (req, res) => {
    res.status(404).render("./Error_Page.hbs");
});
app.get("/supportpolicy/*", (req, res) => {
    res.status(404).render("./Error_Page.hbs");
});
app.get("privacypolicy/*", (req, res) => {
    res.status(404).render("./Error_Page.hbs");
});

app.get("*", (req, res) => {
    res.status(404).render("./Error_Page.hbs");
});

//App Listen Specific Stuffs
app.listen(Port, () => {
    console.log(`Express App Is Now Running... on http://127.0.0.1:${8000}/login`);
});
