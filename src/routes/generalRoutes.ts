import { Router } from "express";
import orderRoutes from "./orderRoutes";
import productRoutes from "./productRoutes";

const generalRouter = Router();
generalRouter.use(productRoutes);
generalRouter.use(orderRoutes);

export default generalRouter;