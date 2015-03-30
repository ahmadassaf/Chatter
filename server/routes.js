module.exports = function(app, passport) {

    /* =====================================
     *               HomePage
     * ===================================== */
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

};