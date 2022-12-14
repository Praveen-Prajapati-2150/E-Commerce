import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  // user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  user: {type: String, required: true},
  cartItems: [
    {
      // product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
      product: {type: String, required: true},
      quantity: {type: Number, default: 1},
      price: {type: Number, required: true}
    }
  ]
}, {timestamps: true})

export default mongoose.model("Cart", cartSchema)