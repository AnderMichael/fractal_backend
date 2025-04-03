import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const orderController = new OrderController();

const basePath = '/orders';

router.get(`${basePath}`, asyncHandler(orderController.getAll.bind(orderController)));
router.post(`${basePath}`, asyncHandler(orderController.create.bind(orderController)));
router.get(`${basePath}/:id`, asyncHandler(orderController.getById.bind(orderController)));
router.put(`${basePath}/:id`, asyncHandler(orderController.update.bind(orderController)));
router.delete(`${basePath}/:id`, asyncHandler(orderController.delete.bind(orderController)));

export default router;
