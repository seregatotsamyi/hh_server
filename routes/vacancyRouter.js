const Router = require("express");
const vacancyController = require('./../controllers/vacancyController')

const router = new Router()

router.post('/create', vacancyController.create)
router.get('/count', vacancyController.count)
router.get('/count/:empId', vacancyController.count)
router.get('/', vacancyController.get)
router.get('/item/:id', vacancyController.getItem)
router.get('/post/:stroke', vacancyController.getPost)
router.get('/post/', vacancyController.getPost)
router.get('/delete/:id', vacancyController.deleteItem)


module.exports = router