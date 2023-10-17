import app from './app';
// eslint-disable-next-line import/order
import mongoose from 'mongoose';

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('');
    console.log('Mongo connect');
    app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  })
  .catch(() => console.log('Mongo don`t connect'));
