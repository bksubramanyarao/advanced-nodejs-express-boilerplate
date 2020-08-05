const { Router } = require('express');
const router = Router();


const { isGuest, isUser } = require('./middleware');



const UserRegisterController = require('../Controllers/User/UserRegisterController');
const UserLoginController = require('../Controllers/User/UserLoginController');
const UserProfileController = require('../Controllers/User/UserProfileController');
const BlogPostController = require('../Controllers/BlogPostController');




router.get('/register', [isGuest], UserRegisterController.getRegisterIndex);
router.post('/register', [isGuest, UserRegisterController.postUserRegisterValidation], UserRegisterController.postUserRegister);

router.get('/login', [isGuest], UserLoginController.getLoginIndex);
router.post('/login', [isGuest, UserLoginController.postUserLoginValidation], UserLoginController.postUserLogin);

router.delete('/logout', [isUser], UserLoginController.deleteUserLogout);

router.get('/profile', [isUser], UserProfileController.getProfileIndex);



// start blog crud
router.get('/blog', [isUser, BlogPostController.getBlogIndexValidation], BlogPostController.getBlogIndex); // index
router.get('/blog/create', [isUser], BlogPostController.getBlogCreate); //  create
router.post('/blog', [isUser, BlogPostController.getBlogShowValidation], BlogPostController.postBlogStore); // store
router.get('/blog/:blog_id', [isUser, BlogPostController.getBlogShowValidation], BlogPostController.getBlogShow); // show
router.get('/blog/:blog_id/edit', [isUser, BlogPostController.getBlogEditValidation], BlogPostController.getBlogEdit); // edit
router.put('/blog/:blog_id', [isUser, BlogPostController.putBlogUpdateValidation], BlogPostController.putBlogUpdate); // update
router.delete('/blog/:blog_id', [isUser, BlogPostController.deleteBlogDestroyValidation], BlogPostController.deleteBlogDestroy); // destroy
// end blog crud









module.exports = router;
