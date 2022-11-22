const mongoose = require('mongoose');

const MONGO_URL =
    'mongodb+srv://19110049:19110049@cluster0.y4ryqsh.mongodb.net/?retryWrites=true&w=majority';

const mongooseConnect = () => mongoose.connect(MONGO_URL);

const mongooseDisconnect = () => mongoose.disconnect();

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

module.exports = {
    mongooseConnect,
    mongooseDisconnect,
};
