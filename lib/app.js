import authController from './controllers/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middleware/error.js';
import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';

const app = express();
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(authController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
