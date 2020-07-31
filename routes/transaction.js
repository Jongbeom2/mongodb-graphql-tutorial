const express = require('express');
const router = express.Router();
const {startSession} = require('mongoose');
const Content1 = require('../models/content1');
const Content2 = require('../models/content2');
router.post('/success', async(req,res,next)=>{
  const session = await startSession();
  try{
    session.startTransaction();
    const content1 = new Content1({
      title : 'title1',
      content: 'content1'
    })
    const content2 = new Content2({
      title : 'title2',
      content: 'content2'
    })
    await content1.save({ session });
    await content2.save({ session });
    await session.commitTransaction();
    return res.send({result:true,message:'Content1, Content2 저장 성공'});
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
    const content1 = new Content1({
      title : 'title1',
      content: 'content1'
    })
    const content2 = new Content2({
      title : 'title2',
      content: 'content2'
    })
    await content1.save({ session });
    throw new Error('Error before Content2');
    await content2.save({ session });
    await session.commitTransaction();
    return res.send({result:true,message:'Content1, Content2 저장 성공'});
  }catch(error){
    await session.abortTransaction();
    next(error);
  }finally{
    await session.endSession();
  }
});
module.exports = router;