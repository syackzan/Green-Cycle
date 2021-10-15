const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
    material: {
        type: String,
        required: true,
        trim: true
    },
    quanitity: {
        type: Number,
        required: true,
        trim: true
    },
    unit: {
        type: String,
        required: true,
        trim: true
    },
    notes: {
        type: String,
        required: true,
        trim: true
    },
    recycler: {
        type: String,
        required: true,
        trim: true
    }
})

const Item = model('Item', itemSchema);

module.exports = Item;