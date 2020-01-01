const { createUser, searchUser, login } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../middleware/jwt.middleware');

router.post('/', createUser);
router.get('/:email', checkToken, searchUser);
router.post('/auth', login);
module.exports = router;