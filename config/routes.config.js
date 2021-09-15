const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

//--USERS SECTION--
router.post('/users', usersController.create)
router.get('/users/me', usersController.get)

//Auth 
router.post('/login', usersController.authenticate)
router.post('/logout',authMiddleware.isAuthenticated, usersController.logout)

module.exports = router;