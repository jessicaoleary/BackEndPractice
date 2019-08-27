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
// Tree.create({
// 	name: "Willow",
// 	image: "https://images.unsplash.com/photo-1563136060-ccd30423de88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 	body: "The Willow in the tree alphabet stands for the female and lunar rhythms of life. She is water-seeking, thriving from preference on the damp margins of lakes and streams or across the low-lying water meadows. Water and the tidal movements of the sea are governed by the pull of the moon. The moon in its monthly rhythms is female, contrasting with the male sun's daily and yearly turnings. In several ways, the Celts held women in higher regard than we do today. On the material level, women were property owners, and whoever controlled the property controlled the marriage. Women of all types and appeared in the Celtic pantheon, the spiritual strength and life-giving qualities given by both female and male recognized equally.  There were many colleges of Druidesses - learned women and teachers - respected especially for their gifts of seer-ship, often expressed through dreams, or night visions."
// });

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
app.post("/trees", function(req, res){
	//create tree
	Tree.create(req.body.tree, function(err, newTree){
		if(err){
			res.render("new");
		} else {
			// redirect to index
			res.redirect("trees");
		}
	});
});

// // SHOW ROUTE
app.get("/trees/:id", function(req, res){
		Tree.findById(req.params.id, function(err, foundTree){
			if(err){
				res.redirect("/trees");
			} else {
				res.render("show", {tree: foundTree});
			}
		});
	});

// EDIT ROUTE
app.get("/trees/:id/edit", function(req, res){
	Tree.findById(req.params.id, function(err, foundTree){
		if(err){
			res.redirect("blogs");
			console.log("Error with edit");
		} else {
			res.render("edit", {tree: foundTree});
		}
	})
})

// UPDATE ROUTE
app.put("/trees/:id", function(req, res){
	req.body.tree.body = req.sanitize(req.body.tree.body)
	Tree.findByIdAndUpdate(req.params.id, req.body.tree, function(err, updatedTree){
		if(err){
			res.redirect("trees/");
		} else {
			res.redirect("/trees/" + req.params.id);
		}
	});
});

// DESTROY ROUTE
app.delete("/trees/:id", function(req, res){
	Tree.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/trees");
		} else {
			res.redirect("/trees");
		}
	});
});

app.listen(3000, function(){
	console.log("TREES SERVER IS RUNNING");
})
