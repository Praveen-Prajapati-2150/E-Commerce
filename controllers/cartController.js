import CartModel from "../models/cartModel.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  const {userId} = req.params;
  const {id, quantity, price} = req.body;

  const cartDetails = {product: id, quantity, price}
  console.log("cartDetails", cartDetails)
  console.log("cartDetails.product", cartDetails.product)

  CartModel.findOne({user: userId})
    .exec((error, cart) => {
      if (error) return res.status(400).json({error});
      // if cart exits
      if (cart) {
        console.log("product", cartDetails.product)
        const item = cart.cartItems.find(c => c.product == cartDetails.product)  // isItemExists
        console.log("item", item)
        if (item) {
          // CartModel.findOneAndUpdate({ "user": req.body.user, "cartItems.product": product }, {
          const cartItems = CartModel.findOneAndUpdate({"user": userId, "cartItems.product": cartDetails.product})
          console.log("cartItems", cartItems)
          CartModel.findOneAndUpdate({"user": userId, "cartItems.product": cartDetails.product}, {
            '$set': {
              'cartItems': {
                // ...req.body.cartItems,
                ...cartDetails,
                // quantity: item.quantity + req.body.cartItems.quantity
                quantity: item.quantity + quantity
              }
            }
          })
            .exec((error, _cart) => {
              if (error) return res.status(400).json({error});
              if (cart) return res.status(201).json({cart: _cart})
            })
        } else {
          // CartModel.findOneAndUpdate({user: req.body.user}, {
          CartModel.findOneAndUpdate({user: userId}, {
            '$push': {
              // 'cartItems': req.body.cartItems
              'cartItems': cartDetails
            }
          })
            .exec((error, _cart) => {
              if (error) return res.status(400).json({error});
              if (cart) return res.status(201).json({cart: _cart})
            })

        }

      } else {
        //if cart not exists then create a new cart
        console.log("else called")
        const cart = new CartModel({
          // user: req.body.user,
          // cartItems: [req.body.cartItems]
          user: userId,
          cartItems: [cartDetails],
        })

        cart.save((error, cart) => {
          if (error) return res.status(400).json({error});
          if (cart) return res.status(201).json({cart})
        })
      }
    })

  ///////////////////////////////////////////////////////

  // const cart = new CartModel({
  //   // user: req.body.user,
  //   // cartItems: req.body.cartItems
  //   user: userId,
  //   cartItems: [cartDetails],
  // })
  //
  // cart.save((error, cart) => {
  //   if (error) return res.status(400).json({error});
  //   if (cart) return res.status(201).json({cart})
  // })

}