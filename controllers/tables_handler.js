const HomelessTables = require('../models/Homeless.Tables');
const AgoraTables = require('../models/Agora.Tables');

module.exports = async function (req,res){
    const data = await HomelessTables.find();
    const data2 = await AgoraTables.find();
    res.json([...data, ...data2]);
}