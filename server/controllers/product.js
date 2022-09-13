import ProductModel from "../models/product.js";

export const createProduct = async (req, res) => {

  console.log(req.body)
  console.log(req.file)

  const imageFile = (req.file) ? req.file.filename : null

  let {title, description, price, category} = req.body
  let data = new ProductModel({title, description, price, category, imageFile})
  let response = await data.save()
  res.status(201).json(response)

}

export const getProducts = async (req, res) => {

  try {
    const products = await ProductModel.find()
    res.status(200).json(products)
  } catch (err) {
    res.status(404).json({message: "Something went wrong"})
  }
}

export const productType = async (req, res) => {
  const productType = req.params.type
  console.log(productType)
  try {
    const newProductData = await ProductModel.find({category: productType})
    res.status(200).json(newProductData)
  } catch (err) {
    res.status(404).json({message: "Something went wrong"})
  }
}

export const getProduct = async (req, res) => {
  const {id} = req.params;
  // console.log(id)
  try{
    const product = await ProductModel.findById(id)
    res.status(200).json(product)
  } catch (err) {
    res.status(404).json({message: "Something went wrong"})
  }
}





