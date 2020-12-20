const express =require("express")
const ejs=require("ejs")
const PORT =3000
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const User=require("./models/Users")

mongoose.connect("mongodb://localhost:27017/usersDB",{useNewUrlParser:true,useUnifiedTopology:true})

const app=express()


app.use(express.static("public"));

app.set('view engine',"ejs")
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
     res.render('index')
});
app.get("/register",(req,res)=>{
     res.render('register')
});
app.get("/login",(req,res)=>{
     res.render('login')
});



////////////////////POST REQUESTS ..HERE WE GO!/////////////
app.post("/login",(req,res)=>{

     const email=req.body.email;
     const password=req.body.password

     User.findOne({email:email},(err,foundResulsts)=>{
     if(err){
          console.log(err)
     }
     else{
          if(foundResults.password==password){
               res.send("You logged in")
          }
          else{
               res.send("Incorrect Email or Pass")
          }
     }

     
});
app.post("/register",(req,res)=>{
     const email=req.body.email;
     const password=req.body.password
     const newUser=newUser({
          email:email,
          password:password

     })
     newUser.save((err)=>
     err? console.log(err):res.send("ACCOUNT CREATED SUCCESS")
     )
});

app.listen(PORT,()=> console.log('Server started on port 3000'))
