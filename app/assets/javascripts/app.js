(function(ng) {
        ng.module('BlueMirrorApp', ['ui.router', 'templates']);

        ng.module('BlueMirrorApp').config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');
            $urlRouterProvider.when('/', '/' + 'login');

            $stateProvider.state('BlueParent', {
                url: '/',
                abstract: true,
                template: '<ui-view></ui-view>',
            }).state('BlueParent.login', {
                url: 'login',
                templateUrl: 'login-template.html',
                // controller: "LoginController as login"
            }).state('BlueParent.profile', {
                url: 'profile',
                templateUrl: 'user-profile.html',
                controller: "ProfileController as profile"
            });
            // }).state('BlueParent.meds', {
            //     url: 'medication'
            //     // templateUrl: 'game.html',
            //     // controller: "GameController as game"
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
