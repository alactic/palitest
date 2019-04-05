const express = require('express');
const router = express.Router();
const userController = require('../controllers/meal')

router.post('/',  userController.PostMeal);
module.exports = router;