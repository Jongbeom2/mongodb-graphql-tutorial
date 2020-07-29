const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD } = process.env;
const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.it8ob.mongodb.net/tutorial?retryWrites=true&w=majority`;
// Connect to mongoDB
module.exports = () => {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB Connected')
  }).catch(err => {
    console.log(err);
  });
}