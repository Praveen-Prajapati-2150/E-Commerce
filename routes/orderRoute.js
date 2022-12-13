import express from 'express'
import auth from '../middleware/auth.js'

import {newOrder} from "../controllers/orderController.js";

const router = express.Router()

router.post("/new", auth, newOrder);

export default router;