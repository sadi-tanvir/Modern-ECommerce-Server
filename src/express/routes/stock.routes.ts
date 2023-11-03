import express from "express";
import { stockContController } from "../controllers/products.controller";
const router = express.Router();

// stock count
router.get('/stock-count', stockContController)


export default router;