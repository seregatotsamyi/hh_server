const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')


const Employers = sequelize.define('employers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phone: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    short_name: {
        type: DataTypes.STRING
    }
})

const Address = sequelize.define('address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    number_house: {
        type: DataTypes.INTEGER
    }

})

const Applicants = sequelize.define('applicants', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    second_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
})

const Vacancies = sequelize.define('vacancies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estimated_payment: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    registration_work_book: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    availability_social_package: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

})

Employers.hasOne(Address)
Address.belongsTo(Employers)

Employers.hasMany(Vacancies)
Vacancies.belongsTo(Employers)

module.exports = {
    Employers,
    Address,
    Applicants,
    Vacancies
}