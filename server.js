const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv").config();
const { logger, logEvents } = require("./middlewares/logger.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const corsOptions = require("./config/corsOptions.js")
const errorHandler = require("./middlewares/errorHandler.js");
const PORT = process.env.PORT || 3500

//Calling DATABASE FUNCTION
connectDB();

//calling the logger function
app.use(logger)

//Middlewares
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(cors(corsOptions));

//Home route
app.use("/", require("./routes/root.js"));

//When a request is not routed properly - Invalid route 
app.all('*', (req, res) => {
    res.status(404)

    if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
    // if (req.accepts('html')) {
    //     res.sendFile(path.join(__dirname, 'views', '404.html'))
    // } else if (req.accepts('json')) {
    //     res.json({ message: '404 Not Found' })
    // } else {
    //     res.type('txt').send('404 Not Found')
    // }
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})



