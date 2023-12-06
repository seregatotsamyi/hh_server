const Router = require('express')

const addressController = require('../controllers/addressController')

const router = new Router()


router.get('/settlements/:stroke', addressController.getSettlements)
router.get('/settlements/', addressController.getSettlements)

router.get('/street/:stroke', addressController.getStreet)
router.get('/street/', addressController.getStreet)

module.exports = router