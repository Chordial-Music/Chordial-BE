import express from 'express';
import cors from 'cors';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
