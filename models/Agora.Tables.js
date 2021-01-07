const {Schema, model} = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const schema = new Schema({
    name: String,
    area: String,
}, {
    collection: 'AgoraTables'
})

schema.plugin(mongoose_fuzzy_searching, { fields: ['name'] })
const AgoraTables = model('AgoraTables', schema);

module.exports = AgoraTables;