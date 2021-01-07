const transporter = require('./transporter');
const HomelessTables = require('../models/Homeless.Tables');
const HomelessChairs = require('../models/Homeless.Chairs');

module.exports = async function(req,res){
    const {email,id,type} = req.body;
    if(type === 'chairs'){
        const chairs = await HomelessChairs.find({_id: id});
        transporter.sendMail({
            to: email,
            from: 'barkatmatan1@gmail.com',
            subject: `Shared link of item ${chairs[0].item || chairs[0].name}`,
            html: `<a href="${chairs[0].link || '#'}">Click here for link</a>`
        })

        res.render('sharing_success', {
            email
        })
    } else {
        const tables = await HomelessTables.find({_id: id});
        transporter.sendMail({
            to: email,
            from: 'barkatmatan1@gmail.com',
            subject: `Shared link of item ${tables[0].item}`,
            html: `<a href="${tables[0].link}">Click here for link</a>`
        })

        res.render('sharing_success', {
            email
        })
    }

}