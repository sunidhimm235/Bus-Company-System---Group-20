const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc');

const Schema = mongoose.Schema;

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

// Apply the autoIncrement plugin to userSchema.
userSchema.plugin(autoIncrement, {
  model: 'User', // The model name
  field: 'userId', // The field to autoincrement
  startAt: 1, // The number the count should start at
  incrementBy: 1 // The number by which to increment the count each time
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const bcrypt = require('bcryptjs');
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function(candidatePassword) {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;