const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose");


const app = express();
app.use(bodyparser.json());

app.use(express.static("public"));
app.use( bodyparser.urlencoded({extended:true,}))
mongoose.connect("mongodb://localhost:27017/neww",{useNewUrlParser:true},{useUnifiedTopology:true});
var db = mongoose.connection;
db.on("error",()=>console.log("error in db connection"))
db.once("open",()=>console.log("db connected successfully"))

app.post('/signup',(req,res)=>{
    var name = req.body.name ;
    var email = req.body.email ;
    var phno = req.body.phno ;
    var password = req.body.password ;


    var data={
        "name":name,
        "email":email,
        "phno":phno,
        "password":password,
        
    }

    db.collection("aryan").insertOne(data ,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record added successfully")
    })
    return res.redirect("sign_up_success.html")



})




app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-origin":"*",
    })
    return res.redirect("index.html");
}).listen(3000,()=>{
    console.log("server is running")
})



