import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} from '../utils/statusCodes';

const { ValidationError, CastError } = mongoose.Error;

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла ошибка' }));
};

export const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
      if (err instanceof CastError) {
        return res
          .status(BAD_REQUEST)
          .send({ message: 'Передан не валидный id' });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла ошибка' });
    });
};

export const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name: name || 'Жак-Ив Кусто',
      about: about || 'Исследователь',
      avatar: avatar
      || 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла ошибка' });
    });
};

export const userUpdateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
      if (err instanceof ValidationError) {
        return res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла ошибка' });
    });
};

export const userUpdateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
      if (err instanceof ValidationError) {
        return res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла ошибка' });
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => res.send({
      token: jwt.sign({ _id: user._id }, 'super-strong-secret', {
        expiresIn: '7d',
      }),
    }))
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
