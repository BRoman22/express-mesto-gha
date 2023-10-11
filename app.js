import 'dotenv/config';
import express, { json } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import limiter from './middlewares/rateLimiter';
import errorHandler from './middlewares/errorHandler';
import routes from './routes/index';

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const app = express();

app.use(helmet());
app.use(json());
app.use(cookieParser());
app.use(limiter);
app.use('/', routes);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('');
    console.log('Mongo connect');
    app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  })
  .catch(() => console.log('Mongo don`t connect'));
