const User = require('../models/Users');

module.exports = async function (req,res){
    const {
        username,
        password
    } = req.body;

    const d = new User({
        username: username,
        password: password
    });

    d.save().then(response => {
        res.redirect('/');
    }).catch(err => {
        res.redirect('/');
    })


}