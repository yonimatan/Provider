module.exports = function (req,res){
    if(!req.session.loggedIn){
        res.render('signup');
    } else {
        res.redirect('/home')
    }
}