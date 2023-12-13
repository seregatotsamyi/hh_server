const ApiError = require('../error/ApiError')
const {Educations} = require('../models/models')


class educationController {

    async getEducation(req, res, next) {

        let {id} = req.params

        if (!id) {

            try {
                const data = await Educations.findAll()
                return res.json(data)
            } catch (e) {
                return next(ApiError.badRequest(e))
            }

        } else {

            try {
                const data = await Educations.findByPk(id)
                res.json(data)
            } catch (e) {
                return next(ApiError.badRequest(e))
            }

        }


    }


}

module.exports = new educationController()