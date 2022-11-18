import ProductModel from '../models/product.js';
import mongoose from 'mongoose';

export const createProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const imageFile = req.file ? req.file.filename : null;

  let { title, description, price, category, creator } = req.body;
  let data = new ProductModel({
    title,
    description,
    price,
    category,
    imageFile,
    creator,
  });
  let response = await data.save();
  res.status(201).json(response);
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong' });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong' });
  }
};

export const getProductsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userProducts = await ProductModel.find({ creator: id });
  res.status(200).json(userProducts);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  let { title, description, price, category, creator } = req.body;
  // const imageFile = (req.file) ? req.file.filename : null
  // console.log(id)
  // console.log(req.body)

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const updateProduct = {
      title,
      description,
      price,
      category,
      creator,
      _id: id,
    };

    // if(imageFile.length !== null){
    // updateProduct({
    //   ...updateProduct,
    //     imageFile: imageFile
    // })
    // updateProduct[imageFile] = imageFile
    // updateProduct.imageFile = imageFile
    // }

    let response = await ProductModel.findByIdAndUpdate(id, updateProduct, {
      new: true,
    });
    // let response = await ProductModel.findByIdAndUpdate(id, {title, description, price, category, creator}, {new: true})
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong' });
  }
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    await ProductModel.findByIdAndDelete(id);
    res.json({ message: 'Product Deleted Successfully' });
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong' });
  }
};

export const getProductsBySearch = async (req, res) => {
  const { searchQuery } = req.params;
  console.log({ searchQuery });
  try {
    const newTitle = new RegExp(searchQuery, 'i');
    const products = await ProductModel.find({ title: newTitle });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Something went wrong' });
  }
};

export const getRelatedProducts = async (req, res) => {
  const newCategory = req.params.category;
  console.log('category', newCategory);
  // const {category} = req.params;
  try {
    const products = await ProductModel.find({ category: newCategory });
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong' });
  }
};

export const getCategoryRelatedProducts = async (req, res) => {
  const category = req.params.relatedProducts;
  console.log('category', category);
  try {
    const Products = await ProductModel.find({ category: category });
    res.status(200).json(Products);
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong' });
  }
};
