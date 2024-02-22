const mongoose = require('mongoose');

const connection = mongoose.createConnection(process.env.DATABASE_URI);
autoIncrement.initialize(connection);

const userSchema = new mongoose.Schema({
  username: { type: String, 
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
    enum: ['user', 'employee', 'admin'], default: 'user' 
  }
});

userSchema.plugin(autoIncrement.plugin, { 
  model: 'User', 
  field: 'userId', 
  startAt: 1, 
  incrementBy: 1
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);