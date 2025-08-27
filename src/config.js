require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 3002,
    },
    jwt: {
        secret: process.env.JET_SECRET || 'notaSecreta!'
    },
    mongo: {
        db: process.env.MONGODB || 'mongodb+srv://read-write:nutripob@cluster0.aacbi.mongodb.net/nutri?retryWrites=true&w=majorityc',
    }
}
