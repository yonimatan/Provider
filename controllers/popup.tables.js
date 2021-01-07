const HomelessTables = require('../models/Homeless.Tables');

module.exports = async function(req,res){
    const {id} = req.params;
    const tables = await HomelessTables.find({_id: id});

    res.render('popup_tables', {
        imgUrl: tables[0].imgUrl,
        description: tables[0].description,
        link: tables[0].link
    })
}