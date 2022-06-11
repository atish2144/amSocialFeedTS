const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const  feedController=require("../controllers/feed.controller")
const MultiImg = require("../middlewares/Multi-Img")
const  FeedValidation=require("../validations/feed.validation")
const router = express.Router();

router.use(auth());

// http://localhost:8080/feeds/?page=1&limit=10
// Routes: get feed, create feed

router
  .route('/')
  .post(MultiImg.multiImage, validate(FeedValidation.createFeed),feedController.createFeed)
  .get( validate(FeedValidation.getFeeds),feedController.getFeed);


  router
  .route('/like/:feedId')
  .patch(validate(FeedValidation.likeFeed),feedController.LikeFeed)


  router
  .route('/comment/:commentId')
  .patch( validate(FeedValidation.commentFeed),feedController.CommentFeed)



  module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Feed
 *   description: Feed management and retrieval
 */

/**
 * @swagger
 * /Feed:
 *   post:
 *     summary: Create a Feed
 *     description: Only feed post users.
 *     tags: [Feeds]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - caption
 *               - Image
 *             properties:
 *               caption:
 *                 type: string
 *               Image:
 *                 type: array
 *                 description: must be Array
 *             example:
 *               name: fake caption
 *               Image: {filename:fake@example.jpg}
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Feeds
 *     description: default can retrieve all feed.
 *     tags: [Feeds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         schema:
 *           type: string
 *         description: User  find feed
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */


