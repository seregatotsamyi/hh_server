const Router = require('express')
const applicantController = require('../controllers/applicantController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/registration', applicantController.registration)
router.post('/login', applicantController.login)
router.get('/auth', authMiddleware, applicantController.check)
router.get('/:id', applicantController.get)

module.exports = router