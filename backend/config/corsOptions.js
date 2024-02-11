const allowedOrigins = require('./allowedOrigins.js')

/*const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { 
            //ensures that the person accessing the backend rest api is validated, or if they dont have an origin, like postman or desktop app
            callback(null, true)
        } 
        else {
            callback(new Error('Not allowed by CORS'))
        }
    }, 
    credentials: true,
    optionSuccessStatus: 200,
}*/
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

module.exports = corsOptions