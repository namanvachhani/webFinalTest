//github link:

//https://github.com/namanvachhani/webFinalTest/

//cyclic link

//https://fine-toad-bell-bottoms.cyclic.app
var express = require("express");
var app = express();
var path = require("path");
const HTTP_PORT = process.env.PORT || 8080;
const bcrypt = require("bcrypt");
const { redirect } = require("express/lib/response");
const exphbs = require("express-handlebars");
const stripJs = require("strip-js");
const clientSessions = require("client-sessions");
const saltRounds = 10; // for encryption

app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("./public/"));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

// Define a custom Handlebars helper function to format dates
const hbs = exphbs.create({
    helpers: {
        formatDate: function (date) {
            return date.toLocaleDateString();
        }
    },
    extname: ".hbs"
});

// Register handlebars as the rendering engine for views
// app.engine(".hbs", hbs.engine);
// app.set("view engine", ".hbs");


app.post("/login", (req, res) => {

    const { mainUserName, mainUserPasswd } = req.body;

    if (mainUserName && mainUserPasswd) {
        const hash = bcrypt.hashSync(mainUserPasswd, saltRounds);
        res.redirect(`/user?mainUserName=${mainUserName}&mainUserPasswd=${hash}`);

    } else {
        res.redirect("/");

    }

});




app.get("/user", (req, res) => {
    const { mainUserName, mainUserPasswd } = req.query;
    res.send(`Welcome ${mainUserName}! Your encrypted mainUserPasswd is: ${mainUserPasswd}`);

});




app.listen(8080, () => {
    console.log("Server listening on port 8080");

});
