import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: String,
  imageFile: String,
  category: String,
  creator: String,
  rating: {
    rating: Number,
    count: Number
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
})

const ProductModel = mongoose.model("Product", productSchema)

export default ProductModel;