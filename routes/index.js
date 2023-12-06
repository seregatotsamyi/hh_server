const Router = require('express')
const employerRouter = require('./employerRouter')
const addressRouter = require('./addressRouter')
const applicantRouter = require('./applicantRouter')

const router = new Router()

router.use('/applicant', applicantRouter)
router.use('/employer', employerRouter)
router.use('/address', addressRouter)




module.exports = router