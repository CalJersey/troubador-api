//import dependencies

let express = require('express'),
  mongoose = require('mongoose'),
  db = require('./models'),
  controllers = require('./controllers'),
  bodyParser = require('body-parser'),
  User = db.User,
  City = db.City,
  Post = db.Post,
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  userController = controllers.users,
  app = express(),
  router = express.Router()

  //config API to use bodyParser and look for JSON in req.body
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //middleware for auth
  app.use(cookieParser());
  app.use(
    session({
      secret: 'spinachsecret007', // change this!
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  //passport config
  passport.use(new localStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());


//Prevent CORS errors
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  //Remove caching
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//use router config when we call /API
app.use('/api', router);

//set route path and init API
router.get("/", function(req, res) {
  res.json({ message: "API Initialized!" });
});

/////////////
/// CITY ////
////////////

//get all cities
router.get('/cities', function(req, res) {
  City.find({}, function(err, cities) {
    if (err) return res.status(500).json({error:err.message});
    res.json(cities);
  });
});

//get one city
router.get('/cities/:id', function(req, res) {
  City.findById(req.params.id, function(err, city) {
    if (err) return res.status(500).json({error:err.message});
    res.json(city);
  });
});

//create city
router.post('/cities', function(req, res) {
  var newCity = {
    name: req.body.name,
    imageURL: req.body.imageURL,
    description: req.body.description
  };

  City.create(newCity, function(err, addedCity) {
    if (err) return res.status(500).json({error:err.message});
    res.json(addedCity);
  });
});

//edit city
router.put('/cities/:id', function(req, res) {
  City.findById(req.params.id, function(err, foundCity) {
    if (err) return res.status(500).json({error:err.message});
    console.log(req.body.name);
    foundCity.name = req.body.name;
    foundCity.image = req.body.image;
    foundCity.description = req.body.description;
    foundCity.save(function(err, savedCity) {
      if (err) {
        console.log('did not save city changes');
        return res.status(500).json({error:err.message});
      }
      res.json(savedCity);
    });
  });
});


//delete city
router.delete('/cities/:id', function(req, res) {
  City.findOneAndRemove({ _id: req.params.id }, function(err, foundCity) {
    if (err) return res.status(500).json({error:err.message});
    console.log('the city that deleted is ' + foundCity);
    res.json(foundCity);
  });
});

/////////////
/// USERS ////
////////////

//auth routes

//register new user
router.post('/signup', userController.add);
//login user
router.post('/login', userController.login);
//logout user
router.get('/logout',userController.logout);
//get all users
router.get('/users', userController.index);

router
  .route('/users/:id')
  //get one user
  .get(userController.detail)
  //delete user
  .delete(userController.destroy)
  //update user
  .put(userController.update);

/////////////
/// POSTS ////
////////////

//get all posts
router.get('/posts', function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) return res.status(500).json({error:err.message});
    res.json(posts);
  });
});

//get one post
router.get('/posts/:id', function(req, res) {
  Post
    .findById(req.params.id)
    .populate("_user _city")
    .exec(function(err, post) {
      if (err) return res.status(500).json({error:err.message});
      res.json(post);
    });
});

//city posts
router.get('/posts/cities/:id', function(req, res) {
  Post.find({ _city: req.param.city_id }, function(err, succ) {
    if (err) {
      console.log('did not find for  ' + req.params._city);
      return res.status(500).json({error:err.message});
    }
    res.json({ posts: succ });
  });
});

//create post
router.post('/posts', function(req, res) {
  let bodyPost = {
    title: req.body.title,
    text: req.body.text
  };
  postCity = City.findById(req.body.cityId)
  Post.create(bodyPost, function(err, newPost) {
    newPost.city = postCity
    newPost.save()
    if (err) return res.status(500).json({error:err.message});
    res.json(newPost);
  });
});

//edit post
router.put('/posts/:id', function(req, res) {
  Post.findById(req.params.id, function(err, foundPost) {
    if (err) return res.status(500).json({error:err.message});
    console.log(req.body.name);
    foundPost.title = req.body.title;
    foundPost.text = req.body.text;
    foundPost.save(function(err, savedPost) {
      if (err) return res.status(500).json({error:err.message});
      res.json(savedPost);
    });
  });
});

//delete post
router.delete('/posts/:id', function(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err, foundPost) {
    if (err) return res.status(500).json({error:err.message});
    console.log('the post that deleted is ' + foundPost);
    res.json(foundPost);
  });
});


//start server
var port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
