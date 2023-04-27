const router = require('express').Router();
const authRoutes = require('./router/auth.routes');
const userRoutes = require('./router/user.routes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;