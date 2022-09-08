import express from 'express'
import auth from '../middleware/auth.js'
// import {multer} from '../middleware/imageUploader.js'
// import {MulterService} from "../middleware/imageUploader.js";
// import multer from "multer";

const router = express.Router()
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '_' + file.originalname)
//   }
// })
// const upload = multer({storage: storage})
// const upload = multer({dest: 'public/uploads/'})

import {createProduct, getProducts} from "../controllers/product.js";

// router.post("/", auth, MulterService.send, createProduct)
// router.post("/", auth, upload.single('imageFile'), createProduct)
router.post("/", auth, createProduct)
router.get("/", getProducts)

export default router;