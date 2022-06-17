const httpStatus = require('http-status');
const path = require('path');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');
const {
  feedService
} = require('../services');

const logger = require('../config/logger');


// post feed 
const createFeed = catchAsync(async (req, res) => {
  try {
    const feed = await feedService.createFeed({
      image: req.files.map(({ filename, path }) => ({ filename, path })),
      caption: req.body.caption,
      deleted: false,
      CreatedBy: req.user._id,
    });
    res.status(httpStatus.CREATED).send(feed);
  }
  catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');
  }
})


// get all feed 
const getFeed = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['caption']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await feedService.queryFeeds(filter, {
    ...options,
    populate: [{
      path: "CreatedBy",
      select: "_id name email Image"
    },
    {
      path: "Comment.commentedBy",
      select: "_id name email Image"
    }
    ]
  });
  res.send(result);
})

// like feed 
const LikeFeed = catchAsync(async (req, res) => {
  // console.log(req.user._id)
  const feed = await (await feedService.LikeFeeds(req.params.feedId, { likeBy: req.user._id })).populate({ path: "like.likeBy", select: "_id name" });
  res.send(feed);
});

// like comment 
const Likecomment = catchAsync(async (req, res) => {
  const feed = await (await feedService.Likecomment(req.params.feedId, req.params.commentid, { likeBy: req.user._id }))
    .populate({ path: "Comment.like.likeBy", select: "_id name Image" });
  res.send(feed);
});
// reply like
const Likecommentreply = catchAsync(async (req, res) => {
  const feed = await (await feedService.Likecommentreply(req.params.feedId, req.params.commentid, req.params.replyid, { likeBy: req.user._id }))
  // .populate({path: "Comment.like.likeBy",select: "_id name Image"});
  res.send(feed);
});

// comment on feed
const CommentFeed = catchAsync(async (req, res) => {
  const feed = await (await feedService.CommentFeeds(req.params.commentId, { commentedBy: req.user._id, ...req.body }))
    .populate({ path: "Comment.commentedBy", select: "_id name Image" })
  res.send(feed);

});

// reply comment 
const Feedcommentreply = catchAsync(async (req, res) => {
  const feed = await (await feedService.Feedcommentreply(req.params.feedid, req.params.commentid, { likeBy: req.user._id, ...req.body }))
    .populate({ path: "Comment.reply.commentedBy", select: "_id name Image email" })
  res.send(feed);

});

// get all post you posted
const Saveprofile = catchAsync(async (req, res) => {
  const feed = await (await feedService.Saveprofile(req.user._id))
  res.send(feed);
})

// save feed in user account
const Saveimage = catchAsync(async (req, res) => {
  const savefeed = await (await feedService.SaveFeed(req.user._id, { FeedId: req.params.FeedID }))
    .populate({ path: "Savedata.FeedId", select: "_id image caption comment like" })
  res.send(savefeed);
})

module.exports = {
  createFeed,
  getFeed,
  LikeFeed,
  CommentFeed,
  Feedcommentreply,
  Saveprofile,
  Saveimage,
  Likecomment,
  Likecommentreply
};