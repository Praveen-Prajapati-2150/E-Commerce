import express from "express";
import auth from '../middleware/auth.js'

import {addToCart} from "../controllers/cartController.js";

const router = express.Router()


router.post("/addToCart/:userId", auth, addToCart)

export default router;