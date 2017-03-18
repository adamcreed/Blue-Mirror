(function(ng) {
    ng.module('BlueMirrorApp', ['ui.router', 'templates', 'uiGmapgoogle-maps', 'nemLogging', 'ngGeolocation', 'chart.js'])

        .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProviders) {
            uiGmapGoogleMapApiProviders.configure({
                key: 'AIzaSyAp0S6RJ9DAtCo8ODnJffXAu8SIIYGIIP4',
                libraries: 'weather,geometry,visualization,places'
            });
        }]);

    ng.module('BlueMirrorApp').config(function($stateProvider, $locationProvider, $urlRouterProvider) {
      $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('/', '/' + 'login');

        $stateProvider.state('BlueParent', {
            url: '/',
            abstract: true,
            template: '<ui-view></ui-view>'
        }).state('BlueParent.login', {
            url: 'login',
            templateUrl: 'login-template.html'
        }).state('BlueParent.profile', {
            url: 'profile',
            templateUrl: 'user-profile.html',
            controller: "ProfileController as profile"
        }).state('BlueParent.counselors', {
            url: 'counselors',
            templateUrl: 'map-template.html',
            controller: "MapController as map"
        }).state('BlueParent.place', {
            url: 'place',
            templateUrl: 'place.html',
            controller: "MapController as map"
        }).state('BlueParent.mood', {
            url: 'mood',
            templateUrl: 'chart-template.html',
            controller: "ProfileController as profile"
        }).state('BlueParent.journal', {
            url: 'journal',
            templateUrl: 'journal-template.html',
            controller: "JournalController as journal"
        });
        // }).state('BlueParent.journal', {
        //     url: 'journal'
        //     // templateUrl: 'leader.html',
        //     // controller: "GameController as game"
        // }).state('BlueParent.logout', {
        //     url: 'logout'
        //     // templateUrl: 'login.html',
        // });
    });

})(angular);
