import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized';

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const authorization = req.cookies.jwtKey;

  if (!authorization) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  const secret = NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret';
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = { _id: payload._id };

  next();
};

export default auth;
