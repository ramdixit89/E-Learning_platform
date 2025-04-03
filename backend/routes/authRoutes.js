const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
authRouter.get('/allUsers', verifyToken, verifyAdmin, authController.getAllUsers); // Admin only
authRouter.get('/singleUser/:userId', verifyToken, authController.getSingleUser);

module.exports = authRouter;
