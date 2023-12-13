const Router = require('express')

const activitiesController = require('../controllers/activitiesController')

const router = new Router()


router.get('/:id*?', activitiesController.getActivities)


module.exports = router