const httpStatus = require('http-status');
const logger = require('../config/logger');
const {Feed} = require('../models');
const ApiError = require('../utils/ApiError');



// const getFeedById=(id)=>{
//   return Feed.findById(id);
// }

const createFeed=(feedBody)=>{
      return Feed.create(feedBody);
}


const queryFeeds=async (filter, options) => {
    const feeds = await Feed.paginate(filter, options);
    return feeds;
  };

  const LikeFeeds=async (feedId, updatedata) => {
  
    const feed = await Feed.findById(feedId)

    if(!feed)
    {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');}
    
    let pos = -1;
    feed.like.map((ele, index) => (console.log(ele,updatedata)));

    feed.like.map((ele, index) => (ele === updatedata) ? pos = index : "");

    if (feed.like.length === 0) { feed.like.push(updatedata) } else {
      pos !== -1 ? feed.like.splice(pos, 1) : feed.like.push(updatedata);
    }
    const saved = await feed.save();
   if(!saved)
    {throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');}
   return(saved)
  };

  const CommentFeeds=async (feedId, commentdata) => {
    const feed = await Feed.findById(feedId)
    if(!feed)
    {throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');}
    feed.Comment.push(commentdata);
    const commSaved = await feed.save();
    if(!commSaved)
    {throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');}
     return commSaved
  };




module.exports = {
    createFeed,
    queryFeeds,
    LikeFeeds,
    CommentFeeds
  };