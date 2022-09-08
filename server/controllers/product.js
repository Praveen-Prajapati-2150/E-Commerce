import ProductModel from "../models/product.js";
import mongoose from "mongoose";
import {MulterService} from "../middleware/imageUploader.js";
import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()} - ${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage: storage,
  limits: {fileSize: 1000000 * 5}
}).single("image");


export const createProduct = async (req, res) => {
  handleMultipartData(req, res, async (err) => {
    console.log(req.body)
  })

  // const file = (req.file) ? req.file.filename : null
  // console.log(req.file)
  // console.log(req.body)
  // console.log(req.files.filename)
  // console.log(req.files)

  // MulterService(req, res, (err) => {
  //   if (err) {
  //     res.status(404).json({message: "Something went wrong 1234"})
  //   }
  //
  //   let filePath = ''
  //   if (req.file) {
  //     console.log(req.file)
  //     filePath = req.file.path;
  //     console.log(filePath)
  //     console.log(req.file.filename)
  //   }
  // })

  // const product = req.body;
  // console.log(req.body)
  // const newProduct = new ProductModel({
  //   ...product,
  //   // imageFile: file,
  //   creator: req.userId, //Todo I want to from where this userId is coming
  //   createdAt: new Date().toISOString()
  // })
  //
  // try {
  //   await newProduct.save();
  //   res.status(201).json(newProduct)
  // } catch (err) {
  //   res.status(404).json({message: "Something went wrong"})
  // }
}

export const getProducts = async (req, res) => {

  try {
    const products = await ProductModel.find()
    res.status(200).json(products)
  } catch (err) {
    res.status(404).json({message: "Something went wrong"})
  }
}
