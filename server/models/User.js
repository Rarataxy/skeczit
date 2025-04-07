const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String, 
    required: true,
    unique: true,
    default: () => require('uuid').v4() 
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3, 
    maxlength: 50 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'] 
  },
  password: {
    type: String,
    required: true,
    minlength: 4, 
  },
  avatar: {
    type: String, 
    default: 'default-avatar.png' 
  }
}, { timestamps: true }); 


const User = mongoose.model('User', userSchema);

module.exports = User;
