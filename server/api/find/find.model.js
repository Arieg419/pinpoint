'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FindSchema = new Schema({
  name: { type: String, default: ""},
  startingLocation: { type: String, default: ""},
  startingLocGPS: { type: String, default: ""},
  finalLocation: { type: String, default: "Technion"},
  finalLocGPS: { type: String, default: ""},
  dateOfRide: { type: Date, default:""},
  timeOfRide: { type: String, default:""},
  message: { type: String, default: ""},
  altStrtPnt1: { type: String, default: ""},
  altStrtPnt2: { type: String, default: ""},
  userId: { type: String, default: ""},
  profilePic: { type: String, default: ""},
  profileLink : { type: String, default: ""}
});

module.exports = mongoose.model('Find', FindSchema);