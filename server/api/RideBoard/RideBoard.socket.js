/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Rideboard = require('./RideBoard.model');

exports.register = function(socket) {
  Rideboard.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Rideboard.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('RideBoard:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('RideBoard:remove', doc);
}