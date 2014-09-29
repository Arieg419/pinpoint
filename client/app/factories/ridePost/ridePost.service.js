'use strict';

angular.module('pinPointApp')
  .factory('ridePost', function ($http, $moment) {
    // Service logic
    // ...

    var ridePosts = {};

    ridePosts.posts = [];

    var dateA = moment().subtract(2,'days');  //right now minus 1 day

   var currentPosts;

    ridePosts.getAllFBPosts = function() {
      return  $http.get('api/facebooks').success(function(posts) {
        console.log(posts);
    });
       }

    ridePosts.getAllPosts = function()  {
      return $http.get('api/Posts').success(function(posts) {
        // console.log(posts);
        angular.copy(posts, ridePosts.posts);
        // ridePosts.deleteOldPosts();
        currentPosts = posts;
      });
    };

    ridePosts.deleteOldPosts = function() {
      return $http.get('api/Posts').success(function(posts) {
        currentPosts = posts;
        for (var i = 0; i < currentPosts.length - 1 ; i++) {
          if($moment(currentPosts[i].created_time) <= dateA) {
            console.log("deleting this post");
            console.log(currentPosts[i]);
            ridePosts.delete(currentPosts[i]);
          }  
        }
      })
    }

    ridePosts.create = function(post) {
      return $http.post('api/Posts', post).success(function(post) {
        ridePosts.posts.push(post);
        console.log(post);
      });
    };

    ridePosts.delete = function(post) {
      return $http.delete('api/Posts/'+post._id).success(function(post){
        console.log(post);
      });
    }


    return ridePosts;

  });

