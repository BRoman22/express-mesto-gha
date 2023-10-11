import { celebrate, Joi } from 'celebrate';

const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

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
      .custom(httpRegex),
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
    avatar: Joi.string().custom(httpRegex),
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
      .custom(httpRegex),
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
