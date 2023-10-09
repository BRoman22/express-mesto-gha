import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '../utils/statusCodes';

function handleAuthError(res) {
  return res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
}

function extractBearerToken(header) {
  return header.replace('Bearer ', '');
}

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);

  jwt
    .verify(token, 'super-strong-secret')
    .then((decoded) => {
      req.user = decoded;
    })
    .catch(() => handleAuthError(res));
  return next();
}

export default auth;
