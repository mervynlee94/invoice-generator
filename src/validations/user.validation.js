const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    email: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      companyInfo: Joi.object().keys({
        businessRegistrationNumber: Joi.string(),
        name: Joi.string(),
        email: Joi.string().email(),
        address: Joi.object().keys({
          street: Joi.string(),
          zipCode: Joi.string(),
          city: Joi.string(),
          state: Joi.string(),
        }),
        contactNumber: Joi.string(),
        paymentInfo: Joi.object().keys({
          bankTransfer: Joi.object().keys({
            bankName: Joi.string(),
            bankAccountNumber: Joi.string(),
          }),
        }),
        invoiceInfo: Joi.object().keys({
          prefix: Joi.string(),
          startCounter: Joi.number(),
        }),
      }),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
