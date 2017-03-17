(function(ng, currentUser) {

    ng.module('BlueMirrorApp').controller('ProfileController', function($state, $scope, $q, DataRequestService, UserService) {

        $scope.currentUser = UserService.getUser();

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
            console.log($scope.currentMood);

        }).catch((error) => {
            console.log(error);
        });

        // get selection value
        $scope.change = function() {
            $scope.moodObj.mood = Number($scope.value);
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
                $scope.moodObj.mood = 1;
                $scope.explanation.text = '';

            }).catch((error) => {
                console.log(error);
            });
        };

        // patch moods
        // $scope.editMoods = function() {
        //     $q.when(DataRequestService.patch(`/moods/${$scope.currentMood.id}`)).then((response) => {
        //         console.log(response);
        //
        //     }).catch((error) => {
        //         console.log(error);
        //     });
        // };


        // CHART MOODS

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40]
        ];

        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };

        $scope.datasetOverride = [{
            yAxisID: 'y-axis-1'
        }];
        $scope.options = {
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }]
            }
        };






    });

})(angular);
