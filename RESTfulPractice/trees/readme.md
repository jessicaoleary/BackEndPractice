# RESTfulPractice_trees
A plant database created for the purpose of practicing RESTful routes

This app will use the following:
* node.js
* express
* ejs
* bodyParser
* MongoDB
* mongoose
* Method Override
* Express Sanitizer

## Initial Workspace Set-Up
- [x] Create GoormIDE container "RESTfulPractice", link to this repository
- [x] Create directory "TreesApp"
- [x] Create app.js file
- [x] Create json file with command "npm init"
- [x] Install MongoDB
- [x] Install all dependencies: body-parser, ejs, express, method-override, express-sanitizer, mongoose
- [x] Install express sanitizer
- [x] Open app.js, add the following code:
    - var	bodyParser		    = require("body-parser"),
    - methodOverride		= require("method-override"),
    - expressSanitizer	= require("express-sanitizer"),
    - mongoose 			= require("mongoose"),
    - express				= require("express"),
    - app					= express();
    - // APP CONFIG
    - mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true});
    - mongoose.set('useFindAndModify', false);
    - app.set("view engine", "ejs");
    - app.use(express.static("public"));
    - app.use(bodyParser.urlencoded({extended: true}));
    - app.use(expressSanitizer());
    - app.use(methodOverride("_method"));
    - // MONGOOSE/MODEL CONFIG (see blog documentation)
    - // RESTFUL ROUTES
    - app.get("/", function(req, res){ res.redirect("/trees")});
    - // INDEX ROUTE
    - app.get("/trees", function(req, res){ Tree.find({}, function(err, trees){ if(err){ console.log("ERROR"!) } else { // res.render index with data, res.render("index", {trees: trees}) } }) });
    - 
- [x] Create folders public, public/stylesheets, views, views/partials
- [x] Create views/partials/header.ejs and views/partials/footer.ejs
- [x] Open header.ejs, add in biolerplate, Semantic UI, link to app.css, navbar
- [x] Open footer.ejs, add in biolerplate, with note to check connection
- [x] Create views/index.ejs
- [x] Open index.ejs, add the following code:
    - <% include ./partials/header %>
    - <% include ./partials/footer %>
