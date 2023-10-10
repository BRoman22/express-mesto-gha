import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized';

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const authorization = req.cookies.jwtKey;

  if (!authorization) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  return jwt
    .verify(token, NODE_ENV ? JWT_SECRET : 'super-strong-secret')
    .then((decoded) => {
      req.user = decoded;
      next();
    })
    .catch(next(new Unauthorized('Необходима авторизация')));
}

export default auth;
