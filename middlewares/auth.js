import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized';

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  let payload;
  const { authorization } = req.headers;
  const { cookies } = req;
  const token = authorization
    ? authorization.replace('Bearer ', '')
    : cookies.jwtKey;
  const secret = NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret';

  jwt
    .verify(token, secret)
    .then((item) => {
      payload = item;
      req.user = payload;
      next();
    })
    .catch(() => next(new Unauthorized('Необходима авторизация')));
};

export default auth;
