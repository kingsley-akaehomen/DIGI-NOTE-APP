const { logEvents } = require('../middlewares/logger')

const errorHandler = (err, req, res, next) => {

    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log({stack: err.stack})

    const statusCode = res.statusCode ? res.statusCode : 500 // server error 

    const errorDetails = {
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
        status: statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : Null
    };


    res
        .status(statusCode)
        .json(errorDetails)

}


module.exports = errorHandler 