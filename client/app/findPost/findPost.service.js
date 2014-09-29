'use strict';

angular.module('pinPointApp')
  .factory('findPost', function ($http, $moment) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var findPosts = {};
    findPosts.posts = [];

    var dateA = moment().subtract(1,'days');

    var currentPosts;

    findPosts.getAllPosts = function() {
      return $http.get('api/finds').success(function(posts) {
      	console.log(posts);
      }); 
    };

    findPosts.deleteOldPosts = function() {
      return $http.get('api/finds').success(function(posts) {
        console.log("yo");
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


findPosts.create = function(post) {
      return $http.post('api/finds', post).success(function(post) {
        findPosts.posts.push(post);
      });
    };

    findPosts.delete = function(post) {
      return $http.delete('api/finds/'+post._id).success(function(post){
        console.log(post);
      });
    }


    return findPosts;


  });
