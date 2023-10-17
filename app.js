import 'dotenv/config';
import express, { json } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import limiter from './middlewares/rateLimiter';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import routes from './routes/index';

const app = express();

app.use(helmet());
app.use(json());
app.use(cookieParser());
app.use(limiter);
app.use(requestLogger);
app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

export default app;
