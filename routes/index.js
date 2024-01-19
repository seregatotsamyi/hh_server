const Router = require('express')
const employerRouter = require('./employerRouter')
const applicantRouter = require('./applicantRouter')
const vacancyRouter = require('./vacancyRouter')
const genderRouter = require('./genderRouter')
const educationRouter = require('./educationRouter')

const router = new Router()

router.use('/applicant', applicantRouter)
router.use('/employer', employerRouter)
router.use('/vacancy', vacancyRouter)
router.use('/gender', genderRouter)
router.use('/education', educationRouter)





module.exports = router