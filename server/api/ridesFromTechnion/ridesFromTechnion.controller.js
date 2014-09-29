'use strict';

var _ = require('lodash');
var ridesFromTechnion = require('./ridesFromTechnion.model');
var FB = require('fb');
var async =require("async");

// Get list of ridesFromTechnions
// exports.index = function(req, res) {
//   Ridesfromtechnion.find(function (err, ridesFromTechnions) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, ridesFromTechnions);
//   });
// };


// Get list of posts for rides from Technion from MongoDB
exports.fromTechnion = function(req, res) {
  console.log('calling rides from technion');
  ridesFromTechnion.find().populate('user').exec(function (err, Posts) {
    if(err) { return handleError(res, err); }
    // console.log(Posts);
    return res.json(200, Posts);
  });
};

// Get posts for rides from Technion from Facebook
exports.index = function (requestFromBrowser,responseToBrowser) {  //why is this always running?
     var currentPosts;
    ridesFromTechnion.find(function (err, posts) {
      currentPosts = posts;
    });


     var photoObj = {test:"hi"};
       //saving profile photo

    // var facebookPull = function() 
    // yo yo yo your such an ass

      FB.setAccessToken(globalAccessToken);
    

      FB.api('301410316636087/feed', function (responseFromFB) {
        console.log("Im in backend");
        if(!responseFromFB || responseFromFB.error) {
          console.log(!responseFromFB ? 'error occurred' : responseFromFB.error);
          return;
        }
          //console.log("RESPONSE FROM BACKEND: " + responseFromFB); //actually going to console!
        // for(var i = 0; i < responseFromFB.data.length; i++) {
        FB.api(responseFromFB.data[0].from.id + "/picture", {redirect: false}, function (response) {
        if (response && !response.error) {
          photoObj = response.data.url;
          console.log(photoObj);
          async.each(responseFromFB.data, saveOnePost, doneSavingAllPosts); //where is responsefromFB?
          console.log("do it in the backend");
          
          return responseToBrowser.send(responseFromFB);
         
         // return;
          /* handle the result */
        }
          //console.log(response);
      });
      // }

        // 10203738416513750
// responseFromFB.data.from.id
        // post.from.id + "/picture"
        
      });
      /* make the API call */


    // Save to the Post database
    // var saveOnePost = function(post, doneOnePost) {
    //   var postObj = {};
    //   postObj.name = post.from.name;
    //   postObj.message = post.message;
    //   postObj.created_time = post.created_time;
    //   postObj.profileLink = 'www.facebook.com/' + post.from.id;
    //   postObj.userId = post.from.id;  
    
    //   postObj.profilePic = photoObj;
      
     

    //   ridesFromTechnion.create(postObj, function(err, post) {
    //     if (err) { 
    //       return handleError(res, err); 
    //     }
    //     else { 
         
    //       doneOnePost(null);
    //     }
    //   });
    // };

    var saveOnePost = function(post, doneOnePost) {
      console.log('running saveOnePost function');
      // console.log(currentPosts);

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
            ridesFromTechnion.create(postObj, function(err, post) {
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
            ridesFromTechnion.create(postObj, function(err, post) {
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

// Get a single ridesFromTechnion
exports.show = function(req, res) {
  ridesFromTechnion.findById(req.params.id, function (err, ridesFromTechnion) {
    if(err) { return handleError(res, err); }
    if(!ridesFromTechnion) { return res.send(404); }
    return res.json(ridesFromTechnion);
  });
};

// Creates a new ridesFromTechnion in the DB.
exports.create = function(req, res) {
  console.log('inside back end create method')
  ridesFromTechnion.create(req.body, function(err, ridesFromTechnion) {
    if(err) { return handleError(res, err); }
    return res.json(201, ridesFromTechnion);
  });
};

// Updates an existing ridesFromTechnion in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ridesFromTechnion.findById(req.params.id, function (err, ridesFromTechnion) {
    if (err) { return handleError(res, err); }
    if(!ridesFromTechnion) { return res.send(404); }
    var updated = _.merge(ridesFromTechnion, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, ridesFromTechnion);
    });
  });
};

// Deletes a ridesFromTechnion from the DB.
exports.destroy = function(req, res) {
  Ridesfromtechnion.findById(req.params.id, function (err, ridesFromTechnion) {
    if(err) { return handleError(res, err); }
    if(!ridesFromTechnion) { return res.send(404); }
    ridesFromTechnion.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}