'use strict';

var _ = require('lodash');
var Find = require('./find.model');

// Get list of finds
exports.index = function(req, res) {
  Find.find(function (err, finds) {
    if(err) { return handleError(res, err); }
    return res.json(200, finds);
  });
};

// Get a single find
exports.show = function(req, res) {
  Find.findById(req.params.id, function (err, find) {
    if(err) { return handleError(res, err); }
    if(!find) { return res.send(404); }
    return res.json(find);
  });
};

// Creates a new find in the DB.
exports.create = function(req, res) {
  Find.create(req.body, function(err, find) {
    if(err) { return handleError(res, err); }
    return res.json(201, find);
  });
};

// Updates an existing find in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Find.findById(req.params.id, function (err, find) {
    if (err) { return handleError(res, err); }
    if(!find) { return res.send(404); }
    var updated = _.merge(find, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, find);
    });
  });
};

// Deletes a find from the DB.
exports.destroy = function(req, res) {
  Find.findById(req.params.id, function (err, find) {
    if(err) { return handleError(res, err); }
    if(!find) { return res.send(404); }
    find.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}