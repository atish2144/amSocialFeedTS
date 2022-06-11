const httpStatus = require('http-status');
const path = require('path');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');
const {
    feedService
  } = require('../services');
const logger = require('../config/logger');
  
const createFeed=catchAsync(async (req, res)=>{
  try{
  const feed = await feedService.createFeed({
    image:req.files.map(({filename,path})=>({filename,path})),
    caption:req.body.caption,
    deleted:false,
    CreatedBy:req.user._id,
  });
  res.status(httpStatus.CREATED).send(feed);
  }
  catch(err){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');
  }
})

const getFeed= catchAsync(async (req, res)=>{
  const filter = pick(req.query, ['caption']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await feedService.queryFeeds(filter, {
    ...options,
    populate: [{
      path: "CreatedBy",
      select: "_id name email"
    }]
  });
  res.send(result);

})
const LikeFeed=catchAsync(async(req,res)=>{
  // const data={userId:req.user._id}
  const feed = await (await feedService.LikeFeeds(req.params.feedId, req.user._id))
  res.send(feed);
});


const CommentFeed=catchAsync(async(req,res)=>{

  const feed = await (await feedService.CommentFeeds(req.params.commentId, {commentedBy: req.user._id, ...req.body}))
.populate({path: "Comment.commentedBy",select: "_id name email"})
  res.send(feed);
});


module.exports = {
    createFeed,
    getFeed,
    LikeFeed,
    CommentFeed
  };