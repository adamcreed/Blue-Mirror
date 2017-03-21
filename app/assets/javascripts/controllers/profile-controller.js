(function(ng, currentUser) {
    ng.module('BlueMirrorApp').controller('ProfileController', function($state, $scope, $q, DataRequestService, UserService) {
        $scope.currentUser = UserService.getUser();

        $scope.moodList = moodList;

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

        }).catch((error) => {
            console.log(error);
        });

        // get selection value
        $scope.change = function() {
            $scope.moodObj.mood = Number($scope.value);
        };

        // get user explanation
        $scope.getExplanation = function() {
            $scope.moodObj.reason = $scope.explanation.text;
        };

        // post moods
        $scope.postMoods = function() {
            $scope.getExplanation();
            $q.when(DataRequestService.post('/moods', $scope.moodObj)).then((response) => {
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

        // customize moods

        $scope.$watch('$scope.newList', function() {
            $scope.moodList = moodList;
            console.log($scope.moodList);
        });

        $scope.list = [];

        for (let i = 0; i < $scope.moodList.length; i++) {
            $scope.list.push({
                text: $scope.moodList[i]
            });
        }

        $scope.save = function () {
            $scope.newList = '';

            for (let i = 0; i < $scope.list.length; i++) {
                if ($scope.list[i].text) {
                    $scope.newList += $scope.list[i].text + ', ';
                }
            }

            $scope.newList = $scope.newList.slice(0, -2);

            console.log($scope.newList);

            $q.when(DataRequestService.patch('/mood_lists', { moods: $scope.newList })).then((response) => {
                $state.go('BlueParent.profile');

            }).catch((error) => {
                console.log(error);
            });
        };

        // CHART MOODS
        $scope.options = {
            responsive: true,
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: 'blue',
                        minRotation: 20
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: 'blue',
                        min: 0,
                        max: moodList.length,
                        stepSize: 1,
                        callback: function(tick, index, ticksArray) {
                            if (tick === 0) {
                              return '';
                            }
                            return moodList[tick - 1];
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
