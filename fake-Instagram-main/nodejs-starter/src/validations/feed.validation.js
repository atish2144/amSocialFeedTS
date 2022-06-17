const Joi = require('joi');

const createFeed = {
        body: Joi.object().keys({
        Image: Joi.array(),
        caption: Joi.string().required(),
        CreatedBy: Joi.string()
  }),
};

const getFeeds = {
    query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const likeFeed={
  body: Joi.object().keys({
    userId: Joi.string()
}),
}

const likecomment={
  body: Joi.object().keys({
    commentid:Joi.string()
}),
}

const commentFeed={
  body: Joi.object().keys({
    comment: Joi.string().required(),
}),
}

const Feedcommentreply={
  body: Joi.object().keys({
    comment: Joi.string().required(),
}),
}


const Saveprofile={
  body: Joi.object().keys({
    userId: Joi.string()
})}

const Saveimage={
  body: Joi.object().keys({
    FeedId: Joi.string()
})}

module.exports = {
  createFeed,
  getFeeds,
  likeFeed,
  commentFeed,
  Feedcommentreply,
  Saveprofile,
  Saveimage,
  likecomment
};
