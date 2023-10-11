import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized';

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  let payload;
  try {
    const { authorization } = req.headers;
    const { cookies } = req;
    if ((authorization && authorization.startsWith('Bearer ')) || (cookies && cookies.jwtKey)) {
      const token = authorization ? authorization.replace('Bearer ', '') : cookies.jwtKey;
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
      req.user = payload;
      next();
    } else {
      next(new Unauthorized('Необходима авторизация'));
    }
  } catch (error) {
    next(new Unauthorized('Необходима авторизация'));
  }
};

export default auth;
