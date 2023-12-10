const ApiError = require('../error/ApiError')
const {Applicants} = require('../models/models')
const {Op} = require("sequelize");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, login, role) => {
    return jwt.sign({id, login, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class ApplicantController {

    async login(req, res, next) {
        const {login, password, role} = req.body
        const applicant = await Applicants.findOne({where: {login}})
        if (!applicant) {
            return next(ApiError.internal("Пользователь с таким именем не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, applicant.password)

        if (!comparePassword) {
            return next(ApiError.internal("Указан неверный пароль"))
        }

        const token = generateJwt(applicant.id, applicant.login, role)
        return res.status(200).json({token})
    }

    async registration(req, res, next) {
        let {login, first_name, second_name, surname, password, phone, email, role} = req.body

        if (!login || !password) {
            return next(ApiError.badRequest("Некорректный login или [password]"))
        }
        if (!email) {
            email = null
        }

        const candidate = await Applicants.findOne({
            where: {
                [Op.or]: [
                    {login},
                    {phone}
                ]
            }
        })

        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким данными уже существует"))
        }

        try {
            const hashPassword = await bcrypt.hash(password, 5)
            const applicant = await Applicants.create({
                login,
                first_name,
                second_name,
                surname,
                password: hashPassword,
                phone,
                email
            })
            const token = generateJwt(applicant.id, applicant.login, role)
            return res.status(200).json({token})
        } catch (e) {
            if (e.name === "SequelizeUniqueConstraintError") {
                return next(ApiError.badRequest(e))
            }
        }
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }

    async get(req, res, next) {
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest("Не указан ID"))
        }
        try {
            const applicant = await Applicants.findOne({
                where: {id}
            })

            res.json(applicant)
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }

    async update(req, res, next) {
        const {login, id, email, first_name, phone, second_name, surname} = req.body

        if (!id) {
            return next(ApiError.badRequest("Нет id"))
        }

        try {
            await Applicants.update({login, email, first_name, phone, second_name, surname}, {
                where: {
                    id
                },
            });
            const applicant = await Applicants.findOne({where: {id}})
            return res.json(applicant)
        } catch (e) {
            return next(ApiError.badRequest(e))
        }


    }


}

module.exports = new ApplicantController()