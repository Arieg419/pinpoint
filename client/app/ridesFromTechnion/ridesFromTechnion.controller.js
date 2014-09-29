'use strict';

angular.module('pinPointApp')
  .controller('RidesfromtechnionCtrl', function ($scope,Auth,ridesFromTechnion,$moment) {
  //=======================GET ALL POSTS====================
    moment().format()
    var user = Auth.getCurrentUser();

  $scope.rides = ridesFromTechnion.posts;

   $scope.map = {center: {latitude: 31, longitude: 34 }, zoom: 8, control: {} };

   $scope.items = ["Rides to the Technion", "Rides from the Technion", "Beersheba"];
   
   var dateA = moment().subtract(1,'days');

   $scope.finishMarkTechArr = [];

   var geocoder = new google.maps.Geocoder();
  
  ridesFromTechnion.getAllFBPosts();
  ridesFromTechnion.deleteOldPosts().then(function() {
    ridesFromTechnion.getAllPosts().then(function() {
      var getOneGeoCode = function(onePost, doneOnePost) {
        if (onePost.finalDestination !== "") {
          console.log("i am in the if");
          geocoder.geocode({'address': onePost.finalDestination}, function(resultfinalDestination,status) {
            var finalMarkerObj = {
              id: 0,
              coords: {
                latitude: resultfinalDestination[0].geometry.location.k,
                longitude: resultfinalDestination[0].geometry.location.B
              }
            };
            console.log("this is the final marker obj");
            console.log(finalMarkerObj);
            $scope.finishMarkTechArr.push(finalMarkerObj);
            doneOnePost(null);
          });
        } else {
          doneOnePost(null);
        }
      };

     var doneAllGeocoding = function(err) {
      console.log("done doing all geocode");
      console.log($scope.finishMarkTechArr);
     };

    async.each($scope.rides, getOneGeoCode, doneAllGeocoding);

    }); 
  });



  // ridesFromTechnion.getAllFBPosts().then(function(whatPosts){
  //   // console.log(whatPosts.data.data);
  //   // $scope.rides = whatPosts.data.data;

  // });



  // ridesFromTechnion.deleteOldPosts().then(function() {

  //   ridesFromTechnion.getAllPosts().then(function() {
  //     // $scope.rides = ridesFromTechnion.posts;
  //     console.log($scope.rides);
  //   }); 
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
  ridesFromTechnion.delete(post).then(function() {
    // ridesFromTechnion.getAllPosts();
    $scope.postsFromTechnion = ridesFromTechnion.posts;
  });
}
 //  $scope.decrementUpvotes = function(post) {
 //  if(!$scope.voted) {
 //  	post.upvotes -= 1;
	// }
 //  $scope.voted = true;
 //  };


  });


