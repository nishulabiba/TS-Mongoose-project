import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoute } from './app/modules/products/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

//applicatio routes

app.use('/api/products', ProductRoute);

export default app;
