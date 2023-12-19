const sequelize = require('../config/db')
const {DataTypes, NumberDataTypeOptions} = require('sequelize')


const Streets = sequelize.define('streets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
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
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true
    }
}, {timestamps: false})

const Settlements = sequelize.define('settlements', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    settlement: {
        type: DataTypes.STRING(64),
        allowNull: false,
    }
}, {timestamps: false})

const SettlementsTypes = sequelize.define('settlements_types', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true
    }
}, {timestamps: false})

const Employers = sequelize.define('employers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,

    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(32),
        unique: true,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    short_name: {
        type: DataTypes.STRING(128)
    }
}, {timestamps: false,})

const Address = sequelize.define('address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        references: {
            model: Employers,
            key: 'id',
        }
    },
    number_house: {
        type: DataTypes.INTEGER
    },

}, {
    freezeTableName: true
})

const Applicants = sequelize.define('applicants', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    second_name: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(64),
    },
    login: {
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(32),
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(64),
        unique: true,
    },
})

const Vacancies = sequelize.define('vacancies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    age_upper: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
    age_lower: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
    payment_upper: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_lower: {
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
    communication_skills: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

}, {timestamps: false})

const Genders = sequelize.define("genders", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
    }
}, {
    timestamps: false
})

const Views = sequelize.define("views", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    count_view: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

const Educations = sequelize.define("educations", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    education_value: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
})

const Kind_activities = sequelize.define("kind_activities", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true
    }
}, {timestamps: false})

const Activities_vacancies = sequelize.define('activities_vacancies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },

}, {timestamps: false});

const Duties = sequelize.define("duties", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    duties_volume: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true
    }
}, {timestamps: false})

const Duties_vacancies = sequelize.define("duties_vacancies", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },

}, {timestamps: false})


Address.belongsTo(Employers, {foreignKey: "id"})
Employers.hasOne(Address, {foreignKey: "id"})

Employers.hasMany(Vacancies, {foreignKey: "employer_id"})
Vacancies.belongsTo(Employers, {foreignKey: "employer_id"})

StreetsTypes.hasMany(Streets, {foreignKey: 'street_type'})
Streets.belongsTo(StreetsTypes, {foreignKey: "street_type"})

Streets.hasMany(Address, {foreignKey: 'street_id'})
Address.belongsTo(Streets, {foreignKey: "street_id"})

SettlementsTypes.hasMany(Settlements, {foreignKey: 'settlement_type'})

Settlements.hasMany(Address, {foreignKey: 'settlement_id'})
Address.belongsTo(Settlements, {foreignKey: "settlement_id"})

Genders.hasMany(Vacancies, {foreignKey: "gender_id"})
Vacancies.belongsTo(Genders, {foreignKey: "gender_id"})

Educations.hasMany(Vacancies, {foreignKey: "education_id"})
Vacancies.belongsTo(Educations, {foreignKey: "education_id"})

Applicants.hasMany(Views, {foreignKey: "applicant_id"})
Views.belongsTo(Applicants, {foreignKey: "applicant_id"})

Vacancies.hasMany(Views, {foreignKey: "vacancy_id"})
Views.belongsTo(Vacancies, {foreignKey: "vacancy_id"})

Kind_activities.hasMany(Activities_vacancies, {foreignKey: "activity_id"})
Activities_vacancies.belongsTo(Kind_activities, {foreignKey: "activity_id"})

Vacancies.hasMany(Activities_vacancies, {foreignKey: "vacancy_id"})
Activities_vacancies.belongsTo(Vacancies, {foreignKey: "vacancy_id"})

Duties.hasMany(Duties_vacancies, {foreignKey: "duties_id"})
Duties_vacancies.belongsTo(Duties, {foreignKey: "duties_id"})

Vacancies.hasMany(Duties_vacancies, {foreignKey: "vacancy_id"})
Duties_vacancies.belongsTo(Vacancies, {foreignKey: "vacancy_id"})


module.exports = {
    Employers,
    Address,
    Applicants,
    Vacancies,
    Streets,
    StreetsTypes,
    SettlementsTypes,
    Settlements,
    Genders,
    Educations,
    Views,
    Kind_activities,
    Duties,
    Activities_vacancies,
    Duties_vacancies
}