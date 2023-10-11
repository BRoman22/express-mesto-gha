import { rateLimit } from 'express-rate-limit';
import TooManyRequests from '../errors/TooManyRequests';

const limiter = rateLimit({
  limit: 153,
  windowMS: 3 * 60 * 1000, // 3 minutes
  handler: (req, res, next) => next(new TooManyRequests(
    'Слишком много запросов, пожалуйста, повторите попытку позже',
  )),
});

export default limiter;
