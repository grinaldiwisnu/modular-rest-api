const { createProduct, getProduct } = require('./products.controller');
const router = require('express').Router();
const { checkToken } = require('../../middleware/jwt.middleware');

router.post('/', checkToken, createProduct);
router.get('/:id', checkToken, getProduct);

module.exports = router;