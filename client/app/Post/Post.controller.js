'use strict';

angular.module('pinPointApp')
  .controller('PostCtrl', function ($scope, $http, ridePost, Auth, $rootScope, ridesFromTechnion) {
    
    var user = Auth.getCurrentUser();
    console.log(user);


    $scope.$watch('boardChoice', function(newval, oldval) {
      if (newval) {
        console.log(newval)
      }

    })
    // $scope.map = {
    //   center: {
    //       latitude: 31,
    //       longitude: 34
    //      },
    //    zoom: 6,
    //    control: {}
    // };

  $scope.markerArr = [];

  $scope.$watch('finalDestination', function(newval, oldval) {
    if (newval) {
      console.log("final change"); //search for new val
    }
    
  });

  $scope.$watch('startingDestination', function(newval, oldval) {
    if (newval) {
      console.log("start change"); //search for new val
    }
    
  })

  console.log(Auth.getCurrentUser())

  $scope.items = ["Rides to the Technion", "Rides from the Technion", "Beersheba"]

  $scope.map = {center: {latitude: 31, longitude: 34 }, zoom: 8, control: {} };
        $scope.options = {scrollwheel: false};
        $scope.circles = [
            {
                id: 1,
                center: {
                    latitude: 31.252973,
                    longitude: 34.791462000000024
                },
                radius: 10000,
                stroke: {
                    color: '#08B21F',
                    weight: 2,
                    opacity: 1
                },
                fill: {
                    color: '#08B21F',
                    opacity: 0.5
                },
                geodesic: true, // optional: defaults to false
                draggable: true, // optional: defaults to false
                clickable: true, // optional: defaults to true
                editable: true, // optional: defaults to false
                visible: true // optional: defaults to true
            }
        ];

        // console.log($scope.circles);

  //=======================
  //add Post !
  //=====================
    
  $scope.addPost = function(){
    // post to database
    if($scope.title === '') { return; }

    $scope.createdDate = new Date();

    var postObj = { 
      name: $scope.name,
      startingDestination: $scope.startingDestination,
      finalDestination: $scope.finalDestination,
      message: $scope.message,
      link: $scope.link,
      upvotes: 0,
      userId: user.facebook.id,
      created_time: $scope.createdDate,
      timeOfRide: $scope.myDate
    };

    if ($scope.boardChoice == 'Rides to the Technion') {
      console.log(postObj);
      ridePost.create(postObj);
    }

    else if ($scope.boardChoice == 'Rides from the Technion') {
      ridesFromTechnion.create(postObj);
      console.log("kobe bryant");
    }

    else {

    }

    //================================================ GEOCODER -- do google map markers

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': postObj.startingDestination}, function(resultStartingDestination,status) {
      // console.log(resultStartingDestination);

      var startingMarkerObj = {
        id: 0,
        coords: {
          latitude: resultStartingDestination[0].geometry.location.k,
          longitude: resultStartingDestination[0].geometry.location.B
        }
      };

      // $rootScope.startMarkTechArr = [];

      // $rootScope.startMarkTechArr.push(startingMarkerObj);

      // console.log($rootScope.startMarkTechArr);


      // $scope.markerArr.push(startingMarkerObj);

      $scope.circles.latitude = startingMarkerObj.coords.latitude;
      $scope.circles.longitude = startingMarkerObj.coords.longitude;

      console.log($scope.circles);

      geocoder.geocode({'address': postObj.finalDestination}, function(resultFinalDestination,status) {
        // console.log(resultFinalDestination);

        var finalMarkerObj = {
          id: 0,
          coords: {
            latitude: resultFinalDestination[0].geometry.location.k,
            longitude: resultFinalDestination[0].geometry.location.B
          }
        };

        // $scope.markerArr.push(finalMarkerObj);

        // console.log($scope.map);
        // $scope.map.control.getGMap().setZoom(8);
        // $scope.map.control.refresh({});
      });
    });

    $scope.name = '';
  };

  $scope.$watch('myDate', function(newval, oldval) {
        console.log("this is oldval scope of calenders");
        $scope.myDate;
      if (newval) {
        console.log("this is newVal scope quick datepicker");
        console.log($scope.myDate);
      }

    })

  

  //===================================================

//   // !!!!!!!!!!!!CALENDER FUNCTIONALITY!!!!!!!!!!!!!!!!!!
// $scope.today = function() {
//     $scope.dt = new Date();
//   };
//   $scope.today();

//   $scope.clear = function () {
//     $scope.dt = null;
//   };

//   // Disable weekend selection
//   $scope.disabled = function(date, mode) {
//     return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
//   };

//   $scope.toggleMin = function() {
//     $scope.minDate = $scope.minDate ? null : new Date();
//   };
//   $scope.toggleMin();

//   $scope.open = function($event) {
//     $event.preventDefault();
//     $event.stopPropagation();

//     $scope.opened = true;
//   };

//   $scope.dateOptions = {
//     formatYear: 'yy',
//     startingDay: 1
//   };

//   $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
//   $scope.format = $scope.formats[3];

//   // !!!!!!!!!!!!!!!!! TIME PICKER !!!!!!!!!!!!!!!!!!!!!!!
//   $scope.mytime = new Date();

//   $scope.hstep = 1;
//   $scope.mstep = 5;

//   $scope.options = {
//     hstep: [1, 2, 3],
//     mstep: [1, 5, 10, 15, 25, 30]
//   };

//   $scope.ismeridian = true;
//   $scope.toggleMode = function() {
//     $scope.ismeridian = ! $scope.ismeridian;
//   };

//   $scope.update = function() {
//     var d = new Date();
//     d.setHours( 14 );
//     d.setMinutes( 0 );
//     $scope.mytime = d;
//   };

//   $scope.changed = function () {
//     console.log('Time changed to: ' + $scope.mytime);
//   };

//   $scope.clear = function() {
//     $scope.mytime = null;
//   };

//   $scope.$watch('dt', function(newval, oldval) {
//         $scope.dateOfRide = newval;
//         console.log("this is oldval scope of calenders");
//         console.log($scope.dateOfRide);
//       if (newval) {
//         console.log("this is newVal scope");
//         console.log($scope.dateOfRide);
//       }

//     })

//   // !!!!!!!!!!!!!!!!!!! END OF TIME PICKER !!!!!!!!!!!!!!!!!




  });


     
