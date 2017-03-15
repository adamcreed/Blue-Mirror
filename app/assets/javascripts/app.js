(function(ng) {
        ng.module('BlueMirrorApp', ['ui.router', 'templates', 'uiGmapgoogle-maps', 'nemLogging'])


        .config( ['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProviders) {
        uiGmapGoogleMapApiProviders.configure({
            key: 'AIzaSyAp0S6RJ9DAtCo8ODnJffXAu8SIIYGIIP4',
            libraries: 'weather,geometry,visualization'
        });
    }]
);





        //     function(uiGmapGoogleMapApiProviders) {
        //     uiGmapGoogleMapApiProviders.configure({
        //         key: 'AIzaSyAp0S6RJ9DAtCo8ODnJffXAu8SIIYGIIP4',
        //         v: '3.20', //defaults to latest 3.X anyhow
        //         libraries: 'weather,geometry,visualization'
        //     });
        // });


        ng.module('BlueMirrorApp').config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');
            $urlRouterProvider.when('/', '/' + 'login');

            $stateProvider.state('BlueParent', {
                url: '/',
                abstract: true,
                template: '<ui-view></ui-view>'
            }).state('BlueParent.login', {
                url: 'login',
                templateUrl: 'login-template.html'
                // controller: "LoginController as login"
            }).state('BlueParent.profile', {
                url: 'profile',
                templateUrl: 'user-profile.html',
                controller: "ProfileController as profile"
            }).state('BlueParent.counselors', {
                url: 'counselors',
                templateUrl: 'map-template.html',
                controller: "MapController as map"
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
