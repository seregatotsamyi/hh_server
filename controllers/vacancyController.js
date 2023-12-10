const {Vacancies} = require("../models/models");
const ApiError = require("../error/ApiError");

class VacancyController {

    async get(req, res, next) {

        const {empId} = req.params

        try {
            let vacanciesCount

            if (empId) {

                vacanciesCount = await Vacancies.count({
                    where: {
                        employer_id: empId
                    },
                });

            } else {
                vacanciesCount = await Vacancies.count();
            }

            res.json(vacanciesCount)

        } catch (e) {
            return next(ApiError.badRequest(e))
        }

    }



}

module.exports = new VacancyController()