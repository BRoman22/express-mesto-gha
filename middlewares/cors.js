const allowedCors = [
  'https://mesto-site.nomoredomainsrocks.ru',
  'http://mesto-site.nomoredomainsrocks.ru',
  'localhost:3000',
];

export default function (req, res, next) {
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { method } = req;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Origin', '*');
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', requestHeaders);
  }
  next();
}
