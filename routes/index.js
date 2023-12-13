const Router = require('express')
const employerRouter = require('./employerRouter')
const addressRouter = require('./addressRouter')
const applicantRouter = require('./applicantRouter')
const vacancyRouter = require('./vacancyRouter')
const genderRouter = require('./genderRouter')
const educationRouter = require('./educationRouter')
const dutiesRouter = require('./dutiesRouter')
const activitiesRouter = require('./activitiesRouter')

const router = new Router()

router.use('/applicant', applicantRouter)
router.use('/employer', employerRouter)
router.use('/address', addressRouter)
router.use('/vacancy', vacancyRouter)
router.use('/gender', genderRouter)
router.use('/education', educationRouter)
router.use('/duties', dutiesRouter)
router.use('/activities', activitiesRouter)




module.exports = router