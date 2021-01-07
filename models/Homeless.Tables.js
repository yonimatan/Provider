const {Schema, model} = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const schema = new Schema({
    item: String,
    city: String,
    price: Number,
    description: String,
    link: String,
    imgUrl: String
}, {
    collection: 'HomelessTables'
})

schema.plugin(mongoose_fuzzy_searching, { fields: ['item'] })
const HomelessTables = model('HomelessTables', schema);

module.exports = HomelessTables;