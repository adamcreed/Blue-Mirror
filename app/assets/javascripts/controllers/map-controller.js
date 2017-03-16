(function(ng) {
    ng.module('BlueMirrorApp').controller('MapController', function($state, $scope, $q, DataRequestService, UserService, uiGmapGoogleMapApi, $geolocation, $sce) {

        $geolocation.getCurrentPosition({
            timeout: 60000
        }).then(function(position) {
            $scope.map = {
                center: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                zoom: 16,
                control: {},
                markers: [],
                templateUrl: 'place.html',
                templateParameter: {
                    name: '',
                    address: '',
                    phone: '',
                    website: '',
                    rating: ''
                },
                place: '',
                result: ''
            };
        }).then(function(maps) {

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
                var request = {
                    reference: place.reference
                };
                var detail = new google.maps.places.PlacesService($scope.map.control.getGMap());
                detail.getDetails(request, function(result, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        $scope.map.markers.push(new google.maps.Marker({
                            id: id,
                            latitude: place.geometry.location.lat(),
                            longitude: place.geometry.location.lng(),
                            showWindow: false,
                            name: result.name,
                            address: result.formatted_address,
                            phone: result.formatted_phone_number,
                            website: result.website,
                            rating: result.rating,
                        }));
                        $scope.$apply();
                    }
                });
            };

            $scope.closeClick = function(marker) {
                marker.showWindow = false;
            };
            $scope.onMarkerClicked = function(marker) {
                marker.showWindow = true;
                $scope.map.templateParameter = {
                    name: marker.name,
                    address: marker.address,
                    phone: marker.phone,
                    website: marker.website,
                    rating: marker.rating,
                };
            };
            $scope.removeMarkers = function() {
                $scope.map.markers.length = 0;
            };

        });
    });

})(angular);
