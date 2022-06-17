const httpStatus = require('http-status');
const logger = require('../config/logger');
const {Feed} = require('../models');
const {User} = require('../models');
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
// feed like
  const LikeFeeds=async (feedId, updatedata) => {
    const feed = await Feed.findById(feedId)
    if(!feed)
    {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');}
    
     let pos = -1;
   feed.like.map((ele, index) => (console.log(JSON.stringify(ele.likeBy)===JSON.stringify(updatedata.likeBy))));
  
  feed.like.map((ele, index) => (JSON.stringify(ele.likeBy)===JSON.stringify(updatedata.likeBy)) ? pos = index : "");

  // console.log(pos)
  if (feed.like.length === 0) { feed.like.push(updatedata) }
  else {
        pos !== -1 ? feed.like.splice(pos, 1) : feed.like.push(updatedata);
      }
    const saved = await feed.save();
   if(!saved)
    {throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');}
   return(saved)
 
  };

//  like comment
  const Likecomment=async (feedId,coomentid, updatedata) => {
    const feed = await Feed.findById(feedId)
    if(!feed)
    {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');}
     let pos = -1;

feed.Comment.map((data,index)=>console.log(JSON.stringify(data._id)===JSON.stringify(coomentid)))

  feed.Comment.map((data, index) => (JSON.stringify(data._id)===JSON.stringify(coomentid)) ? pos = index : "");

  console.log(pos)
  if (feed.Comment[pos].like.length === 0) { feed.Comment[pos].like.push(updatedata) }
  else {
        pos !== -1 ? feed.Comment[pos].like.splice(pos, 1) : feed.Comment[pos].like.push(updatedata);
      }
    const saved = await feed.save();
   if(!saved)
    {throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');}
   return(saved)

  };
// like reply
 const Likecommentreply=async (feedId,coomentid,replyid, updatedata) => {
  const feed = await Feed.findById(feedId)
  if(!feed)
  {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');}
    let pos = -1;
    feed.Comment.map((data, index) => (JSON.stringify(data._id)===JSON.stringify(coomentid)) ? pos = index : "");
  let rop=-1;
 
  feed.Comment[pos].reply.map((data1, index) => (JSON.stringify(data1._id)===JSON.stringify(replyid)) ? rop = index : "");
  
console.log(rop)
  console.log(pos)
    // feed.Comment[pos].reply.length>0 && feed.Comment[pos].reply.map((data,index)=>console.log(JSON.stringify(data._id)===JSON.stringify(replyid)))
  //  feed.Comment.reply.length>0 && feed.Comment.reply.map((data,index)=>console.log(JSON.stringify(data._id)===JSON.stringify(coomentid)))
// console.log(pos)
console.log(feed.Comment[pos].reply[rop].like)
console.log(feed.Comment[pos].reply.length)

if ( feed.Comment[pos].reply[rop].like.length === 0) { feed.Comment[pos].reply[rop].like.push(updatedata) }
else {
      pos !== -1 &&rop!==-1 ? feed.Comment[pos].reply[rop].like.splice(rop, 1) : feed.Comment[pos].reply[rop].like.push(updatedata);
    }

  const saved = await feed.save();
 if(!saved)
  {throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');}
 return(saved)
};

  const CommentFeeds=async (feedId, commentdata) => {
    const feed = await Feed.findById(feedId)
    if(!feed)
    {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');}
    feed.Comment.push(commentdata);
    const commSaved = await feed.save();
    if(!commSaved)
    {throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');}
     return commSaved
  };

  // reply comment
const Feedcommentreply=async (feedId,commentid,commentdata) => {
  const feed = await Feed.findById(feedId);
  if(!feed)
  {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');}
    feed.Comment.filter(data=>JSON.stringify(data._id)===JSON.stringify(commentid))[0].reply.push(commentdata) 
  const replycomment = await feed.save();
  if(!replycomment)
  {throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');}
   return replycomment
};

  const Saveprofile=async(UserId)=>{
    const FeedImage = await Feed.find({ 'CreatedBy': { $in: UserId } })
  if(!FeedImage)
  {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');}
 const img=[];
  FeedImage.map((ele)=>{
img.push(...ele.image)
  })
return img
  }


const SaveFeed=async(UserId,Feeddata )=>{
  const user = await User.findById(UserId)
  if(!user)
  {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');}
       let pos = -1;

user.Savedata.map((ele, index) => (JSON.stringify(ele.FeedId)===JSON.stringify(Feeddata.FeedId)) ? pos = index : "");
if (user.Savedata.length === 0) { user.Savedata.push(Feeddata) }
else {
      pos !== -1 ? user.Savedata.splice(pos, 1) : user.Savedata.push(Feeddata);
    }

  const saved = await user.save();
 if(!saved)
  {throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');}
 return(saved)
}




module.exports = {
    createFeed,
    queryFeeds,
    LikeFeeds,
    CommentFeeds,
    Feedcommentreply,
    Saveprofile,
    SaveFeed,
    Likecomment,
    Likecommentreply
,
  };



    // feed.like = feed.like.filter((obj) => JSON.stringify(obj._userId) === JSON.stringify(userId)).length > 0 ? product.like.filter((obj) =>  JSON.stringify(obj._userId) !== JSON.stringify(userId)) : [...product.like, { _userId: userId }]

  //   if (feed.like.length === 0) { feed.like.push(updatedata) } else {
  //     pos !== -1 ? feed.like.splice(pos, 1) : feed.like.push(updatedata);
  //   }