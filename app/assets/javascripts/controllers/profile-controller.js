(function(ng, currentUser) {

    ng.module('BlueMirrorApp').controller('ProfileController', function($state, $scope, $q, DataRequestService, UserService) {

    // $( document ).ready(function() {

        $scope.currentUser = UserService.getUser();
        // $scope.moodSelection = null;
        $scope.currentMood = null;
        $scope.explanation = {
                                text: ''
                            };

        $scope.moodObj = {
                            mood: null,
                            reason: null
                        };


        // get moods
        $q.when(DataRequestService.get('/moods')).then((response) => {

            $scope.currentMood = response.data;

        }).catch((error) => {
            console.log(error);
        });

        // get selection value
        $scope.change = function () {
            $scope.moodObj.mood = $scope.value;
            console.log($scope.moodObj);
        };

        // get user explanation
        $scope.getExplanation = function() {
            $scope.moodObj.reason = $scope.explanation.text;
            console.log($scope.moodObj);

        };

        // post moods
        $scope.postMoods = function() {
            $scope.getExplanation();

            $q.when(DataRequestService.post('/moods', $scope.moodObj)).then((response) => {

                console.log(response);

            }).catch((error) => {
                console.log(error);
            });


        };






    // });

    });

})(angular);
