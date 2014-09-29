'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RidesfromtechnionSchema = new mongoose.Schema({
  name: { type: String, default: "Bob"},
  created_time: {type: String, default: ""},
  startingDestination: { type: String, default: "Technion"},
  finalDestination: { type: String, default: ""},
  upvotes: {type: Number, default: 0},
  message: { type: String, default: ""},
  timeOfDeparture: { type: String, default: ""},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  link: { type: String, default: ""},
  userId: { type: String, default: ""},
  user: { type: Schema.Types.ObjectId, ref: "User" },
  profilePic: { type: String, default: ""},
  profileLink : { type: String, default: ""} //should i even be saving photos or just showing.
});

module.exports = mongoose.model('Ridesfromtechnion', RidesfromtechnionSchema);