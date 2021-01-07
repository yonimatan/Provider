module.exports = function (req,res){
    if(!req.session.loggedIn){
        res.render('login');
    } else {
        res.redirect('/home')
    }
}