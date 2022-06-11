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


const commentFeed={
  body: Joi.object().keys({
    comment: Joi.string().required(),
}),
}


module.exports = {
  createFeed,
  getFeeds,
  likeFeed,
  commentFeed

};
