import express from 'express'
import auth from '../middleware/auth.js'
import multer from "multer";
import path from 'path'

const router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // if (!file.originalname.match(/\.(png|jpg|jpeg|webp|.mp4|svg)$/)) {
      if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/webp' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/svg' ||
        file.mimetype === 'image/gif' ||
        file.mimetype === 'application/pdf'
      ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg, .mp4 and .jpeg format allowed!'))
    }
  }
})
// const upload = multer({storage: storage})


import {createProduct, getProduct, getProducts, productType} from "../controllers/product.js";

// router.post("/", auth, MulterService.send, createProduct)
router.post("/", auth, upload.single('imageFile'), createProduct)
// router.post("/", auth, createProduct)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.get("/:type", productType)

export default router;