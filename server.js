//import dependencies

var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  db = require('./models'),
  controllers = require('./controllers'),
  localStrategy = require('passport-local').Strategy;

//create instances
var app = express(),
  router = express.Router();

var User = db.User;

//Prevent CORS errors
app.use(function(req, res, next) {
  console.log('CORS IS RUNNING');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//config API to use bodyParser and look for JSON in req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(cors());

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

app.use(function(req, res, next) {
  //passport config
  passport.use(new localStrategy(db.User.authenticate()));
  passport.serializeUser(db.User.serializeUser());
  passport.deserializeUser(db.User.deserializeUser());
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//set route path and init API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!' });
});

/////////////
/// CITY ////
////////////

//get all cities
router.get('/cities', function(req, res) {
  db.City.find({}, function(err, cities) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(cities);
  });
});

//get one city
router.get('/cities/:id', function(req, res) {
  db.City.findById(req.params.id, function(err, city) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(city);
  });
});

//create city
router.post('/cities', function(req, res) {
  console.log('city create', req.body);

  var newCity = {
    name: req.body.name,
    imageURL: req.body.image,
    description: req.body.description
  };

  db.City.create(newCity, function(err, newCity) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(newCity);
  });
});

//edit city
router.put('/cities/:id', function(req, res) {
  db.City.findById(req.params.id, function(err, foundCity) {
    if (err) return res.status(500).json(err);
    console.log(req.body.name);
    foundCity.name = req.body.name;
    foundCity.image = req.body.image;
    foundCity.description = req.body.description;
    foundCity.save(function(err, savedCity) {
      if (err) {
        console.log('did not save user changes');
      }
      res.json(savedCity);
    });
  });
});

//city posts
router.get('/cities/posts/:id', function(req, res) {
  db.City.findById(req.params.id, function(err, city) {
    if (err) {
      res.status(500).send(err);
    }
    return db.Post.find({ city: city }, function(err, posts) {
      if (err) {
        res.status(500).send(err);
      }
      return res.json(posts);
    });
  });
});

//delete city
router.delete('/cities/:id', function(req, res) {
  db.City.findOneAndRemove({ _id: req.params.id }, function(err, foundCity) {
    if (err) {
      console.log('did not delete ' + req.params.name);
    }
    console.log('the city that deleted is ' + foundCity);
    res.json(foundCity);
  });
});

/////////////
/// USERS ////
////////////

//get all users
router.get('/users', function(req, res) {
  db.User.find({}, function(err, users) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(users);
  });
});

//get one user
router.get('/users/:id', function(req, res) {
  db.User
    .findById(req.params.id)
    .populate('hometown')
    .exec(function(err, user) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(user);
    });
});

//create user
router.post('/users', function(req, res) {
  console.log('user create', req.body);

  var newUser = {
    username: req.body.username,
    password: req.body.password,
    hometown: req.body.hometown,
    image: req.body.image
  };

  db.User.create(newUser, function(err, newUser) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(newUser);
  });
});

//edit user
router.put('/users/:id', function(req, res) {
  db.User.findById(req.params.id, function(err, foundUser) {
    if (err) return res.status(500).json(err);
    console.log(req.body.name);
    foundUser.username = req.body.username;
    foundUser.password = req.body.password;
    foundUser.hometown = req.body.hometown;
    foundUser.image = req.body.image;
    foundUser.save(function(err, savedUser) {
      if (err) {
        console.log('did not save user changes');
      }
      res.json(savedUser);
    });
  });
});

//delete user
router.delete('/users/:id', function(req, res) {
  db.User.findOneAndRemove({ _id: req.params.id }, function(err, foundUser) {
    if (err) {
      console.log('did not delete ' + req.params.username);
    }
    console.log('the user that deleted is ' + foundUser);
    res.json(foundUser);
  });
});

/////////////
/// POSTS ////
////////////

//get all posts
router.get('/posts', function(req, res) {
  db.Post.find({}, function(err, posts) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(posts);
  });
});

//get one post
router.get('/posts/:id', function(req, res) {
  db.Post
    .findById(req.params.id)
    .populate('_user _city')
    .exec(function(err, post) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(post);
    });
});

//create post
router.post('/posts', function(req, res) {
  console.log('post create', req.body);

  var bodyPost = {
    _user: req.body._user,
    _city: req.body._city,
    title: req.body.title,
    text: req.body.text
  };

  db.Post.create(bodyPost, function(err, newPost) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(newPost);
  });
});

//edit post
router.put('/posts/:id', function(req, res) {
  db.Post.findById(req.params.id, function(err, foundPost) {
    if (err) return res.status(500).json(err);
    console.log(req.body.name);
    foundPost.title = req.body.title;
    foundPost.text = req.body.text;
    foundPost.save(function(err, savedPost) {
      if (err) {
        console.log('did not save post changes');
      }
      res.json(savedPost);
    });
  });
});

//delete post
router.delete('/posts/:id', function(req, res) {
  db.Post.findOneAndRemove(req.params.id, function(err, foundPost) {
    console.log('the post that deleted is ' + foundPost);
    res.json(foundPost);
  });
});

//auth routes
app.get('/api/users', controllers.user.index);
app.delete('/api/users/:user_id', controllers.user.destroy);
app.post('/signup', function signup(req, res) {
  console.log(`${req.body.username} ${req.body.password}`);
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.send(newUser);
      });
    }
  );
});

app.post('/login', passport.authenticate('local'), function(req, res) {
  console.log(JSON.stringify(req.user));
  res.send(req.user);
});
app.get('/logout', function(req, res) {
  console.log('BEFORE logout', req);
  req.logout();
  res.send(req);
  console.log('AFTER logout', req);
});

/////////////////////////////////////////////////////////
/*router
  .route('/cities/:id/posts')
  .get(function(req, res) {
    db.Post.find({ cityId: req.body.cityId }, function(err, posts) {
      if (err) res.status(500).json({ error: err.message });
      res.json(posts);
    });
  });


router
  .route('/posts')
  .post(function(req, res) {
    var post = new Post();
    post.save(function(err) {
      if (err) res.status(500).json({ error: err.message });
      res.json({ message: 'Post successfully added!' });
    });
  });

router
  .route('/posts/:postId')
  .get(function(req, res) {
<<<<<<< HEAD
    //looks at our Post Schema
    Post.findById(req.params.postId,function(err, post) {
      if (err) res.status(500).json({error:err.message});
      //                                      responds with a json object of our database posts.
      res.json(post);
=======
    Post.findById(req.params.postId, function(err, posts) {
      if (err) res.status(500).json({ error: err.message });
      res.json(posts);
>>>>>>> 61dc4a9b6bd835761f58c9c5cb4935438dc8f964
    });
  })
  .put(function(req, res) {
    Post.findById(req.params.postId, function(err, post) {
      if (err) res.status(500).json({ error: err.message });
      post.title = req.body.title;
      post.text = req.body.text;
      post.cityId = req.body.cityId;
<<<<<<< HEAD
      //save leieeieieieieieieipost
      post.save(function(err) {
        if (err) res.status(500).json({error:err.message});
        res.json({ message: "Post has been updated" });
      });
    })
  })
  //delete method for removing a post from our database
=======

      post.save(function(err) {
        if (err) res.status(500).json({ error: err.message });
        res.json({ message: 'post has been updated' });
      });
    });
  })
>>>>>>> 61dc4a9b6bd835761f58c9c5cb4935438dc8f964
  .delete(function(req, res) {
    Post.remove({ _id: req.params.postId }, function(err, post) {
      if (err) res.status(500).json({ error: err.message });
      res.json({ message: 'Post has been deleted' });
    });
  });
*/

//use router config when we call /API
app.use('/api', router);

//start server
var port = process.env.API_PORT || 3001;
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
