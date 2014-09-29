'use strict';

var _ = require('lodash');
var Rideboard = require('./RideBoard.model');
var FB = require('fb');
var Post = require('../Post/Post.model');
var async =require("async");


// Get list of RideBoards
// exports.index = function(req, res) {
//   Rideboard.find(function (err, RideBoards) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, RideBoards);
//   });
// };

exports.index = function (requestFromBrowser,responseToBrowser) {  //why is this always running?
 
     var photoObj = {test:"hi"};  //saving profile photo

    // var facebookPull = function() {
      FB.setAccessToken(globalAccessToken);
      
      FB.api('301410316636087/feed', function (responseFromFB) {
        if(!responseFromFB || responseFromFB.error) {
          console.log(!responseFromFB ? 'error occurred' : responseFromFB.error);
          return;
        }
          console.log(responseFromFB);
        // for(var i = 0; i < responseFromFB.data.length; i++) {
        FB.api(responseFromFB.data[0].from.id + "/picture", {redirect: false}, function (response) {
        if (response && !response.error) {
          photoObj = response.data.url;
          console.log(photoObj);
          async.each(responseFromFB.data, saveOnePost, doneSavingAllPosts); //where is responsefromFB?
          return;
          /* handle the result */
        }
          console.log(response);

      });
      // }

        // 10203738416513750
// responseFromFB.data.from.id
        // post.from.id + "/picture"
        
      });
      /* make the API call */


    // Save to the Post database
    var saveOnePost = function(post, doneOnePost) {
      var postObj = {};
      postObj.name = post.from.name;
      postObj.message = post.message;
      postObj.created_time = post.created_time;
      postObj.profileLink = 'www.facebook.com/' + post.from.id;
      postObj.userId = post.from.id;  
      // postObj.profilePic = photoObj;
      postObj.profilePic = photoObj;
      
      // console.log(postObj);

      Post.create(postObj, function(err, post) {
        if (err) { 
          return handleError(res, err); 
        }
        else { 
          console.log("success creating post");
          console.log(post._id);
          console.log(post.profilePic);

          // done creating post in db
          // now calling the next item in the array
          doneOnePost(null);
        }
      });
    };


    var doneSavingAllPosts = function(err) {
      if (err) {
        return handleError(res, err); 
      }
      else {
        console.log('I am done saving all posts');
      }
    };

    // async.each(responseFromFB.data, saveOnePost, doneSavingAllPosts); //where is responsefromFB?
};

// Get a single RideBoard
exports.show = function(req, res) {
  Rideboard.findById(req.params.id, function (err, RideBoard) {
    if(err) { return handleError(res, err); }
    if(!RideBoard) { return res.send(404); }
    return res.json(RideBoard);
  });
};

// Creates a new RideBoard in the DB.
exports.create = function(req, res) {
  Rideboard.create(req.body, function(err, RideBoard) {
    if(err) { return handleError(res, err); }
    return res.json(201, RideBoard);
  });
};

// Updates an existing RideBoard in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Rideboard.findById(req.params.id, function (err, RideBoard) {
    if (err) { return handleError(res, err); }
    if(!RideBoard) { return res.send(404); }
    var updated = _.merge(RideBoard, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, RideBoard);
    });
  });
};

// Deletes a RideBoard from the DB.
exports.destroy = function(req, res) {
  Rideboard.findById(req.params.id, function (err, RideBoard) {
    if(err) { return handleError(res, err); }
    if(!RideBoard) { return res.send(404); }
    RideBoard.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}