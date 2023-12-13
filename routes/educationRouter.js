const Router = require('express')

const educationController = require('../controllers/educationController')

const router = new Router()


router.get('/:id*?', educationController.getEducation)


module.exports = router