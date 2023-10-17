import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL';

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
      minlength: [2, 'Минимальная длина 2 символа'],
      maxlength: [30, 'Максимальная длина 30 символов'],
    },
    link: {
      type: String,
      required: { value: true, message: 'Поле является обязательным' },
      validate: {
        validator: (v) => isURL(v),
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export default mongoose.model('card', cardSchema);
