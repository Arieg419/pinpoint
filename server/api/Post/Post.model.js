'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
  name: { type: String, default: ""},
  created_time: {type: String, default: ""},
  startingDestination: { type: String, default: ""},
  finalDestination: { type: String, default: "Technion"},
  upvotes: {type: Number, default: 0},
  message: { type: String, default: ""},
  timeOfRide: { type: Date, default:""},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  link: { type: String, default: ""},
  userId: { type: String, default: ""},
  user: { type: Schema.Types.ObjectId, ref: "User" },
  profilePic: { type: String, default: ""},
  profileLink : { type: String, default: ""} //should i even be saving photos or just showing.
});

// var CommentSchema = new mongoose.Schema({
//   body: String,
//   author: String,
//   upvotes: {type: Number, default: 0},
//   post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
// });

// module.exports = mongoose.model('Post', PostSchema, 'Comment', CommentSchema);


module.exports = mongoose.model('Post', PostSchema);

// var post = new PostSchema (...);
// post.created_time.