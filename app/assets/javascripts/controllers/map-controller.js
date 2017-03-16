(function(ng) {
    ng.module('BlueMirrorApp').controller('MapController', function($state, $scope, $q, DataRequestService, UserService, uiGmapGoogleMapApi, $geolocation) {

        $geolocation.getCurrentPosition({
        timeout: 60000
       }).then(function(position) {
         console.log('position: ', position);
         $scope.map = {
           center: {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude
           },
           zoom: 16,
           control: {},
           markers: [],
           place: '',
           result: ''
         };
       });



        uiGmapGoogleMapApi.then(function(maps) {
        //     $geolocation.getCurrentPosition({
        //     timeout: 60000
        //    }).then(function(position) {
        //     $scope.map = {
        //         center: {
        //             latitude: position.coords.latitude,
        //             longitude: position.coords.longitutde
        //         },
        //         // options: {
        //         //     maxZoom: 4,
        //         //     minZoom: 4
        //         // },
        //         zoom: 16,
        //         control: {},
        //         markers: [],
        //         place: '',
        //         result: ''
        //     };
        //    });

            $scope.placeSearch = function(place) {
                var request = {
                    location: {
                        lat: $scope.map.center.latitude,
                        lng: $scope.map.center.longitude
                    },
                    radius: '50',
                    query: 'mental health'
                };
                var map = $scope.map.control.getGMap();
                var service = new google.maps.places.PlacesService(map);

                service.textSearch(request, callback);
                return;
            };

            var callback = function(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i], i);
                    }
                }
            };

            var createMarker = function(place, id) {
                $scope.map.markers.push({
                    id: id,
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                    showWindow: false,
                    name: place.name,
                    templateUrl: 'place.html',
                    templateParameter: {
                        message: place.name, // TODO: play around with place obj/details
                        address: place.formatted_address
                    }
                });
                $scope.$apply();
            };
            $scope.closeClick = function(marker) {
                marker.showWindow = false;
            };
            $scope.onMarkerClicked = function(marker) {
                marker.showWindow = true;
            };
            $scope.removeMarkers = function() {
                $scope.map.markers.length = 0;
            };

        });
    });

})(angular);
