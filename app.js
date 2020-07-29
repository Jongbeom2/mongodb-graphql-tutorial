const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./models');
dbConnect();
const indexRouter = require('./routes');
const transactionRouter = require('./routes/transaction');
app.use('/', indexRouter);
app.use('/transaction', transactionRouter);
// set middleware - 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// set middleware - 500 error
app.use((err, req, res, next) => {
  if (!err.status) err.status = 500;
  res.status(err.status);
  res.send({
    status: err.status,
    message: err.message
  });
});
app.listen(process.env.PORT || 4000, () => console.log(`Server ready ${process.env.PORT || 4000}`));