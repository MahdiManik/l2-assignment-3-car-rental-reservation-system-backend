/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/config/routes';
import notFound from './app/config/middleware/notFound';
import globalErrorHandler from './app/config/middleware/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
);
app.use(cookieParser());

// application routes
app.use('/api', router);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Car Rental Project</h1>');
});

export default app;
