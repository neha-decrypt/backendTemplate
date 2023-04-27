const { UserController } = require('../controllers/user.controller');
const { verifytoken } = require('../middleware/auth.middleware');


const router = require('express').Router();

// router.get('/', verifytoken, UserController);

module.exports = router;
