const ApiError = require('../error/ApiError')
const {Kind_activities} = require('../models/models')


class activitiesController {

    async getActivities(req, res, next) {

        let {id} = req.params

        if (!id) {

            try {
                const data = await Kind_activities.findAll()
                return res.json(data)
            } catch (e) {
                return next(ApiError.badRequest(e))
            }

        } else {

            try {
                const data = await Kind_activities.findByPk(id)
                res.json(data)
            } catch (e) {
                return next(ApiError.badRequest(e))
            }

        }


    }


}

module.exports = new activitiesController()