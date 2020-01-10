const { Router } = require('express');
const router = Router();


const PageController = require('../Controllers/PageController');


router.get('/', PageController.getHome);

module.exports = router;
