const Users = require('../models/Users');

module.exports = async function (req,res){
    const {
        username,
        password
    } = req.body;

    const data = await Users.findOne({
        username: username,
        password: password
    }).exec()

    if(data !== null){
        req.session.loggedIn = true;
        res.redirect('/home');
    } else {
        res.redirect('/');
    }
}