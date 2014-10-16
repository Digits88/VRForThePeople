var express = require('express');
var router = express.Router();

function requireLogin(req, res, next) {
    if(req.originalUrl == '/users/login' || req.originalUrl == '/users/register') {
        next();
        return;
    }
    
    if (req.session && req.session.loggedIn) {
        next(); // allow the next route to run
    } else {
        // require the user to log in
        res.redirect("/users/login"); // or render a form, etc.
    }
}

router.all("/*", requireLogin, function(req, res, next) {
    // if the middleware allowed us to get here,
    // just move on to the next route handler
    next();
});

router.get("/upload", function(req, res) {
    // if we got here, the `app.all` call above has already
    // ensured that the user is logged in
    res.send('allowed');
});

router.get('/login', function(req, res) {
//    res.send('please log in');
    res.render('usersLogin.jade', {
        title: 'Mike Newell'
    });
});

router.get('/register', function(req, res) {
    res.render('usersRegister.jade');
});

router.post('/login', function(req, res) {
    console.log(req.body.stuff);
});

router.post('/register', function(req, res) {
    console.log(req.body);
});

module.exports = router;