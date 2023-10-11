import { celebrate, Joi } from 'celebrate';
import validator from 'validator';

function urlValidator(value) {
  return validator.isURL(value) ? value : null;
}

export const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .required()
      .length(24)
      .hex(),
  }),
});

export const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    about: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
});

export const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom(urlValidator),
  }),
});

export const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required(),
  }),
});

export const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required(),
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string().custom(urlValidator),
  }),
});

export const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string()
      .required()
      .custom(urlValidator),
  }),
});

export const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .length(24)
      .hex(),
  }),
});

export const cardLikeValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .length(24)
      .hex(),
  }),
});

export const cardDislikeValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .length(24)
      .hex(),
  }),
});
