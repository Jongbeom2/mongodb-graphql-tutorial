const express = require('express');
const router = express.Router();
const { startSession } = require('mongoose');
const User1 = require('../models/user1');
const Booking1 = require('../models/booking1');
router.get('/booking1', async (req, res, next) => {
  try {
    const user1 = await User1.findById('5f24091455f19610689ac5e4');
    const booking1Ids = user1.bookings;
    const bookings = await Booking1.find({ '_id': { $in: booking1Ids } });
    return res.send({ result: true, bookings, message: 'user1의 booking1 조회 성공' });
  } catch (error) {
    next(error);
  }
});
router.get('/user', async (req, res, next) => {
  try {
    const user1 = await User1.findById('5f24091455f19610689ac5e4').populate('bookings', ['name', 'createdAt']);
    return res.send({ result: true, user1, message: 'user1와 booking1 조회 성공' });
  } catch (error) {
    next(error);
  }
});
router.post('/booking1', async (req, res, next) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const booking1 = new Booking1({
      name: 'title1',
    })
    await booking1.save({ session });
    await User1.findByIdAndUpdate('5f24091455f19610689ac5e4', { $push: { bookings: booking1 } }, { session: session, useFindAndModify: false });
    await session.commitTransaction();
    return res.send({ result: true, message: 'user1에 booking1 저장 성공' });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
});
router.post('/user1', async (req, res, next) => {
  try {
    const user1 = new User1({
      name: 'user1',
    })
    await user1.save();
    return res.send({ result: true, message: 'user1 저장 성공' });
  } catch (error) {
    next(error);
  }
});
module.exports = router;