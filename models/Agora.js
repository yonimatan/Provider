const {Schema, model} = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const schema = new Schema({
    name: String,
    area: String,
}, {
    collection: 'Agora'
})

schema.plugin(mongoose_fuzzy_searching, { fields: ['name'] })
const Agora = model('Agora', schema);

module.exports = Agora;