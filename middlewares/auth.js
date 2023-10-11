import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized';

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
export default function auth(req, res, next) {
  const { jwtKey } = req.cookies;

  if ((!jwtKey)) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  // const token = jwtKey.replace('Bearer ', '');
  const token = jwtKey;
  const secret = NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret';
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = { _id: payload._id };
  next();
}
