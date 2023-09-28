import User from "../models/user.js";
import { Error404 } from "../errors.js";

function checkResponse(err, res) {
  if (err.name === "ValidationError") {
    return res.status(400).send({
      message: "Переданы некорректные данные",
    });
  }
  if (err instanceof Error404) {
    return res.status(err.status).send({ message: err.message });
  }
  res.status(500).send({ message: "Произошла ошибка" });
}

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error404("Пользователь по указанному id не найден"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof Error404) {
        return res.status(err.status).send({ message: err.message });
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

export const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные",
        });
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

export const userUpdateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(new Error404("Пользователь по указанному id не найден"))
    .then((user) => res.send(user))
    .catch((err) => checkResponse(err, res));
};

export const userUpdateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(new Error404("Пользователь по указанному id не найден"))
    .then((user) => res.send(user))
    .catch((err) => checkResponse(err, res));
};
