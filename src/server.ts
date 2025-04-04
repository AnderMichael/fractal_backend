import cors from 'cors';
import express from 'express';
import { configVariables } from './config/configVariables';
import generalRouter from './routes/generalRoutes';
import { errorHandler } from './utils/errorHandler';

const { port, version } = configVariables;

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use(`/api/${version}`, generalRouter);

app.get('/', (_req, res) => {
    res.send('Order API is running!');
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}!`);
});

export default app;