let db = require('../models');
let User = db.User;
let passport = require('passport')
let postRegUrl = process.env.POST_LOGIN_URI || "http://localhost:3000"

//all
function index(req,res) {
  User.find({}, function(err, allUsers){
    if (err) return res.status(500).json({error:err.message});
    res.json(allUsers);
  });
};

//show/detailn
function detail(req, res) {
  db.User
    .findById(req.params.id)
    .populate('hometown')
    .exec(function(err, user) {
      if (err) return res.status(500).json({error:err.message});
      res.json(user);
    }
  );
};

//destroy
function destroy(req, res) {
	User.findOneAndRemove({ _id: req.params.id }, function(err, foundUser) {
		if (err) return res.status(500).json({error:err.message});
		res.json('deleted user', foundUser);
	})
};

//add/register
// TODO: add image and hometown to registration form. check hometown against existing cities.
//if exists include in user record. otherwise create it as a new city and then include new city in user record

function add(req, res) {
  console.log(`${req.body.username} ${req.body.password}`);
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, newUser) {
      if (err) return res.status(500).json({error:err.message});
      passport.authenticate('local')(req, res, function() {
        console.log('user added')
        res.json({userId:newUser['_id']})
      });
    }
  );
};

function update(req,res){
  res.status(500).json({error:'User Update Not Implemented'})
}

//login
function login(req,res){
  passport.authenticate('local')
  res.send(req.user);
}

//logout
function logout(req, res) {
  console.log('BEFORE logout', req);
  req.logout();
  res.send(req);
  console.log('AFTER logout', req);
}

module.exports = {
  index:index,
  detail:detail,
  destroy:destroy,
  add:add,
  update:update,
  login:login,
  logout:logout
};
