const express = require('express');
const router = express.Router();

//for middleware
const checkAuth = require('../middleware/check-auth');
//for controller
const UsersController = require('../controller/users')

router.post('/signup', UsersController.users_signup);

router.post('/login', UsersController.users_login);

router.delete('/:id', checkAuth, UsersController.users_delete);

module.exports = router;