var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://localhost/test');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test';
mongoose.connect(connectionString);




var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data


//user model
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    roles: [String]
});


var UserModel = mongoose.model("UserModel", UserSchema);


//customer model
var CustomerSchema = new mongoose.Schema({
    username: String,
    trip: String,
    depart: Date,
    back: Date,
    nameinchinese: String,
    nameinpinyin: String,
    sex: String,
    dateofbirth: Date,
    passport: String,
    passportdateuntil: Date,
    chineseid: Number,
    email: String,
    phone: String,
    addressinchina: String,
    addressinus: String,
    status: String    
});

var CustomerModel = mongoose.model("CustomerModel", CustomerSchema);


//example
//var admin = new UserModel({username: "alice",password: "alice",firstname: "Alice",lastname: "Wonderland",roles: ["admin"]});
//var student = new UserModel({username: "bob",password: "bob",firstname: "bob",lastname: "Marle",roles: ["student"]});
//admin.save();
//student.save();


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer);

app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(
function (username, password, done)
{
    UserModel.findOne({ username: username, password: password }, function (err, user) {
        if(user)   //if we find user
        {
            return done(null, user);  // return the user
        }
        //else return the error message
        return done(null, false, { message: 'Unable to login' });
    });
}));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});




//check whether this person is authenticated. and protect/rest/user
var auth = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    }
    else {
        next();
    }
};


//------------------------for logout---------------------
app.post("/logout", function (req, res) {
    req.logOut();
    res.send(200);
});


//-------------------------for login------------------
app.post("/login", passport.authenticate('local'), function (req, res) {
   // console.log("login");
   // console.log(req.user);
    res.json(req.user);
});

//------------------------for loggedin----------------------
app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});
//------------------------for rest---------------------
app.get("/rest/customer", auth ,function (req, res) {
    CustomerModel.find(function (err, customers) {
        res.json(customers);
    });
});
//------------------------for registration--------------------
app.post("/register", function (req, res) {
    var newUser = req.body;
    UserModel.findOne({ username: req.body.username }, function (err, user)
    {   
        if (err) { return next(err); }
        if (user) {
            res.json("user already exists");
            return;
        }
        else
        {
            var newUser = new UserModel(req.body);
            newUser.roles = ['student'];
            newUser.save(function (err, user)
            {
                req.login(user, function (err) {
                    if (err) { return next(err); }
                    res.json(user);
                });
            });
        }
    });
    
});


///----------------------for customer------------
app.post("/customer", function (req, res) {
    var customer = new CustomerModel(req.body);
    customer.save(function (err, doc) {
        CustomerModel.find(function (err, customers) {
            res.json(customers);
        })
    })
});

//for delete user
app.delete("/api/customer/:id", function (req, res) {
    var id = req.params.id;
    CustomerModel.remove({ _id: id }, function (err, count) {
        CustomerModel.find(function (err, customers) {
            res.json(customers);
        });
    });
});


var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.listen(port, ip);