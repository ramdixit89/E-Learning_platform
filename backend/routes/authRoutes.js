const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
authRouter.post('/forgotPassword', authController.forgotPassword);
authRouter.post('/resetPassword', authController.resetPassword);
authRouter.get('/allUsers', verifyToken, verifyAdmin, authController.getAllUsers); // Admin only
authRouter.get('/singleUser/:userId', verifyToken, authController.getSingleUser);
authRouter.put('/role/:userId', verifyToken, verifyAdmin, authController.updateUserRole);

module.exports = authRouter;
