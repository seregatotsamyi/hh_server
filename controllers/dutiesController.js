const ApiError = require('../error/ApiError')
const {Duties} = require('../models/models')


class DutiesController {

    async getDuties(req, res, next) {

        let {id} = req.params

        if (!id) {

            try {
                const data = await Duties.findAll()
                return res.json(data)
            } catch (e) {
                return next(ApiError.badRequest(e))
            }

        } else {

            try {
                const data = await Duties.findByPk(id)
                res.json(data)
            } catch (e) {
                return next(ApiError.badRequest(e))
            }

        }


    }


}

module.exports = new DutiesController()