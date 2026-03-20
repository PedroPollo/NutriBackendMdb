require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 3002,
    },
    jwt: {
        secret: process.env.JET_SECRET || 'notaSecreta!'
    },
    mongo: {
        db: process.env.MONGODB || 'mongodb://127.0.0.1:27017/nutri',
    }
}
