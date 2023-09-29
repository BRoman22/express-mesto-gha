import { Router } from 'express';
import {
  getCards,
  createCards,
  deleteCard,
  cardLike,
  cardDislike,
} from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', createCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', cardLike);
cardRouter.delete('/:cardId/likes', cardDislike);

export default cardRouter;
