'use strict';

angular.module('pinPointApp')
  .controller('RideboardCtrl', function ($scope, ridePost, Auth, $moment) {
  // ==========================GET ALL POSTS============================
  moment().format()
  var user = Auth.getCurrentUser();

  $scope.posts = ridePost.posts;


  // $scope.sortingFunc = function() {
  //   for(var i = 0 ; i < $scope.posts.length - 1  ; i++) {
  //       for (var j = 0; j < $scope.posts.length - 1 ; j++) {
  //          if($scope.posts[j].created_time < $scope.posts[i].created_time) {
  //            var a = $scope.posts[j];
  //            $scope.posts[j] = $scope.posts[i];
  //            $scope.posts[i] = a;
  //            console.log("switch")
  //          } 
  //       }
  //   }
  // };
  $scope.map = {center: {latitude: 31, longitude: 34 }, zoom: 8, control: {} };


  // console.log($rootScope.startMarkTechArr);
  $scope.items = ["Rides to the Technion", "Rides from the Technion", "Beersheba"]

  
  var dateA = moment().subtract(1,'days');


  // $scope.posts = posts.sort(sortingFunc2);

  $scope.startMarkTechArr = [];

  var geocoder = new google.maps.Geocoder();
  
  ridePost.getAllFBPosts();
  ridePost.deleteOldPosts().then(function() {
    ridePost.getAllPosts().then(function() {
      var getOneGeoCode = function(onePost, doneOnePost) {
        if (onePost.startingDestination !== "") {
          console.log("i am in the if");
          geocoder.geocode({'address': onePost.startingDestination}, function(resultStartingDestination,status) {
            var startingMarkerObj = {
              id: 0,
              coords: {
                latitude: resultStartingDestination[0].geometry.location.k,
                longitude: resultStartingDestination[0].geometry.location.B
              }
            };
            $scope.startMarkTechArr.push(startingMarkerObj);
            doneOnePost(null);
          });
        } else {
          doneOnePost(null);
        }
      };

     var doneAllGeocoding = function(err) {
      console.log("done doing all geocode");
      console.log($scope.startMarkTechArr);
     };

    async.each($scope.posts, getOneGeoCode, doneAllGeocoding);

    }); 
  });
  // ==========================GET ALL POSTS============================




  // ==========================GET ALL GEOCODE============================


  // We have an array of posts, posts[i].startingDestination is the address
  // Do loop over array of posts, post[i].startingDestination ==> geocode to lat lng
  // and save it in an array
  // in html, ngrepeat over the array


  // array is $scope.posts
  // use async.each
  

  // for( var i = 0 ; i < $scope.posts.length ; i++) {
  //   var geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({'address': postObj.startingDestination}, function(resultStartingDestination,status) {
  //     // console.log(resultStartingDestination);

  //     var startingMarkerObj = {
  //       id: 0,
  //       coords: {
  //         latitude: resultStartingDestination[0].geometry.location.k,
  //         longitude: resultStartingDestination[0].geometry.location.B
  //       }
  //     };

  //     startMarkTechArr.push(startingMarkerObj);

  //     geocoder.geocode({'address': postObj.finalDestination}, function(resultFinalDestination,status) {
  //       // console.log(resultFinalDestination);

  //       var finalMarkerObj = {
  //         id: 0,
  //         coords: {
  //           latitude: resultFinalDestination[0].geometry.location.k,
  //           longitude: resultFinalDestination[0].geometry.location.B
  //         }
  //       };

  //       // $scope.markerArr.push(finalMarkerObj);

  //       // console.log($scope.map);
  //       // $scope.map.control.getGMap().setZoom(8);
  //       // $scope.map.control.refresh({});
  //     });
  //   });
  // }

  // console.log(startMarkTechArr);
  // ==========================GET ALL GEOCODE============================
  

   
  

  // ridePost.getAllPosts().then(function() {
  // // $scope.posts.sort($scope.sortingFunc);
  //            // console.log("hey")
  //   // for( var i = 0; i < $scope.posts.length-1 ; i++){
  //   //   console.log($scope.posts[i]);
  //   // }
  //   // console.log($scope.posts[$scope.posts.length-1]);
  //   console.log($moment());
  //   console.log($moment($scope.posts[$scope.posts.length-1].created_time))

  //   console.log($moment($scope.posts[$scope.posts.length-1].created_time).fromNow())
    
  
  //   // for(var i = 0; i < $scope.posts.length-1 ; i++) {
  //   //   console.log($moment($scope.posts[i].created_time).fromNow())
  //   // }

  //   // for(var i = 0; i < $scope.posts.length-1 ; i++) {
  //   //   if (($moment($scope.posts[i].created_time).fromNow() > dateA.fromNow())) {
  //   //   // console.log($moment($scope.posts[i].created_time).fromNow())
  //   //   console.log('this is me printing');
  //   //   // console.log($moment());
  //   //   console.log($scope.posts[i]);
  //   //   }
  //   // }
  //     // console.log($moment() - moment($scope.posts[$scope.posts.length-1].created_time))
  // });



  

  
 
  $scope.userCheck = function(post) {
    if(user._id === '541768b9eb0fe2bf06d3d726') {
      return true;
    } else {
    // console.log (user._id);
    // console.log(post.userId)
         return user._id === post.userId
        }
  }


  $scope.voted = false;

  $scope.incrementUpvotes = function(post) {
  if(!$scope.voted) {
  	post.upvotes += 1;
  	}
  


  };

$scope.test = 'asdfasdfsdfsdf'

$scope.delete = function (post) {
  ridePost.delete(post).then(function() {
    ridePost.getAllPosts();
    $scope.posts = ridePost.posts;
  });
}
 //  $scope.decrementUpvotes = function(post) {
 //  if(!$scope.voted) {
 //  	post.upvotes -= 1;
	// }
 //  $scope.voted = true;
 //  };


  });
