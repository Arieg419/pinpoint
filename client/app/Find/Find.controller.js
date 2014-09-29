'use strict';

angular.module('pinPointApp')
  .controller('FindCtrl', function ($scope, $log, findPost, Auth) {
    $scope.addFindPost = function() {
        if($scope.name === '') { return; }

    $scope.createdDate1 = new Date();

    var postObj = { 
      name: $scope.name,
      startingLocation: $scope.startingLocation,
      finalLocation: $scope.finalLocation,
      message: $scope.message,
      link: $scope.link,
      upvotes: 0,
      // userId: user._id,
      created_time: $scope.createdDate1
    };

    findPost.create(postObj);


    $scope.markerArr = [];

     var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': postObj.startingLocation}, function(resultStartingLocation,status) {
      console.log(resultStartingLocation);

      var startingMarkerObj = {
        id: 0,
        coords: {
          latitude: resultStartingLocation[0].geometry.location.k,
          longitude: resultStartingLocation[0].geometry.location.B
        }
      };

      $scope.markerArr.push(startingMarkerObj);

      geocoder.geocode({'address': postObj.finalLocation}, function(resultFinalLocation,status) {
        console.log(resultFinalLocation);

        var finalMarkerObj = {
          id: 0,
          coords: {
            latitude: resultFinalLocation[0].geometry.location.k,
            longitude: resultFinalLocation[0].geometry.location.B
          }
        };

        $scope.markerArr.push(finalMarkerObj);

        console.log($scope.map);
        // $scope.map.control.getGMap().setZoom(8);
        // $scope.map.control.refresh({});
      });
    });


    }
  // $scope.map = {
  //   center: {
  //       latitude: 32.7769055,
  //       longitude: 34.997009277
  //            },
  //   zoom: 8
  // }

  //  $scope.options = {scrollwheel: false};
  //       $scope.marker = {
  //           id:0,
  //           coords: {
  //               latitude: 32.08608751,
  //               longitude: 34.7992553707499
  //           },
  //           options: { draggable: true },
  //           events: {
  //               dragend: function (marker, eventName, args) {
  //                   $log.log('marker dragend');
  //                   $log.log(marker.getPosition().lat());
  //                   $log.log(marker.getPosition().lng());
  //               }
  //           }
  //       };
      // $scope.map = {center: {latitude: 31, longitude: 34}, zoom: 6, bounds: {}};
      //   $scope.bounds =  {
      //       sw: {
      //          latitude: 31,
      //           longitude: 31
      //       },
      //       ne: {
      //          latitude: 32,
      //           longitude: 32
      //       }
      //   };

      // $scope.map = {center: {latitude: 2, longitude: 2}, zoom: 6, bounds: {}};
      //   $scope.bounds =  {
      //       sw: {
      //           latitude: 0,
      //           longitude: 0
      //       },
      //       ne: {
      //           latitude: 4,
      //           longitude: 4
      //       }
      //   };

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

        console.log($scope.circles);

        // console.log($scope.bounds);


        // $scope.bounds =  {
        //     sw: {
        //         latitude: 34.791462000000024,
        //         longitude: 31.252973
        //     },
        //     ne: {
        //         latitude: 34.78176759999997,
        //         longitude: 32.0852999
        //     }
        // };

        


        // $scope.options = {scrollwheel: false};
        // $scope.marker = {
        //     id:0,
        //     coords: {
        //         latitude: 32.076778862,
        //         longitude: 34.78277587856
        //     },
        //     options: { draggable: true },
        //     events: {
        //         dragend: function (marker, eventName, args) {
        //             $log.log('marker dragend');
        //             $log.log(marker.getPosition().lat());
        //             $log.log(marker.getPosition().lng());
        //         }
        //     }
        // };

        // var point = new google.maps.LatLng(32,34);
        // var marker = new google.maps.Marker({
        //     position:point,
        //     title:'yo',
        //     draggable:true
        // });
        // $scope.markersEvents = {
        //   click: function (gMarker, eventName, model) {
        //     if(model.$id){
        //       model = model.coords;//use scope portion then
        //     }
        //    alert("Model: event:" + eventName + " " + JSON.stringify(model));
        //   }
        // };

        
        // var createRandomMarker = function (i, bounds, idKey) {
        //     var lat_min = bounds.southwest.latitude,
        //         lat_range = bounds.northeast.latitude - lat_min,
        //         lng_min = bounds.southwest.longitude,
        //         lng_range = bounds.northeast.longitude - lng_min;

        //     if (idKey == null) {
        //         idKey = "id";
        //     }

        //     var latitude = 31;
        //     var longitude = 34;;
        //     // Note, the label* properties are only used if isLabel='true' in the directive.
        //     var ret = {
        //       options: {draggable: true,
        //         labelAnchor: '10 39',
        //         labelContent: i,
        //         labelClass: 'labelMarker'},
        //         latitude: latitude,
        //         longitude: longitude,
        //         title: 'm' + i
        //     };
        //     ret[idKey] = i;
        // console.log($scope.randomMarkers);
        //     return ret;
        // };
        // $scope.randomMarkers = [];
        // $scope.randomMarkersWithLabel = [];
        // // Get the bounds from the map once it's loaded
        // $scope.$watch(function() { return $scope.map.bounds; }, function(nv, ov) {
        //     // Only need to regenerate once
        //     // Create 25 markes with label, 25 without.
        //     if (!ov.southwest && nv.southwest) {
        //         var markers = [];
        //         for (var i = 0; i < 25; i++) {
        //             markers.push(createRandomMarker(i, $scope.map.bounds))
        //         }
        //         $scope.randomMarkers = markers;
        //         markers = [];
        //         for (var i = 25; i < 50; i++) {
        //             markers.push(createRandomMarker(i, $scope.map.bounds))
        //         }
        //         $scope.randomMarkersWithLabel = markers;

        //     }
        // }, true);

// !!!!!!!!!!!!CALENDER FUNCTIONALITY!!!!!!!!!!!!!!!!!!
$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  // !!!!!!!!!!!!!!!!! TIME PICKER !!!!!!!!!!!!!!!!!!!!!!!
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 5;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    console.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };

  $scope.$watch('dt', function(newval, oldval) {
        $scope.dateOfRide = oldval;
        console.log("this is oldval scope");
        console.log($scope.dateOfRide);
      if (newval) {
        console.log(newval);
        console.log("this is newVal scope");
        console.log($scope.dateOfRide);
      }

    })

  // !!!!!!!!!!!!!!!!!!! END OF TIME PICKER !!!!!!!!!!!!!!!!!

    

        
  });

