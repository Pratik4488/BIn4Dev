const router= require("express").Router();
const User = require('../models/user');
const Document = require("../models/document")
const bcrypt = require('bcrypt');
const EncryDocument = require('../models/encrypted')
const fetch = require('node-fetch')

//Register
router.post('/register', async (req, res) =>{
   
    try{
        // GENRATE NEW PASSWORD
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password, salt);


        // CREATE NEW USER
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        // SAVE USER AND RETURN RESPOSNE...
        const user = await newUser.save();
        res.status.redirect("/login",);
    }catch(error){

        res.status(500).redirect("/register");
    }
});


//Login
router.post("/login", async (req, res) =>{
    try{
        res.clearCookie("currentUser");
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("user not found!!!!!!")

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(404).json("wrong Password!!!!")
        res.cookie("currentUser", user._id)

        res.status(200).redirect("/");

    }
    catch(error){
            res.status(500).json(error);
    }
})
router.get("/logout",async(req, res)=>{
    try {
        res.clearCookie("currentUser");
        res.redirect("/login");
    } catch (error) {
        
    }
})
router.get("/dashboard",async(req, res)=>{
    const userId = req.cookies.currentUser;
    const d = new Date();
    try {
        const user = await User.findById(userId)
        const docs = await Document.find();

        const documents = [];
        for(const Element in docs){
            if( d.getTime()- Element.date>=86400000){
                documents.push(Element);
            }else{
                 await Document.findByIdAndDelete(Element._id);
            }
        }
        
        res.status(200).render("dashboard",{docs, user})
    } catch (error) {
        console.log(error)
    }
})
router.get("/getuser", (req, res)=>{
    res.send(req.cookies);
})

//Get a user


router.get("/:id", async (req, res) =>{
    try{
        const user = await User.findById(req.params.id)

        // This is how we can filter data to be viwed form mongodb document.
        const {password, updatedAt, createdAt, isAdmin, ...other}= user._doc;
        res.status(200).json(other);

    }catch(error){
        res.status(500).json(error)
    }
})

router.get("/renew/:id", async(req, res)=>{
    const docId = req.params.id;
    const d = new Date();
    try {
        const date={date:d.getTime() };
        const doc = await Document.findByIdAndUpdate(docId,date)
        console.log("date changed...")
        res.status(200).redirect("/users/dashboard/")
    } catch (error) {
        console.log(error)
    }
})
router.get("/encrypt/:id", async(req, res)=>{
    const docId = req.params.id;
    res.status(200).render("DocAuth",{docId})
})
router.get("/getlink/:id", async(req, res)=>{
    const docId = req.params.id;
    fetch(`https://api.shrtco.de/v2/shorten?url=bin4dev.herokuapp.com/${docId}`)
    .then(res=> res.json())
    .then(data => {
        // navigator.clipboard.writeText(data.result.full_short_link);
        console.log(data)
        res.status(200).redirect(`${data.result.full_short_link}`)
    })
})


router.post("/encrypt/:id", async (req, res)=>{
    const docId = req.params.id;
    const key = req.body.key;
    try {
        console.log(key)
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})
router.get("/delete/:id", async(req, res)=>{
    const docId = req.params.id;
    try {
        const doc = await Document.findByIdAndDelete(docId)
        console.log("doc deleted")
        res.status(200).redirect("/users/dashboard/")
    } catch (error) {
        console.log(error)
    }
})

// get a document

router.get("/:id", async (req, res)=>{
    const docId = req.params.id;
    try {
        const document = Document.findById(docId);
        console.log(document)
        res.status(200).json(document)
        
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports= router;