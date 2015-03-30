// app/routes.js
module.exports = function(app, passport) {

    // The get request for the main home root which will render the index.ejs template
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // The get request for the user registration page
    app.get('/register', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('register.ejs', { message: req.flash('signupMessage') });
    });

    /* process the signup form when a post is issued from the resgistration page
     * On success redirect to the profile page
     * On failure stay at the registration page and show appropriate failure message
     */
    app.post('/register', passport.authenticate('signup', {
        successRedirect : '/profile',
        failureRedirect : '/register',
        failureFlash : true
    }));

    // The get request for the profile page
    app.get('/profile', checkLoggingStatus, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // The get request for the logout function and send the user back to the homepage
    app.get('/logout', function(req, res) {
        // logout is a passport.js function that will clear the session if exists and remove the req.user
        req.logout();
        res.redirect('/');
    });

    /* process the login form when a post is issued from the main page
     * On success redirect to the profile page
     * On failure stay at the main page and show appropriate failure message
     */
    app.post('/', passport.authenticate('login', {
        successRedirect : '/profile',
        failureRedirect : '/',
        failureFlash : true
    }));
};

// Check if the passport.js has a valid user session to authenticate the user or send/keep the user at home
function checkLoggingStatus(req, res, next) {
    // A passport.js function that will check if the user has a valid session
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}