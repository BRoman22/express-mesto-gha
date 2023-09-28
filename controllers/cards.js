import Card from "../models/card.js";
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

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createCards = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные",
        });
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

export const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error404("Карточка с указанным id не найдена"))
    .then(() => res.send({ message: "Пост удалён" }))
    .catch((err) => {
      if (err instanceof Error404) {
        return res.status(err.status).send({ message: err.message });
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
    .orFail(new Error404("Карточка с указанным id не найдена"))
    .then((card) => res.send(card))
    .catch((err) => checkResponse(err, res));
};

export const cardDislike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error404("Карточка с указанным id не найдена"))
    .then((card) => res.send(card))
    .catch((err) => checkResponse(err, res));
};
