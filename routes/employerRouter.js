const Router = require('express')
const employerController = require('../controllers/employerController')
const authMiddleware = require("../middleware/authMiddleware");
const applicantController = require("../controllers/applicantController");
const router = new Router()

router.post('/registration', employerController.registration)
router.post('/login', employerController.login)
router.post('/update', employerController.update)
router.get('/auth', authMiddleware, applicantController.check)
router.get('/:id' , employerController.get)

module.exports = router