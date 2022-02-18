console.log("Welcome to codeBin")

const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const Document = require('./models/document')
const User = require("./models/user")
const userRoute = require("./routes/users")
const cookieParser = require('cookie-parser')

dotenv.config();

const app = express();
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedtopology: true
});

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected...")
})


app.get("/", (req, res) => {
    if (req.cookies.currentUser != null || req.cookies.currentUser != undefined) {
        const code = `hello, Welcome to codebin
    here we are creating code sharing stuff to have something good for you
    
    ok so lets see what we can do here so that everything works
    perfectly fine...`
        res.render('index', { code, language: "plaintext" })
    }
    else {
        res.redirect("/login")
    }
})

app.get("/register", (req, res) => {
    try {
        res.status(200).render("register");

    } catch (error) {
        res.redirect("/register", { error })
    }
})
app.get("/login", (req, res) => {
    try {
        res.status(200).render("login");

    } catch (error) {
        res.redirect("/register", { error })
    }
})

app.get('/new', (req, res) => {
    if (req.cookies.currentUser != null || req.cookies.currentUser != undefined) {
        res.render("new")
    }
    else {
        res.redirect("/login");
    }
})

app.post("/save", async (req, res) => {
    const value = req.body.value;
    const d = new Date();
    
    try {
            const userId = req.cookies.currentUser;
            const user = await User.findById(userId)
            const newDocument = new Document({
                value: value,
                title: req.body.title,
                date: d.getTime(),
            })
            const document = await newDocument.save();

            await user.updateOne({ $push: { documents: document.id } });
            res.status(200).redirect(`/${document.id}`)


    } catch (error) {
        res.status(500).redirect("/new" + value)
    }
})

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (req.cookies.currentUser != null || req.cookies.currentUser != undefined) {
        function absolute_url(urls) {
            // Regex pattern for checking
            var pattern = /^https:\/\//i;
    
            // Check if pattern is there in the string 
            // or not with .test() method
            if (pattern.test(urls)) {
                return true
            }
            else {
                return false;
            }
        }
        try {
            
            const document = await Document.findById(id);
            const url = document.value.trim();
            if (absolute_url(url)) {
                res.redirect(`${url}`)
            } else {
                res.render('index', { code: document.value, title: document.title })
        }
        } catch (error) {
            res.redirect('/')
        }

    }
    else {
        res.redirect("/login");
    }
})

app.get('/:id/duplicate', async (req, res) => {
    const id = req.params.id;
    if (req.cookies.currentUser != null || req.cookies.currentUser != undefined) {
        try {
            const document = await Document.findById(id);
            res.render('new', { value: document.value })
        } catch (error) {
            res.redirect(`/${id}`)
        }


    }
    else {
        res.redirect("/login");
    }
})



app.use("/users", userRoute);
app.listen(process.env.PORT|| 80, () => {
    console.log(`listening to the point no at ${process.env.PORT}`);
});