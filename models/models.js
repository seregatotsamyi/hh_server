const {Sequelize} = require('sequelize')
const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')





const Address = sequelize.define('address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    number_house: {
        type: DataTypes.INTEGER
    },

}, {
    freezeTableName: true
})

const Streets = sequelize.define('streets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

const StreetsTypes = sequelize.define('streets_types', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

const Settlements = sequelize.define('settlements', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    settlement: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

const SettlementsTypes = sequelize.define('settlements_types', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

const Employers = sequelize.define('employers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
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

const Genders = sequelize.define("genders", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})


Employers.belongsTo(Address, {foreignKey: "address_id"})
Address.hasOne(Employers, {foreignKey: "address_id"})

Employers.hasMany(Vacancies)
Vacancies.belongsTo(Employers)

StreetsTypes.hasMany(Streets, {foreignKey: 'street_type'})
Streets.belongsTo(StreetsTypes , {foreignKey: "street_type"})

Streets.hasMany(Address, {foreignKey: 'street_id'})
Address.belongsTo(Streets , {foreignKey: "street_id"})

SettlementsTypes.hasMany(Settlements, {foreignKey: 'settlements_type'} )

Settlements.hasMany(Address, {foreignKey: 'settlements_id'})
Address.belongsTo(Settlements , {foreignKey: "settlements_id"})

Genders.hasMany(Vacancies, {foreignKey: "genders_id"})
Vacancies.belongsTo(Genders,{foreignKey: "genders_id"})

module.exports = {
    Employers,
    Address,
    Applicants,
    Vacancies,
    Streets,
    StreetsTypes,
    SettlementsTypes,
    Settlements,
    Genders
}