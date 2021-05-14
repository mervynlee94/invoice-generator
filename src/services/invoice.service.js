const httpStatus = require('http-status');
const { Invoice } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an invoice
 * @param {ObjectId} userId
 * @param {Object} invoiceBody
 * @returns {Promise<Invoice>}
 */
const createInvoice = async (userId, invoiceBody) => {
  const invoice = await Invoice.create({
    ...invoiceBody,
    userId,
  });
  return invoice;
};

/**
 * Query for invoices
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInvoicesByUserId = async (filter, options) => {
  const returnFields = 'invoiceNumber date recipient.companyName items.rate items.quantity paymentRecords.amount';
  const invoices = await Invoice.paginate(filter, options, returnFields);
  return invoices;
};

/**
 * Get invoice by id
 * @param {ObjectId} userId
 * @param {ObjectId} invoiceId
 * @returns {Promise<Invoice>}
 */
const getInvoiceById = async (userId, invoiceId) => {
  const invoice = await Invoice.findOne({ _id: invoiceId, userId });
  return invoice;
};

/**
 * Update invoice by id
 * @param {ObjectId} userId
 * @param {ObjectId} invoiceId
 * @returns {Promise<User>}
 */
const updateInvoiceById = async (userId, invoiceId, updateBody) => {
  const invoice = await getInvoiceById(userId, invoiceId);
  if (!invoice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invoice not found');
  }
  Object.assign(invoice, updateBody);
  await invoice.save();
  return invoice;
};

/**
 * Delete invoice by id
 * @param {ObjectId} userId
 * @param {ObjectId} invoiceId
 * @returns {Promise<User>}
 */
const deleteInvoiceById = async (userId, invoiceId) => {
  const invoice = await getInvoiceById(userId, invoiceId);
  if (!invoice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invoice not found');
  }
  await invoice.remove();
  return invoice;
};

module.exports = {
  createInvoice,
  queryInvoicesByUserId,
  getInvoiceById,
  updateInvoiceById,
  deleteInvoiceById,
};
