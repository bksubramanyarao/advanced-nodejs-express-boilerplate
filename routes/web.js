const { Router } = require('express');
const router = Router();


const PageController = require('../Controllers/PageController');


router.get('/', PageController.getHome);
router.get('/about', PageController.getAbout);




module.exports = router;
