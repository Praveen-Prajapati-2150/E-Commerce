import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Please provide an Name!'] },
  email: {
    type: String,
    required: [true, 'Please provide an Email!'],
    unique: [true, 'Email Exist'],
  },
  password: {
    type: String,
    required: [false, 'Please provide a password!'],
    unique: false,
  },
  googleId: { type: String, required: false },
  id: { type: String },
  googleId: { type: String },
  secret: { type: String },
});

export default mongoose.model('User', userSchema);
