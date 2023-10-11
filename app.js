import 'dotenv/config';
import express, { json } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import limiter from './middlewares/rateLimiter';
import errorHandler from './middlewares/errorHandler';
import routes from './routes/index';

const { PORT, MONGO_URL } = process.env;

const app = express();

app.use(helmet());
app.use(json());
app.use(cookieParser());
app.use('/', routes);
app.use(errors());
app.use(limiter);
app.use(errorHandler);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('');
    console.log('Mongo connect');
    app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  })
  .catch(() => console.log('Mongo dont connect'));
