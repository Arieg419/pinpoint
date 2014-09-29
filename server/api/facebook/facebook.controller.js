'use strict';

var _ = require('lodash');
var FB = require('fb');
var Facebook = require('./facebook.model');
var RideData = require('../RideBoard/RideBoard.model');
var Post = require('../Post/Post.model');
var async =require("async");


// Get list of facebooks
// exports.index = function(req, res) {
  // Facebook.find(function (err, facebooks) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, facebooks);
  // });
// };


exports.index = function (requestFromBrowser,responseToBrowser) {  //why is this always running?
    var currentPosts;
    Post.find(function (err, posts) {
      currentPosts = posts;
    });
 
     var photoObj = {test:"hi"};  //saving profile photo

    // var facebookPull = function() {
      FB.setAccessToken(globalAccessToken);
      
      FB.api('135704829788347/feed', function (responseFromFB) {
        if(!responseFromFB || responseFromFB.error) {
          console.log(!responseFromFB ? 'error occurred' : responseFromFB.error);
          return;
        }
          // console.log(responseFromFB);
        // for(var i = 0; i < responseFromFB.data.length; i++) {
        FB.api(responseFromFB.data[0].from.id + "/picture", {redirect: false}, function (response) {
        if (response && !response.error) {
          photoObj = response.data.url;
          console.log(photoObj);
          async.each(responseFromFB.data, saveOnePost, doneSavingAllPosts); //where is responsefromFB?
          return;
          /* handle the result */
        }
          // console.log(response);

      });
      // }

        // 10203738416513750
// responseFromFB.data.from.id
        // post.from.id + "/picture"
        
      });
      /* make the API call */


    // Save to the Post database
    var saveOnePost = function(post, doneOnePost) {
      console.log('running saveOnePost function');

      if (currentPosts.length > 0) {
        var foundPost = false;
        for(var i = 0; i < currentPosts.length; i++) {
          console.log('inside for loop')
          if(post.created_time === currentPosts[i].created_time && post.from.id === currentPosts[i].userId) {
            console.log('test')
            foundPost = true;
            break;

          }
        }

        if (!foundPost) {
            var postObj = {};
            postObj.name = post.from.name;
            postObj.message = post.message;
            postObj.created_time = post.created_time;
            postObj.profileLink = 'www.facebook.com/' + post.from.id;
            postObj.userId = post.from.id;  
            // postObj.profilePic = photoObj;
            postObj.profilePic = photoObj;
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
        }
      } else {
        var postObj = {};
            postObj.name = post.from.name;
            postObj.message = post.message;
            postObj.created_time = post.created_time;
            postObj.profileLink = 'www.facebook.com/' + post.from.id;
            postObj.userId = post.from.id;  
            // postObj.profilePic = photoObj;
            postObj.profilePic = photoObj;
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

      }

      // console.log(postObj);

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


    // Execute the asynchronous tasks







// Get a single facebook
exports.show = function(req, res) {
  Facebook.findById(req.params.id, function (err, facebook) {
    if(err) { return handleError(res, err); }
    if(!facebook) { return res.send(404); }
    return res.json(facebook);
  });
};

// Creates a new facebook in the DB.
exports.create = function(req, res) {
  Facebook.create(req.body, function(err, facebook) {
    if(err) { return handleError(res, err); }
    return res.json(201, facebook);
  });

};

// Updates an existing facebook in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Facebook.findById(req.params.id, function (err, facebook) {
    if (err) { return handleError(res, err); }
    if(!facebook) { return res.send(404); }
    var updated = _.merge(facebook, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, facebook);
    });
  });
};

// Deletes a facebook from the DB.
exports.destroy = function(req, res) {
  Facebook.findById(req.params.id, function (err, facebook) {
    if(err) { return handleError(res, err); }
    if(!facebook) { return res.send(404); }
    facebook.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}