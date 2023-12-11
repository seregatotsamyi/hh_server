const {Vacancies, Activities_vacancies, Duties_vacancies} = require("../models/models");
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

    async create(req, res, next) {
        let {
            emp_id,
            name,
            age_lower,
            age_upper,
            payment_lower,
            payment_upper,
            registration_work_book,
            availability_social_package,
            communication_skills,
            start_date,
            end_date,
            gender_id,
            education_id,
            duties_array,
            kind_activities_array
        } = req.body

        if (age_lower > age_upper || payment_lower > payment_upper) {
            return next(ApiError.badRequest("Плохая граница возраста или оплаты"))
        }

        try {

            const vacancy = await Vacancies.create({
                employer_id: emp_id,
                name,
                age_lower,
                age_upper,
                payment_lower,
                payment_upper,
                registration_work_book,
                availability_social_package,
                communication_skills,
                start_date,
                end_date,
                gender_id,
                education_id
            })

            let activities_kind = []

            for (let i = 0; i < kind_activities_array.length; i++) {
                activities_kind.push({
                    vacancy_id: vacancy.id,
                    activity_id: kind_activities_array[i]
                })
            }

            const activitiesVacanciesTable = await Activities_vacancies.bulkCreate(activities_kind)

            let duties = []

            for (let i = 0; i < duties_array.length; i++) {
                duties.push({
                    vacancy_id: vacancy.id,
                    duties_id: duties_array[i]
                })
            }

            const dutiesTable = await Duties_vacancies.bulkCreate(duties)


            res.json(vacancy)

        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }


    }


}

module.exports = new VacancyController()