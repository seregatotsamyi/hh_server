require('dotenv').config()
const express = require('express')
const sequelize = require('./config/db')
const models = require('../server/models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandingMiddleware')
const path = require('path')
const {Vacancies, Settlements, Address, Duties_vacancies, Activities_vacancies, Views} = require("./models/models");

const PORT = process.env.PORT


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async ()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        // await Vacancies.sync({alter:true})
        //await Duties_vacancies.sync({alter:true})
        //await Activities_vacancies.sync({alter:true})
        // await Views.sync({alter:true})
        app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
    } catch (e){
        console.log(e)
    }


}

start()

