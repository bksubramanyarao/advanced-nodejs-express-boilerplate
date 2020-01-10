const { Router } = require('express');
const router = Router();


const { isGuest, isUser } = require('./middleware');



const UserRegisterController = require('../Controllers/User/UserRegisterController');
const UserLoginController = require('../Controllers/User/UserLoginController');
const UserProfileController = require('../Controllers/User/UserProfileController');




router.get('/register', [isGuest], UserRegisterController.getRegisterIndex);
router.post('/register', [isGuest, UserRegisterController.postUserRegisterValidation], UserRegisterController.postUserRegister);

router.get('/login', [isGuest], UserLoginController.getLoginIndex);
router.post('/login', [isGuest, UserLoginController.postUserLoginValidation], UserLoginController.postUserLogin);

router.delete('/logout', [isUser], UserLoginController.deleteUserLogout);

router.get('/profile', [isUser], UserProfileController.getProfileIndex);

module.exports = router;
