import mongoose from 'mongoose';

const testSchema = mongoose.Schema({
  title: String,
  description: String,
  price: String,
  imageFile: String,
  category: String,
  creator: String,
  rating: {
    rating: Number,
    count: Number,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const testModel = mongoose.model('test', testSchema);

export default testModel;
