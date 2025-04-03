import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const productController = new ProductController();

const basePath = '/products';

router.get(`${basePath}`, asyncHandler(productController.getAll.bind(productController)));
router.get(`${basePath}/:id`, asyncHandler(productController.getById.bind(productController)));
router.post(`${basePath}`, asyncHandler(productController.create.bind(productController)));
router.put(`${basePath}/:id`, asyncHandler(productController.update.bind(productController)));
router.delete(`${basePath}/:id`, asyncHandler(productController.delete.bind(productController)));

export default router;