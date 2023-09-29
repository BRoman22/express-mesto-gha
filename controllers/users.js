import mongoose from "mongoose";
import User from "../models/user.js";
const { ValidationError, CastError } = mongoose.Error;

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("NotFound"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Пользователь по указанному _id не найден" });
      }
      if (err instanceof CastError) {
        return res.status(400).send({ message: "Передан не валидный id" });
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

export const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

export const userUpdateProfile = (req, res) => {
  const { name, about } = req.body;
  if (name?.length < 2 || about?.length < 2) {
    return res
      .status(400)
      .send({ message: "поле должно содержать минимум 2 символа" });
  }
  if (name?.length > 30 || about?.length > 30) {
    return res
      .status(400)
      .send({ message: "поле должно содержать максимум 30 символов" });
  }
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(new Error("NotFound"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof SyntaxError) {
        return res.send("lol");
      }
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
      }
      if (err instanceof ValidationError) {
        return res.status(400).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

export const userUpdateAvatar = (req, res) => {
  const { avatar } = req.body;
  if (avatar.length < 2) {
    return res
      .status(400)
      .send({ message: "поле должно содержать минимум 2 символа" });
  }
  if (avatar.length > 30) {
    return res
      .status(400)
      .send({ message: "поле должно содержать максимум 30 символов" });
  }
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(new Error("NotFound"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
      }
      if (err instanceof ValidationError) {
        return res.status(400).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};
