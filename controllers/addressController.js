const ApiError = require('../error/ApiError')
const sequelize = require('sequelize');
const {Settlements, Streets} = require('../models/models')



class AddressController {

    async getSettlements(req, res, next) {

        let {stroke} = req.params
        stroke = stroke.toLowerCase()
        if (!stroke) {
            return res.json("Нет параметра для поиска")
        }

        try {

            const data = await Settlements.findAll({
                where: {
                    settlement: sequelize.where(sequelize.fn('LOWER', sequelize.col('settlement')), 'LIKE', '%' + stroke + '%')
                }
            })

            res.json(data)
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }

    async getStreet(req, res, next) {

        let {stroke} = req.params
        stroke = stroke.toLowerCase()
        if (!stroke) {
            return res.json("Нет параметра для поиска")
        }

        try {

            const data = await Streets.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + stroke + '%')
                }
            })

            res.json(data)
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }

}

module.exports = new AddressController()