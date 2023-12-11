const Router = require("express");
const vacancyController = require('./../controllers/vacancyController')

const router = new Router()

router.post('/create', vacancyController.create)
router.get('', vacancyController.get)
router.get('/:empId', vacancyController.get)

module.exports = router