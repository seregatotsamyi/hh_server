const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        //console.error(err.stack);
        res.status(err.status).json({ message: err.message})
        return next(err.message)
    }
    res.status(500).json({message: "Непредвиденная ошибка!"})
    return next(err)
}