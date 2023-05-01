const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router.post('/signup', userController.sign_up_user);
router.post('/login',userController.login_in_user);
router.delete('/:userId', userController.delete_user)

module.exports = router;
