const Router = require('express')

const genderController = require('../controllers/genderController')

const router = new Router()


router.get('/:id*?', genderController.getGender)


module.exports = router