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

            $scope.allMoods = response.data;

            $scope.labels = [];
            $scope.data = [];

            for (let i = 0; i < $scope.allMoods.length; i++) {
                $scope.labels.push($scope.allMoods[i].created_at);
                $scope.data.push($scope.allMoods[i].mood);
            }
            $scope.data = [$scope.data];

            console.log($scope.labels);
            console.log($scope.data);

            // console.log($scope.allMoods);

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

        $scope.series = ['Series A'];

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
