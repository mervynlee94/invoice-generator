const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const invoiceSchema = mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
    },
    userId: {
      type: String,
    },
    date: {
      type: Date,
    },
    due: {
      type: Number,
    },
    issuer: {
      businessRegistrationNumber: {
        type: String,
      },
      companyName: {
        type: String,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
          if (value && !validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        },
      },
      address: {
        street: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
      },
      contactNumber: {
        type: String,
      },
      logo: {
        type: String,
      },
    },
    recipient: {
      companyName: {
        type: String,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
          if (value && !validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        },
      },
      address: {
        street: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
      },
      contactNumber: {
        type: String,
      },
    },
    items: [
      {
        description: {
          type: String,
        },
        rate: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    paymentRecords: [
      {
        amount: {
          type: Number,
        },
        date: {
          type: Date,
        },
        method: {
          type: String,
        },
        notes: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
invoiceSchema.plugin(toJSON);
invoiceSchema.plugin(paginate);

/**
 * @typedef Invoice
 */
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
