const Agora = require('../models/Agora');
const AgoraTables = require('../models/Agora.Tables');
const HomelessChairs = require('../models/Homeless.Chairs');
const HomelessTables = require('../models/Homeless.Tables');

module.exports = async function(req,res){
    const {search} = req.body;
    const agora = await Agora.fuzzySearch(search);
    const chairs = await HomelessChairs.fuzzySearch(search);
    const tables = await HomelessTables.fuzzySearch(search);
    const agoraTables = await AgoraTables.fuzzySearch(search);

    res.json([...chairs, ...tables, ...agora, ...agoraTables]);
}