const { Schema, model } = require('mongoose');


const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    squareFootage: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    zip: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: String,
        required: false,
        trim: true
    },
    generalContractor: [
        {
            type: Schema.Types.ObjectId,
            ref: 'generalContractor'
        }
    ],
    recycleItems: [
        {
            type:Schema.Types.ObjectId,
            ref: "Item"
        }
    ]
})

const Project = model('Project', projectSchema);

module.exports = Project;