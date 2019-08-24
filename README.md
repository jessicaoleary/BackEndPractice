# RESTfulPractice_plants
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
- [ ] Create GoormIDE container "RESTfulPractice", link to this repository
- [ ] Create directory "PlantsApp"
- [ ] Create app.js file
- [ ] Create json file with command "npm init"
- [ ] Install MongoDB
- [ ] Install all dependencies: body-parser, ejs, express, method-override, mongoose
- [ ] Install express sanitizer
- [ ] Open app.js, add the following code:
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
- [ ] Create folders public, public/stylesheets, views, views/partials
- [ ] Create views/partials/header.ejs and views/partials/footer.ejs
- [ ] Open header.ejs, add in biolerplate and Semantic UI, with note to check connection
- [ ] Open footer.ejs, add in biolerplate, with note to check connection
- [ ] Create views/index.ejs
- [ ] Open index.ejs, add the following code:
    - <% include ./partials/header %>
    - <% include ./partials/footer %>
