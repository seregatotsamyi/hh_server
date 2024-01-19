const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')


const Employers = sequelize.define('employers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,

    },
    name_company: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(128),
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
    },
    about: {
        type: DataTypes.STRING(3000)
    }
}, {timestamps: false})

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
    region: {
        type: DataTypes.STRING(200)
    },
    region_type: {
        type: DataTypes.STRING(30)
    },
    region_with_type: {
        type: DataTypes.STRING(220)
    },
    street_with_type: {
        type: DataTypes.STRING(300)
    },
    city: {
        type: DataTypes.STRING(100)
    },
    index: {
        type: DataTypes.INTEGER
    },
    country: {
        type: DataTypes.STRING(100)
    },


}, {
    freezeTableName: true,
    timestamps: false
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
        allowNull: false,
    },
    about: {
        type: DataTypes.STRING(1000),
    },
}, {
    timestamps: false
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
    payment_upper: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_lower: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    experience: {
        type: DataTypes.INTEGER,
    }


})

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

const Specializations = sequelize.define("specializations", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    specialization: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    timestamps: false
})

const Specialization_resumes = sequelize.define("specialization_resumes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },

}, {timestamps: false})

const Specialization_vacancies = sequelize.define("specialization_vacancies", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },

}, {timestamps: false})

const Schedules = sequelize.define("schedules", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    schedule: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    timestamps: false
})

const Schedules_vacancies = sequelize.define("schedules_vacancies", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },

}, {timestamps: false})

const Schedules_resumes = sequelize.define("schedules_resumes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },

}, {timestamps: false})

const Views_vacancies = sequelize.define("views_vacancies", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        count_views: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false
    }
)
const Views_resumes = sequelize.define("views_resumes", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        count_views: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false
    }
)

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

const Resumes = sequelize.define('resumes', {
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
    about: {
        type: DataTypes.STRING(2000),
        allowNull: false,
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
})


const Skills = sequelize.define("skills", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    skill: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true
    }
}, {timestamps: false})

const Skills_vacancies = sequelize.define("skills_vacancies", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },

}, {timestamps: false})

const Skills_resumes = sequelize.define("skills_resumes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },

}, {timestamps: false})

const Favourites_vacancies = sequelize.define("favourites_vacancies", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    }
}, {timestamps: false})


Address.belongsTo(Employers, {foreignKey: "user_id"})
Employers.hasOne(Address, {foreignKey: "user_id"})

Address.belongsTo(Applicants, {foreignKey: "user_id"})
Applicants.hasOne(Address, {foreignKey: "user_id"})

Employers.hasMany(Vacancies, {foreignKey: "employer_id"})
Vacancies.belongsTo(Employers, {foreignKey: "employer_id"})

Genders.hasMany(Vacancies, {foreignKey: "gender_id"})
Vacancies.belongsTo(Genders, {foreignKey: "gender_id"})

Genders.hasMany(Applicants, {foreignKey: "gender_id"})
Applicants.belongsTo(Genders, {foreignKey: "gender_id"})

Educations.hasMany(Vacancies, {foreignKey: "education_id"})
Vacancies.belongsTo(Educations, {foreignKey: "education_id"})

Educations.hasMany(Applicants, {foreignKey: "education_id"})
Applicants.belongsTo(Educations, {foreignKey: "education_id"})

Applicants.hasMany(Resumes, {foreignKey: "applicant_id"})
Resumes.belongsTo(Applicants, {foreignKey: "applicant_id"})

Resumes.hasMany(Views_resumes, {foreignKey: "resume_id"})
Views_resumes.belongsTo(Resumes, {foreignKey: "resume_id"})

Vacancies.hasMany(Views_vacancies, {foreignKey: "vacancy_id"})
Views_vacancies.belongsTo(Vacancies, {foreignKey: "vacancy_id"})

Skills.hasMany(Skills_vacancies, {foreignKey: "skill_id"})
Skills_vacancies.belongsTo(Skills, {foreignKey: "skill_id"})

Vacancies.hasMany(Skills_vacancies, {foreignKey: "vacancy_id", onDelete: 'CASCADE'})
Skills_vacancies.belongsTo(Vacancies, {foreignKey: "vacancy_id"})

Skills.hasMany(Skills_resumes, {foreignKey: "skill_id"})
Skills_resumes.belongsTo(Skills, {foreignKey: "skill_id"})

Resumes.hasMany(Skills_resumes, {foreignKey: "resume_id", onDelete: 'CASCADE'})
Skills_resumes.belongsTo(Resumes, {foreignKey: "resume_id"})

Applicants.hasMany(Favourites_vacancies, {foreignKey: "applicant_id", onDelete: 'CASCADE'})
Favourites_vacancies.belongsTo(Applicants, {foreignKey: "applicant_id"})

Vacancies.hasMany(Favourites_vacancies, {foreignKey: "vacancy_id", onDelete: 'CASCADE'})
Favourites_vacancies.belongsTo(Vacancies, {foreignKey: "vacancy_id"})

Specializations.hasMany(Specialization_resumes, {foreignKey: "specialization_id"})
Specialization_resumes.belongsTo(Specializations, {foreignKey: "specialization_id"})

Specializations.hasMany(Specialization_vacancies, {foreignKey: "specialization_id"})
Specialization_vacancies.belongsTo(Specializations, {foreignKey: "specialization_id"})

Resumes.hasMany(Specialization_resumes, {foreignKey: "resume_id", onDelete: 'CASCADE'})
Specialization_resumes.belongsTo(Resumes, {foreignKey: "resume_id"})

Vacancies.hasMany(Specialization_vacancies, {foreignKey: "vacancy_id", onDelete: 'CASCADE'})
Specialization_vacancies.belongsTo(Vacancies, {foreignKey: "vacancy_id"})

Schedules.hasMany(Schedules_resumes, {foreignKey: "schedules_id"})
Schedules_resumes.belongsTo(Schedules, {foreignKey: "schedules_id"})

Schedules.hasMany(Schedules_vacancies, {foreignKey: "schedules_id"})
Schedules_vacancies.belongsTo(Schedules, {foreignKey: "schedules_id"})

Resumes.hasMany(Schedules_resumes, {foreignKey: "resume_id", onDelete: 'CASCADE'})
Schedules_resumes.belongsTo(Resumes, {foreignKey: "resume_id"})

Vacancies.hasMany(Schedules_vacancies, {foreignKey: "vacancy_id", onDelete: 'CASCADE'})
Schedules_vacancies.belongsTo(Vacancies, {foreignKey: "vacancy_id"})

module.exports = {
    Employers,
    Address,
    Applicants,
    Vacancies,
    Genders,
    Educations,
    Views_vacancies,
    Skills,
    Skills_vacancies,
    Skills_resumes,
    Resumes,
    Views_resumes,
    Favourites_vacancies,
    Schedules_resumes,
    Schedules_vacancies,
    Schedules,
    Specialization_resumes,
    Specialization_vacancies,
    Specializations
}