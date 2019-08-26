var	expressSanitizer	= require("express-sanitizer"),
methodOverride				= require("method-override"),
bodyParser						= require("body-parser"),
mongoose 							= require("mongoose"),
express								= require("express"),
app										= express();
 
// APP CONFIG
mongoose.connect("mongodb://localhost/sacred_trees_app", { useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var treesSchema = new mongoose.Schema({
    name: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Tree = mongoose.model("Tree", treesSchema);

// Create a new tree every time you run the app
Tree.create({
 	name: "Baobab",
 	image: "https://images.unsplash.com/photo-1564198729838-cb82ee0c733c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
 	body: "Native to India and the African Savannas, the baobab (scientific name: Adansonia digitata) is a national emblem of Madagascar. Due to its massive size, fascinating shape, and long aging (around 3,000 years), people believe the baobab holds the spirits of the dead, and that is why it is sacred in African culture. Throughout history, kings have organized their meetings under this tree, believing that it holds magical properties that could aid them in making wise decisions."
});

// RESTFUL ROUTES
app.get("/", function(req, res){
	res.redirect("/trees")
});

// INDEX ROUTE
app.get("/trees", function(req, res){
	Tree.find({}, function(err, trees){
		if(err){ 
			console.log("ERROR");
		} else { 
			// res.render index with data
			res.render("index", {trees: trees});
		} 
	}) 
});

// NEW ROUTE
app.get("/trees/new", function(req, res){
	res.render("new");
});

// CREATE ROUTE
app.get("/trees", function(req, res){
	//create tree
	Blog.create(req.body.tree, function(err, newTree){
		if(err){
			res.render("new");
		} else {
			// redirect to index
			res.redirect("trees");
		}
	});
});

// SHOW ROUTE
app.get("trees/:id", function(req, res){
		Tree.findById(req.params.id, function(err, foundTree){
			if(err){
				res.render("Tree information could not be found");
			} else {
				res.render("show", {tree: foundTree});
			}
		});
	});

// EDIT ROUTE

// UPDATE ROUTE

// DESTROY ROUTE

app.listen(3000, function(){
	console.log("TREES SERVER IS RUNNING");
})
