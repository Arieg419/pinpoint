'use strict';

angular.module('pinPointApp')
  .factory('ridesFromTechnion', function ($http, $moment) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    

    var ridesFromTechnion = {};

    ridesFromTechnion.posts = [];

    var dateA = moment().subtract(2,'days');

    var currentPosts;

    ridesFromTechnion.getAllFBPosts = function() {
      console.log("IM HERE");
      return  $http.get('api/ridesFromTechnions').success(function(posts) {
        // angular.copy(posts, ridesFromTechnion.posts);
      
        //console.log(ridesFromTechnion.posts);

    });
       }

    ridesFromTechnion.getAllPosts = function()  {
      return $http.get('api/ridesFromTechnions/ridesFromTechnion').success(function(posts) {
        console.log(posts);
        angular.copy(posts, ridesFromTechnion.posts);
        // ridesFromTechnion.deleteOldPosts();
        currentPosts = posts;
      });
    };

    ridesFromTechnion.deleteOldPosts = function() {
      return $http.get('api/ridesFromTechnions').success(function(posts) {
        currentPosts = posts;
        for (var i = 0; i < currentPosts.length - 1 ; i++) {
          if($moment(currentPosts[i].created_time) <= dateA) {
            console.log("deleting this post");
            console.log(currentPosts[i]);
            ridesFromTechnion.delete(currentPosts[i]);
          }  
        }
      })
    }

    ridesFromTechnion.create = function(post) {
      return $http.post('api/ridesFromTechnions', post).success(function(post) {
        ridesFromTechnion.posts.push(post);
      });
    };

    ridesFromTechnion.delete = function(post) {
      return $http.delete('api/ridesFromTechnions/'+post._id).success(function(post){
        console.log(post);
      });
    }


    return ridesFromTechnion;
  });
