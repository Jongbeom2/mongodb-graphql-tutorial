const express = require('express');
const router = express.Router();
const {startSession} = require('mongoose');
const Transaction1 = require('../models/transaction1');
const Transaction2 = require('../models/transaction2');
router.post('/success', async(req,res,next)=>{
  const session = await startSession();
  try{
    session.startTransaction();
    const transaction1 = new Transaction1({
      title : 'title1',
      content: 'content1'
    })
    const transaction2 = new Transaction2({
      title : 'title2',
      content: 'content2'
    })
    await transaction1.save({ session });
    await transaction2.save({ session });
    await session.commitTransaction();
    return res.send({result:true,message:'transaction1, transaction2 저장 성공'});
  }catch(error){
    await session.abortTransaction();
    next(error);
  }finally{
    await session.endSession();
  }
});
router.post('/fail', async(req,res,next)=>{
  const session = await startSession();
  try{
    session.startTransaction();
    const transaction1 = new Transaction1({
      title : 'title1',
      content: 'content1'
    })
    const transaction2 = new Transaction2({
      title : 'title2',
      content: 'content2'
    })
    await transaction1.save({ session });
    throw new Error('Error before transaction2');
    await transaction2.save({ session });
    await session.commitTransaction();
    return res.send({result:true,message:'transaction1, transaction2 저장 성공'});
  }catch(error){
    await session.abortTransaction();
    next(error);
  }finally{
    await session.endSession();
  }
});
module.exports = router;