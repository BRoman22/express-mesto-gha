import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина 2 символа'],
      maxlength: [30, 'Максимальная длина 30 символов'],
    },
    about: {
      type: String,
    },
    avatar: {
      type: String,
      validate: {
        validator: (url) => isURL(url),
        message: 'Некорректный URL',
      },
    },
    email: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
      unique: true,
      validate: {
        validator: (email) => isEmail(email),
        message: 'Некорректный Email',
      },
    },
    password: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
      select: false,
    },
  },
  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (!user) {
              return Promise.reject(new Error('Неправильные почта или пароль'));
            }
            return bcrypt.compare(password, user.password).then((matched) => {
              if (!matched) {
                return Promise.reject(
                  new Error('Неправильные почта или пароль'),
                );
              }
              return user;
            });
          });
      },
    },
  },
);

export default mongoose.model('user', userSchema);
