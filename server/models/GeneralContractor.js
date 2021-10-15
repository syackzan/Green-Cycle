const {Schema, model } = require('mongoose');

const generalContractorSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
        type: Number,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: false,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLenth: 8
    },
    projects: [
        {
          type: Schema.Types.ObjectId,
          ref: "Project"
        }
      ]
})

const generalContractor = model('generalContractor', generalContractorSchema);

module.exports = generalContractor;