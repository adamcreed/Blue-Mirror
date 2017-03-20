(function(ng) {
    ng.module('BlueMirrorApp').controller('JournalController', function($state, $scope, $q, DataRequestService, UserService) {

        $scope.currentUser = UserService.getUser();
        $scope.journalObj = {
            text: '',
            title: ''
        };

        $scope.journalsArray = [];
        console.log($scope.journalsArray);

        $scope.addJournals = function() {
            $scope.journalObj.title = $scope.title;
            $scope.journalObj.text = $scope.text;
            $scope.journalObj.day = $scope.day;
            console.log();
            $scope.title = '';
            $scope.text = '';
            $scope.error = '';
        };

        $scope.postJournals = function() {
            if ($scope.text === undefined || $scope.text === '') {

                $scope.error = "Please submit your journal entry";

            } else {
                $scope.addJournals();
                $q.when(DataRequestService.postJournal('/notes', $scope.journalObj)).then((response) => {
                    $scope.currentJournal = response.data.location;
                    $scope.journalsArray.push($scope.currentJournal);
                    console.log('journalsArray', $scope.journalsArray);
                }).catch((error) => {
                    console.log(error);
                });
            }
        };
        // delete entries
        $scope.deleteJournalEntry = function(entry) {
            let i = $scope.journalsArray.indexOf(entry);

            $q.when(DataRequestService.delete(`/notes/${$scope.journalsArray[i].id}`)).then((response) => {}).catch((error) => {
                console.log(error);
            });
            $scope.journalsArray.splice(i, 1);

        };
        $scope.patchJournalText = function(input, entry) {
            console.log('input', JSON.stringify(input));

            let i = ($scope.journalsArray.indexOf(entry)) + 1;
            let inputString = JSON.stringify(input);
            console.log('blah blah blah', $scope.journalsArray[i].id);
            $q.when(DataRequestService.patchEntry(`/notes/${$scope.journalsArray[i].id}`, inputString)).then((response) => {
                console.log('response', response.data);
                $scope.journalsArray[i].text = response.data;
            }).catch((error) => {
                console.log(error);
            });
        };

        $scope.toggleTextarea = function() {
            $scope.edit = null;
        };

        //get past entries
        $q.when(DataRequestService.get('/notes')).then((response) => {
            $scope.pastJournals = response.data;
            for (var entry in $scope.pastJournals) {
                $scope.pastEntries = $scope.pastJournals[entry];
                $scope.journalsArray.push($scope.pastEntries);
            }


        }).catch((error) => {
            console.log(error);
        });

    });
})(angular);
