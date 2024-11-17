require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT,
    },
    jwt: {
        secret: process.env.JET_SECRET || 'notaSecreta!'
    },
    mongo: {
        db: process.env.MONGODB,
    }
}
