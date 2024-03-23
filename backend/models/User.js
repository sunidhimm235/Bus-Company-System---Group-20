const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { autoIncrement } = require('mongoose-plugin-autoinc');

const Schema = mongoose.Schema;

// define schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'employee', 'admin'],
    default: 'user'
  }
});

// init autoIncrement to schema
userSchema.plugin(autoIncrement, {
  model: 'User',
  field: 'userId',
  startAt: 1,
  incrementBy: 1
});


userSchema.pre('save', async function(next) {
  // if (this.isModified('password')) {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
  next();
});

// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// compile and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;