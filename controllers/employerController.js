const ApiError = require('../error/ApiError')
const {Employers, Address, Streets, Settlements} = require("../models/models");
const {Op} = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateJwt = (id, login, role) => {
    return  jwt.sign({id, login, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class EmployerController {
    async registration(req, res, next) {
        let {login, name, email, password, phone, settlements_id, street_id, number_house, role, short_name} = req.body

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

            const employers = await Employers.create({
                login,
                name,
                password: hashPassword,
                phone,
                email,
                short_name,
            })
            const address = await Address.create({
                id: employers.id,
                number_house,
                settlement_id: settlements_id,
                street_id
            })
            address.set(address)
            const token = generateJwt(employers.id, employers.login, role)
            return res.status(200).json({token})
        } catch (e) {
            if (e.name === "SequelizeUniqueConstraintError") {
                return next(ApiError.badRequest(e))
            }
            if (e.name === "SequelizeDatabaseError") {
                return next(ApiError.badRequest(e))
            }
            console.log(e)
        }
    }

    async login(req, res, next) {

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