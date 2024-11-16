require('dotenv').config();

const dbconnect = () => {
    mongoose.connect("mongodb://localhost:27017/nutri", {})
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('Database not connected:', error);
    });
};

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
