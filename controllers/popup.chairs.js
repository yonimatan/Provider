const HomelessChairs = require('../models/Homeless.Chairs');

module.exports = async function(req,res){
    const {id} = req.params;
    const chairs = await HomelessChairs.find({_id: id});

    res.render('popup', {
        imgUrl: chairs[0].imgUrl,
        description: chairs[0].description,
        link: chairs[0].link
    })
}