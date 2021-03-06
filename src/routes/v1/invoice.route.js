const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const invoiceValidation = require('../../validations/invoice.validation');
const invoiceController = require('../../controllers/invoice.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(''), validate(invoiceValidation.createInvoice), invoiceController.createInvoice)
  .get(auth(''), validate(invoiceValidation.getInvoicesByUserId), invoiceController.getInvoicesByUserId);

router
  .route('/:invoiceId')
  .get(auth(''), validate(invoiceValidation.getInvoice), invoiceController.getInvoice)
  .patch(auth(''), validate(invoiceValidation.updateInvoice), invoiceController.updateInvoice)
  .delete(auth(''), validate(invoiceValidation.deleteInvoice), invoiceController.deleteInvoice);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice management and retrieval
 */

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Create an invoice
 *     description: Authenticated user can create invoice.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoiceNumber:
 *                 type: string
 *                 example: INV001
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2021-05-11
 *               issuer:
 *                  type: object
 *                  properties:
 *                    businessRegistrationNumber:
 *                      type: string
 *                    companyName:
 *                      type: string
 *                    email:
 *                      type: string
 *                      format: email
 *                    logo:
 *                      type: string
 *                    address:
 *                      type: object
 *                      properties:
 *                        street:
 *                          type: string
 *                        zipCode:
 *                          type: string
 *                        city:
 *                          type: string
 *                        state:
 *                          type: string
 *                  example:
 *                    businessRegistrationNumber: "201901000005"
 *                    companyName: Example Sdn Bhd
 *                    email: fake@example.com
 *                    address:
 *                      street: 88-16-07
 *                      zipCode: "11700"
 *                      city: Gelugor
 *                      state: Pulau Pinang
 *                    logo: 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
 *               recipient:
 *                 type: object
 *                 properties:
 *                   companyName:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   address:
 *                     type: object
 *                     properties:
 *                       street:
 *                         type: string
 *                       zipCode:
 *                         type: string
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                 example:
 *                   companyName: Example Sdn Bhd
 *                   email: fake@example.com
 *                   address:
 *                     street: 88-16-07
 *                     zipCode: "11700"
 *                     city: Gelugor
 *                     state: Pulau Pinang
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     rate:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                 example:
 *                   - description: Web Design Development
 *                     rate: 3200
 *                     quantity: 1
 *                   - description: Logo Design
 *                     rate: 800
 *                     quantity: 1
 *               paymentRecords:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: number
 *                     date:
 *                       type: string
 *                       format: date
 *                     method:
 *                       type: string
 *                     note:
 *                       type: string
 *                 example:
 *                  - amount: 4000
 *                    date: 2021-05-20
 *                    method: Bank Transfer
 *                    note: ""
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Invoice'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Get all invoices under the logged in user
 *     description: Only logged in user can retrieve their invoices.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Invoice'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Get an invoice
 *     description: Logged in users can fetch only their own invoices.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice id
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Invoice'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update an invoice
 *     description: Logged in users can only update their own invoice.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoiceNumber:
 *                 type: string
 *                 example: INV001
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2021-05-11
 *               issuer:
 *                  type: object
 *                  properties:
 *                    businessRegistrationNumber:
 *                      type: string
 *                    companyName:
 *                      type: string
 *                    email:
 *                      type: string
 *                      format: email
 *                    logo:
 *                      type: string
 *                    address:
 *                      type: object
 *                      properties:
 *                        street:
 *                          type: string
 *                        zipCode:
 *                          type: string
 *                        city:
 *                          type: string
 *                        state:
 *                          type: string
 *                  example:
 *                    businessRegistrationNumber: "201901000005"
 *                    companyName: Example Sdn Bhd
 *                    email: fake@example.com
 *                    address:
 *                      street: 88-16-07
 *                      zipCode: "11700"
 *                      city: Gelugor
 *                      state: Pulau Pinang
 *                    logo: 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
 *               recipient:
 *                 type: object
 *                 properties:
 *                   companyName:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   address:
 *                     type: object
 *                     properties:
 *                       street:
 *                         type: string
 *                       zipCode:
 *                         type: string
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                 example:
 *                   companyName: Example Sdn Bhd
 *                   email: fake@example.com
 *                   address:
 *                     street: 88-16-07
 *                     zipCode: "11700"
 *                     city: Gelugor
 *                     state: Pulau Pinang
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     rate:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                 example:
 *                   - description: Web Design Development
 *                     rate: 3200
 *                     quantity: 1
 *                   - description: Logo Design
 *                     rate: 800
 *                     quantity: 1
 *               paymentRecords:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: number
 *                     date:
 *                       type: string
 *                       format: date
 *                     method:
 *                       type: string
 *                     note:
 *                       type: string
 *                 example:
 *                  - amount: 4000
 *                    date: 2021-05-20
 *                    method: Bank Transfer
 *                    note: ""
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an invoice
 *     description: Logged in users can delete their own invoices.
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
