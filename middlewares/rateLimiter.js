import { rateLimit } from 'express-rate-limit';
import TooManyRequests from '../errors/TooManyRequests';

const limiter = rateLimit({
  limit: 160,
  windowMS: 15 * 60 * 1000, // 15 minutes
  handler: (req, res, next) => next(new TooManyRequests(
    'Слишком много запросов, пожалуйста, повторите попытку позже',
  )),
});

export default limiter;
