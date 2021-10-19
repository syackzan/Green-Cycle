const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const itemSchema = new Schema({
    material: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp), 
    },
    quantity: {
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
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
})

const Item = model('Item', itemSchema);

module.exports = Item;