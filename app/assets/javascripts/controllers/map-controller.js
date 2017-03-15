(function(ng) {
    ng.module('BlueMirrorApp').controller('MapController', function($state, $scope, $q, DataRequestService, UserService, uiGmapGoogleMapApi) {

        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = {
                center: {
                    latitude: 45,
                    longitude: -73
                },
                options: {
                    maxZoom: 6,
                    minZoom: 3
                },
                zoom: 16,
                control: {},
                markers: [],
                place: '',
                result: ''
            };

            $scope.placeSearch = function(place) {
                var request = {
                    location: {
                        lat: $scope.map.center.latitude,
                        lng: $scope.map.center.longitude
                    },
                    radius: place.radius,
                    query: place.query
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
                        message: place.name // TODO: play around with place obj/details
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
