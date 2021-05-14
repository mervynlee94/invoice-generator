const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInvoice = {
  query: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    invoiceNumber: Joi.string(),
    date: Joi.date(),
    due: Joi.number(),
    issuer: Joi.object().keys({
      businessRegistrationNumber: Joi.string(),
      companyName: Joi.string(),
      email: Joi.string().email(),
      address: Joi.object().keys({
        street: Joi.string(),
        zipCode: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
      }),
      logo: Joi.string(),
    }),
    recipient: Joi.object().keys({
      companyName: Joi.string(),
      email: Joi.string().email(),
      address: Joi.object().keys({
        street: Joi.string(),
        zipCode: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
      }),
    }),
    items: Joi.array().items({
      description: Joi.string(),
      rate: Joi.number(),
      quantity: Joi.number(),
    }),
    paymentRecords: Joi.array().items({
      amount: Joi.number(),
      date: Joi.date(),
      method: Joi.string(),
      note: Joi.string().allow(''),
    }),
  }),
};

const getInvoicesByUserId = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getInvoice = {
  query: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
  params: Joi.object().keys({
    invoiceId: Joi.string().required().custom(objectId),
  }),
};

const updateInvoice = {
  params: Joi.object().keys({
    invoiceId: Joi.string().required().custom(objectId),
  }),
  query: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    invoiceNumber: Joi.string(),
    date: Joi.date(),
    due: Joi.number(),
    issuer: Joi.object().keys({
      businessRegistrationNumber: Joi.string(),
      companyName: Joi.string(),
      email: Joi.string().email(),
      address: Joi.object().keys({
        street: Joi.string(),
        zipCode: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
      }),
      logo: Joi.string(),
    }),
    recipient: Joi.object().keys({
      companyName: Joi.string(),
      email: Joi.string().email(),
      address: Joi.object().keys({
        street: Joi.string(),
        zipCode: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
      }),
    }),
    items: Joi.array().items({
      description: Joi.string(),
      rate: Joi.number(),
      quantity: Joi.number(),
    }),
    paymentRecords: Joi.array().items({
      amount: Joi.number(),
      date: Joi.date(),
      method: Joi.string(),
      note: Joi.string().allow(''),
    }),
  }),
};

const deleteInvoice = {
  query: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
  params: Joi.object().keys({
    invoiceId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createInvoice,
  getInvoicesByUserId,
  getInvoice,
  updateInvoice,
  deleteInvoice,
};
