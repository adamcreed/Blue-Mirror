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
            $scope.reasons = [];

            for (let i = 0; i < $scope.allMoods.length; i++) {
                $scope.labels.push($scope.allMoods[i].day);
                $scope.data.push($scope.allMoods[i].mood);
                $scope.reasons.push($scope.allMoods[i].reason);
            }
            $scope.data = [$scope.data];

            console.log($scope.data);


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

        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };

        $scope.options = {
            responsive: true,
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: 'blue',
                        fontStyle: 'italic',
                        minRotation: 20
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: 'blue',
                        min: 0,
                        max: 5,
                        stepSize: 1,
                        callback: function(tick, index, ticksArray) {
                            if (tick === 1) {
                                return 'Terrible';
                            } if (tick === 2) {
                                return 'Bad';
                            } if (tick === 3) {
                                return 'Neutral';
                            } if (tick === 4) {
                                return 'Good';
                            } if (tick === 5) {
                                return 'Great';
                            }
                        }
                    }
                }]
            },
            tooltips: {
                enabled: false,
            }
        };

    });

})(angular);
