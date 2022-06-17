const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const path = require('path');
const catchAsync = require('../utils/catchAsync');

const {
  userService
} = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser({
    // _org: req.user._org,
    ...req.body
  });
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, {
    ...options,
    // populate: [{path: "Savedata.FeedId",select: "_id image caption comment like"}]
  });
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await (await userService.getUserById(req.params.userId))
     .populate({path: "Savedata.FeedId",select: "_id image caption comment like"});
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await (await userService.updateUserById(req.params.userId,req.body))
    // .populate("_org", "_id name email");
  res.send(user);
});

const updateProfilepic = catchAsync(async (req, res) => {
  const user = await (await userService.updateProfilepicById(req.params.userId,{Image:req.file.filename}))
  res.send(user);
});

// const updateOrg = catchAsync(async (req, res) => {
//   const org = await userService.updateOrgById(req.params.orgId, req.body);
//   res.send(org);
// });

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateProfilepic
};
