/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Find = require('./find.model');

exports.register = function(socket) {
  Find.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Find.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('find:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('find:remove', doc);
}