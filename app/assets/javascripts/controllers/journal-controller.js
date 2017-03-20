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
                    $scope.currentJournal = response.data;
                    $scope.journalsArray.push($scope.currentJournal);
                }).catch((error) => {
                    console.log(error);
                });
            }
        };
        // delete entries
        console.log('id', $scope.journalsArray.id);
        $scope.deleteJournalEntry = function(entry) {
            let i = $scope.journalsArray.indexOf(entry);
            console.log('done');
            $q.when(DataRequestService.delete(`/notes/${$scope.journalsArray[i].id}`)).then((response) => {}).catch((error) => {
                console.log(error);
                $scope.todos.splice(i, 1);
            });

        };
        $scope.patchJournalText = function(text) {
            $q.when(DataService.patch(`/notes/${$scope.journalsArray[i].text}`)).then((response) => {
                $scope.journalsArray[i].text = response.data.text;
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
            console.log('in');
            for (var entry in $scope.pastJournals) {
                $scope.pastEntries = $scope.pastJournals[entry];
                $scope.journalsArray.push($scope.pastEntries);
            }


        }).catch((error) => {
            console.log(error);
        });

    });
})(angular);
