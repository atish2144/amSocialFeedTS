const Joi = require('joi');
const { password, objectId } = require('./custom.validation');


// create new user
const createUser = {
    body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};


// All user 
const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};


// one user
const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};


// update user
const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      bio:Joi.string(),
      gender:Joi.string(),
      DateOfBirth:Joi.string(),
      mobile:Joi.string()
    })
    .min(1),
};

// 
const updateProfilepic = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      Image:Joi.string().required
    })
   
};

// const updateOrg = {
//   params: Joi.object().keys({
//     orgId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       email: Joi.string().email(),
//       name: Joi.string(),
//     })
//     .min(1),
// };

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateProfilepic,
  deleteUser,
};
