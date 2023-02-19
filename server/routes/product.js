import express from 'express';
import auth from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/webp' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/svg' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error(
          'Only .png, .jpg, .webp, .svg, .gif, .pdf and .jpeg format allowed!'
        )
      );
    }
  },
});

import {
  createProduct,
  getProduct,
  getProducts,
  getRelatedProducts,
  getProductsByUser,
  updateProduct,
  deleteTour,
  getProductsBySearch,
  getCategoryRelatedProducts,
} from '../controllers/product.js';

router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/relatedProducts/:category', getRelatedProducts);
router.get('/search/:searchQuery', getProductsBySearch);

router.post('/', auth, upload.single('imageFile'), createProduct);
router.patch('/:id', auth, upload.single('imageFile'), updateProduct);
router.delete('/:id', auth, deleteTour);
router.get('/userProducts/:id', getProductsByUser);

router.get('/category/:relatedProducts', getCategoryRelatedProducts);

export default router;
