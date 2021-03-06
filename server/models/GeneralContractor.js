const {Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const generalContractorSchema = new Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: 'Password is required',
        minLenth: 8
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
    phoneNumber: {
        type: String,
        required: false,
        trim: true
    },
    projects: [
        {
          type: Schema.Types.ObjectId,
          ref: "Project"
        }
      ]
})

// set up pre-save middleware to create password
generalContractorSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});
  
// compare the incoming password with the hashed password
generalContractorSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const generalContractor = model('generalContractor', generalContractorSchema);

module.exports = generalContractor;