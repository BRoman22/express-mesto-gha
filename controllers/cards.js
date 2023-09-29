import mongoose from "mongoose";
import Card from "../models/card.js";
const { ValidationError, CastError } = mongoose.Error;

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

export const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error("NotFound"))
    .then(() => res.status(200).send({ message: "Пост удалён" }))
    .catch((err) => {
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена" });
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

export const cardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("NotFound"))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена" });
      }
      if (err instanceof CastError) {
        return res.status(400).send({
          message: "Переданы некорректные данные для постановки/снятии лайка",
        });
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

export const cardDislike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("NotFound"))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === "NotFound") {
        return res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена" });
      }
      if (err instanceof CastError) {
        return res.status(400).send({
          message: "Переданы некорректные данные для постановки/снятии лайка",
        });
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};
