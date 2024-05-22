import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoute } from './app/modules/products/product.route';
import { OrderRoute } from './app/modules/orders/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes

app.use('/api/products', ProductRoute);
app.use('/api/orders', OrderRoute);

export default app;
