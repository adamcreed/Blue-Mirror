(function(ng, currentUser) {
    ng.module('BlueMirrorApp').controller('ProfileController', function($state, $scope, $q, DataRequestService, UserService) {
        $scope.currentUser = UserService.getUser();

        $( function() {
            $( document ).tooltip();
        });

        $scope.moodList = moodList;
        $scope.fullMoodList;
        $scope.highestMood = 1;

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
            }


            if (_.max($scope.data) > $scope.moodList.length) {
                $scope.highestMood = _.max($scope.data);
            } else {
                $scope.highestMood = $scope.moodList.length;
            }
            $scope.fullMoodList = $scope.getList($scope.moodList, $scope.highestMood);
            $scope.data = [$scope.data];


        }).catch((error) => {
            console.log(error);
        });

        $scope.getList = function(data, max) {
            let list = _.range(1, max + 1);
            for (let i = 0; i < data.length; i++) {
                list[i] = data[i].text;
            }
            return list;
        };

        // get selection value
        $scope.change = function() {
            $scope.moodObj.mood = Number($scope.value);
        };

        // post moods
        $scope.postMoods = function() {
            $q.when(DataRequestService.post('/moods', $scope.moodObj)).then((response) => {
                $scope.moodObj.mood = 1;
                $scope.isSubmitted = true;

            }).catch((error) => {
                console.log(error);
            });
        };


        // customize moods
        $scope.newList = '';

        // TODO: refactor loops

        $scope.$watch('newList', function() {

            if ($scope.newList.length === 0) {
                return;
            }

            moodList = [];
            for (let i = 0; i < $scope.list.length; i++) {
                if ($scope.list[i].text) {
                    moodList.push({
                        text: $scope.list[i].text
                    });
                }
            }
        });

        $scope.list = [];

        $scope.$watch('list', function() {

            for (let i = 0; i < $scope.moodList.length; i++) {
                $scope.list.push({
                    text: $scope.moodList[i].text
                });
            }

            $scope.save = function() {
                $scope.newList = '';

                for (let i = 0; i < $scope.list.length; i++) {
                    if ($scope.list[i].text) {
                        $scope.newList += $scope.list[i].text + ', ';
                    }
                }

                $scope.newList = $scope.newList.slice(0, -2);

                $q.when(DataRequestService.patch('/mood_lists', {
                    moods: $scope.newList
                })).then((response) => {
                    $state.go('BlueParent.update');

                }).catch((error) => {
                    console.log(error);
                });
            };

            $scope.del = function(item) {
                let index = $scope.list.indexOf(item);
                $scope.list.splice(index, 1);
            };

            $scope.isDisabled = function() {
                if ($scope.list.length === 10) {
                    return true;
                }
            };
        });

        // SMS OPT IN

        $scope.phoneCarriers = carriers;
        $scope.smsForm = '';
        $scope.currentFrequency = '';
        $scope.currentCarrier = '';

        // SMS OPTING
        $scope.submitSms = function() {
            $scope.smsForm.$setSubmitted();
            $scope.currentFrequency = $scope.smsFrequency;
            $scope.currentCarrier = $scope.smsCarrier;
            $scope.telNumber = $scope.num;

            $q.when(DataRequestService.patchNumber('/users/phone', $scope.telNumber, $scope.currentCarrier, $scope.currentFrequency)).then((response) => {
                console.log(response);
                // console.log($scope.currentFrequency);
                // console.log($scope.currentCarrier);
                // console.log($scope.telNumber);

            }).catch((error) => {
                console.log(error);
            });

            $scope.success = true;
        };

        $scope.optedIn = function() {
          return $scope.currentUser.phone
        }

        $scope.smsFormValid = function() {
            return $scope.smsForm.number.$invalid || $scope.smsForm.phonecarrier.$invalid || $scope.smsForm.frequency.$invalid;
        };

        $scope.deleteSms = function() {
            $scope.currentFrequency = null;
            $scope.currentCarrier = null;
            $scope.telNumber = '';

            $q.when(DataRequestService.patchNumber('/users/phone', $scope.telNumber, $scope.currentCarrier, $scope.currentFrequency)).then((response) => {
                console.log(response);

            }).catch((error) => {
                console.log(error);
            });

        };



        // CHART MOODS
        $scope.$watch('fullMoodList', function() {
            $scope.drawChart();
        });

        $scope.drawChart = function() {
            $scope.options = {
                responsive: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: '#35635d',
                            minRotation: 20
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: '#35635d',
                            min: 0,
                            max: $scope.highestMood,
                            stepSize: 1,
                            callback: function(tick, index, ticksArray) {
                                if (tick === 0) {
                                    return '';
                                }
                                return $scope.fullMoodList[tick - 1];
                            }
                        }
                    }]
                },
                tooltips: {
                    enabled: false,
                }
            };
        };

    });
})(angular);
