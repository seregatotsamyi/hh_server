const ApiError = require('../error/ApiError')

class EmployerController {
    async registration(req, res) {
        res.json({message: "321213"})
    }

    async login(req, res) {

    }

    async check(req, res) {
        res.json({message: "check"})
    }

    async get(req, res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest("Не указан ID"))
        }
        res.json(id)
    }
}

module.exports = new EmployerController()