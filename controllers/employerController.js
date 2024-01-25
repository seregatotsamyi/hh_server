const ApiError = require('../error/ApiError')
const {Employers, Address, Streets, Settlements, Applicants} = require("../models/models");
const {Op} = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateJwt = (id, login, role) => {
    return jwt.sign({id, login, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class EmployerController {
    async registration(req, res, next) {

        let {login, name_company, email, password, phone, short_name, address} = req.body
        console.log(req.body)
        if (!login || !password) {
            return next(ApiError.badRequest("Некорректный login или [password]"))
        }

        if (!short_name) {
            short_name = null
        }

        const candidate = await Employers.findOne({
            where: {
                [Op.or]: [
                    {login},
                    {email}
                ]
            }
        })

        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким данными уже существует"))
        }

        try {

            const hashPassword = await bcrypt.hash(password, 5)

            const addressItem = await Address.create({
                number_house: address.house,
                region: address.region,
                region_type: address.region_type,
                region_with_type: address.region_with_type,
                street_with_type: address.street_with_type,
                city: address.city,
                index: address.index,
                country: address.country
            })

            const employers = await Employers.create({
                login,
                name_company,
                password: hashPassword,
                phone,
                email,
                short_name,
                address_id: addressItem.id
            })

            const token = generateJwt(employers.id, employers.login, "employers")

            return res.status(200).json({token})

        } catch (e) {
            if (e.name === "SequelizeUniqueConstraintError") {
                return next(ApiError.badRequest(e))
            }
            if (e.name === "SequelizeDatabaseError") {
                return next(ApiError.badRequest(e))
            }
            return next(ApiError.badRequest(e))
            console.log(e)
        }
    }

    async login(req, res, next) {
        const {login, password, role} = req.body
        const employer = await Employers.findOne({where: {login}})
        if (!employer) {
            return next(ApiError.internal("Пользователь с таким именем не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, employer.password)

        if (!comparePassword) {
            return next(ApiError.internal("Указан неверный пароль"))
        }

        const token = generateJwt(employer.id, employer.login, role)
        return res.status(200).json({token})
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
            const employer = await Employers.findOne({
                where: {id}
            })

            res.json(employer)
        } catch (e){
            return next(ApiError.badRequest(e))
        }
    }

    async update(req, res, next){
        const {login, id, email, name, phone, short_name} = req.body

        if (!id){
            return next(ApiError.badRequest("Нет id"))
        }

        try {
            await Employers.update({login, email, name, phone, short_name}, {
                where: {
                    id
                },
            });
            const employer = await Employers.findOne({where: {id}})
            return res.json(employer)
        }
        catch (e){
            return next(ApiError.badRequest(e))
        }


    }
}

module.exports = new EmployerController()