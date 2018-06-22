const { Schema } = require('mongoose');
const valiator = require('validator');

const userSchema = new Schema({
  email: {
    type: String, 
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: valiator.isEmail(),
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = userSchema;