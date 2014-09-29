/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Ridesfromtechnion = require('./ridesFromTechnion.model');

exports.register = function(socket) {
  Ridesfromtechnion.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Ridesfromtechnion.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ridesFromTechnion:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ridesFromTechnion:remove', doc);
}