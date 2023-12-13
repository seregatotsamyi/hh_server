const Router = require('express')

const DutiesController = require('../controllers/dutiesController')

const router = new Router()


router.get('/:id*?', DutiesController.getDuties)


module.exports = router