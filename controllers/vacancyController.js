const {
    Vacancies,
    Activities_vacancies,
    Duties_vacancies,
    Genders,
    Employers,
    Address,
    Settlements,
    Educations, Duties, Kind_activities, Applicants
} = require("../models/models");
const ApiError = require("../error/ApiError");
const sequelize = require("sequelize");
const {Op} = require("sequelize");

class VacancyController {

    async count(req, res, next) {

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

        let dateStart = new Date(start_date)
        let date = new Date()
        const year = date.getFullYear()
        const day = date.getDate()
        const month = date.getMonth()
        let dateNow = new Date(Date.UTC(year, month, day))
        dateNow.setDate(day)

        if (dateStart < dateNow) {
            return next(ApiError.badRequest("Ошибка в дате"))
        }


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
            return next(ApiError.badRequest(e))
        }


    }

    async get(req, res, next) {
        let {page, count, id} = req.query
        const countPage = count
        const offsetNumber = page * countPage - countPage

        if (id) {

            try {

                // const {count, rows} = await Vacancies.findAndCountAll({
                //     include: [
                //         {
                //             model: Employers,
                //             attributes: ['name', 'id'],
                //             include: [
                //                 {
                //                     model: Address,
                //                     attributes: ['id'],
                //                     include: [
                //                         {
                //                             model: Settlements,
                //                             attributes: ['settlement'],
                //                         }
                //                     ],
                //                 }
                //             ],
                //         }
                //     ],
                //     where: {
                //         employer_id: id
                //     },
                //     offset: offsetNumber,
                //     limit: countPage
                // });

                let date = new Date()
                const year = date.getFullYear()
                const day = date.getDate()
                const month = date.getMonth()
                let dateNow = new Date(Date.UTC(year, month, day))

                for (let i = 0; i < rows.length; i++) {
                    let dateEnd = new Date(rows[i].end_date)
                    if (dateEnd < dateNow) {
                        rows[i].setDataValue("status", true)
                    } else {
                        rows[i].setDataValue("status", false)
                    }
                }

                let resultObj = {
                    "totalCount": count,
                    "vacanceis": rows
                }

                return res.json(resultObj)

            } catch (e) {
                return next(ApiError.badRequest(e))
            }

        } else {

            try {
                // const {count, rows} = await Vacancies.findAndCountAll({
                //     include: [
                //         {
                //             model: Employers,
                //             attributes: ['name', 'id'],
                //             include: [
                //                 {
                //                     model: Address,
                //                     attributes: ['id'],
                //                     include: [
                //                         {
                //                             model: Settlements,
                //                             attributes: ['settlement'],
                //                         }
                //                     ],
                //                 }
                //             ],
                //         }
                //     ],
                //     offset: offsetNumber,
                //     limit: countPage
                // });

                let date = new Date()
                const year = date.getFullYear()
                const day = date.getDate()
                const month = date.getMonth()
                let dateNow = new Date(Date.UTC(year, month, day))

                for (let i = 0; i < rows.length; i++) {
                    let dateEnd = new Date(rows[i].end_date)
                    if (dateEnd < dateNow) {
                        rows[i].setDataValue("status", true)
                    } else {
                        rows[i].setDataValue("status", false)
                    }


                }

                let resultObj = {
                    "totalCount": count,
                    "vacanceis": rows
                }


                return res.json(resultObj)

            } catch (e) {
                return next(ApiError.badRequest(e))
            }

        }


    }

    async getItem(req, res, next) {
        const {id} = req.params


        if (id) {

            try {

                const vacancy = await Vacancies.findByPk(id, {
                    include: [
                        {
                            model: Employers,
                            attributes: ['name', 'id'],
                            include: [
                                {
                                    model: Address,
                                    attributes: ['id'],
                                    include: [
                                        {
                                            model: Settlements,
                                            attributes: ['settlement'],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            model: Genders,
                        },
                        {
                            model: Educations
                        },
                    ],
                });
                let date = new Date()
                const year = date.getFullYear()
                const day = date.getDate()
                const month = date.getMonth()
                let dateNow = new Date(Date.UTC(year, month, day))
                let dateEnd = new Date(vacancy.end_date)
                if (dateEnd < dateNow) {
                    vacancy.setDataValue("status", true)
                } else {
                    vacancy.setDataValue("status", false)
                }


                const duties = await Duties_vacancies.findAll({
                    where: {vacancy_id: id},
                    include: Duties
                })
                const activities = await Activities_vacancies.findAll({
                    where: {vacancy_id: id},
                    include: Kind_activities
                })


                if (vacancy === null) {
                    return next(ApiError.badRequest("Отсутствует id"))
                } else {


                    let data = vacancy.toJSON();
                    data["activities"] = activities.map((item) => {
                        return item.kind_activity.name
                    })
                    data["duties"] = duties.map((item) => {
                        return item.duty.duties_volume
                    })
                    return res.json(data)
                }


            } catch (e) {
                return next(ApiError.badRequest(e))
            }

        }

        return next(ApiError.badRequest("Отсутствует id"))

    }

    async deleteItem(req, res, next) {
        const {id} = req.params

        if (!id) {
            return next(ApiError.badRequest("Отсутствует id"))
        }

        try {

            const deleteItem = await Vacancies.destroy( {
                where: {
                    id: id
                }
            });

            return res.json(deleteItem)

        } catch (e) {
            return next(ApiError.badRequest(e))
        }



    }

    async getPost(req, res, next) {

        let {stroke} = req.params
        stroke = stroke.toLowerCase()
        if (!stroke) {
            return res.json("Нет параметра для поиска")
        }

        try {

            const data = await Vacancies.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + stroke + '%')
                },
                attributes: ["id", "name"],

            })

            res.json(data)
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }

}

module.exports = new VacancyController()