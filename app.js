// dependencies config

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
main().catch(err => console.log(err));
// blog posts
 // const posts = []

//dependencies config
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connectto mongodb server
async function main() {
  await mongoose.connect('mongodb://localhost:27017/blogDB')
};

//item schema
const postSchema = new mongoose.Schema({
  default: String
})
//create a model
const post = mongoose.model('Post', postSchema);

//mongoose Document

const homeStartingContent = new post({
  default: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."

})

const aboutContent = new post({
  default: "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
})

const contactContent = new post({
  default: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit./ Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
})


//posts schema
const blogSchema = new mongoose.Schema({
  title: String,
  content:String
})

const blog = mongoose.model('Blog',blogSchema);


// access point to available routes

//root route
app.get('/', (req,res)=>{


  blog.find({}, function(err, posts){
    res.render('home',{HomeContent:homeStartingContent.default, post:posts})
  })




  // res.render('home',{
  //   HomeContent:homeStartingContent.default,
  //   post: ,

  })

// })

//about route
app.get('/about',(req,res)=>{
  res.render('about',{HomeContent:aboutContent.default})
})

//contact route
app.get('/contact', (req,res)=>{
  res.render('contact', {HomeContent:contactContent.default})
})
//compose route (get)
app.get('/compose', (req,res)=>{
  res.render('compose')
})

 //compose route(post)
app.post('/compose',(req,res)=>{
  // inputs passed into the server
const blog_i =  new blog({
  title:req.body.postTitle,
  content: req.body.postBody
})
// posts.push(blog_i)
//save to root route


blog_i.save((err)=>{
  if (!err) {
    res.redirect('/')
  }
})
})




//posts route
app.get('/posts/:postid',(req,res)=>{
  //changing router params to lowerCase
 // var router= _.lowerCase(req.params.postName);
 var router = req.params.postid
//looping through each items in the posts array
blog.findOne({_id:router}, function(err, foundList){
    res.render('post',{
        postHeading:foundList.title,
        postContent:foundList.content
  })
 })
})

//server port
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
