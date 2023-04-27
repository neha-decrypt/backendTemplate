const AuthController = require('../controllers/auth.controller');
const { UserController } = require('../controllers/user.controller');
const { verifytoken } = require('../middleware/auth.middleware');

const authController = new AuthController()
const router = require('express').Router();

// router.get('/', verifytoken, sessionManagement, AuthController.register);
router.post('/login', authController.login);
router.get('/profile', authController.profile)
// app.get('/profile', (req, res) => {
//     // retrieve session data from Redis and return user profile
//     const userId = req.session.userId;
//     // retrieve user data from your database based on userId
//     res.json({ username: userData.username, email: userData.email });
// });

module.exports = router;
