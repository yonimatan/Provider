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
    collection: 'HomelessChairs'
})

schema.plugin(mongoose_fuzzy_searching, { fields: ['item'] })
const HomelessChairs = model('HomelessChairs', schema);

module.exports = HomelessChairs