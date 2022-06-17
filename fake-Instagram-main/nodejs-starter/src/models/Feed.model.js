const mongoose = require("mongoose");
const { private, paginate, softDelete } = require("./plugins");
const validator = require("validator");
const { string } = require("joi");

const feedSchema = mongoose.Schema(
  {
    image: {
      type: Array,
      required: true,
    },
    caption: {
      type: String,
      required: true,
      trim: true,
    },
    like: [
      {
        likeBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    Comment: [
     { type: new mongoose.Schema(
      {
        like: [
          {
            likeBy: {
              type: mongoose.Types.ObjectId,
              ref: "User",
            },
          },
        ],
        comment: String,
        commentedBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        reply:[
        {  type: new mongoose.Schema(
          {
          like: [
            {
              likeBy: {
                type: mongoose.Types.ObjectId,
                ref: "User",
              },
            },
          ],
          comment: String,
           commentedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        },
        { timestamps: true },)}]
      },

      { timestamps: true },)}
    ],

    deleted: {
      type: Boolean,
    },
    CreatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

feedSchema.plugin(softDelete);
feedSchema.plugin(private);
feedSchema.plugin(paginate);

/**
 * @typedef Feed
 */

const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;
