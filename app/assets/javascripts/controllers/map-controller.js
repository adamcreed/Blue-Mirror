(function(ng) {
    ng.module('BlueMirrorApp').controller('MapController', function($state, $scope, $q, DataRequestService, UserService, uiGmapGoogleMapApi) {

        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = {
                center: {
                    latitude: 45,
                    longitude: -73
                },
                zoom: 8
            };
            $scope.marker = {
                id: 0,
                coords: {
                    latitude: 45,
                    longitude: -73
                },
                options: { draggable: true },
                events: {
                    dragend: function (marker, eventName, args) {

                        $scope.marker.options = {
                            draggable: true,
                            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                            labelAnchor: "100 0",
                            labelClass: "marker-labels"
                        };
                    }
                }
            };
            var events = {
                places_changed: function (searchBox) {
                    var place = searchBox.getPlaces();
                    if (!place || place == 'undefined' || place.length == 0) {
                        console.log('no place data :(');
                        return;
                    }

                    $scope.map = {
                        "center": {
                            "latitude": place[0].geometry.location.lat(),
                            "longitude": place[0].geometry.location.lng()
                        },
                        "zoom": 18
                    };
                    $scope.marker = {
                        id: 0,
                        coords: {
                            latitude: place[0].geometry.location.lat(),
                            longitude: place[0].geometry.location.lng()
                        }
                    };
                }
            };
            $scope.searchbox = { template: 'searchbox.tpl.html', events: events };








   });
});

})(angular);
