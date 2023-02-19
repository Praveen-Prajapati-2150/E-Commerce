import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
//   id: { type: String },
});

export default mongoose.model('Admin', AdminSchema);
