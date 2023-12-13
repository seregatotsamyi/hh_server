const ApiError = require('../error/ApiError')
const {Genders} = require('../models/models')


class GenderController {

    async getGender(req, res, next) {

        let {id} = req.params

        if (!id) {

            try {
                const data = await Genders.findAll()
                return res.json(data)
            } catch (e) {
                return next(ApiError.badRequest(e))
            }

        } else {

            try {
                const data = await Genders.findByPk(id)
                res.json(data)
            } catch (e) {
                return next(ApiError.badRequest(e))
            }

        }


    }


}

module.exports = new GenderController()