const Router = require('express')
const employerController = require('../controllers/employerController')
const router = new Router()

router.post('/registration', employerController.registration)
router.post('/login', employerController.login)
router.get('/auth', employerController.check)
router.get('/:id' , employerController.get)

module.exports = router