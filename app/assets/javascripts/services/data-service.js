(function(ng, currentUser) {
    ng.module('BlueMirrorApp').service('DataRequestService', AllDataService);

    function AllDataService($http) {
        function getData(url) {
            return $http({
                method: 'GET',
                url: url
            });
        }

        function postData(url, dataObj) {
            return $http({
                method: 'POST',
                url: url,
                dataType: "json",
                headers: {
                    "content-type": "application/json;charset=utf-8"
                },
                data: dataObj
            });
        }

        function postTodo(url, todoObj) {
            return $http({
                method: 'POST',
                url: url,
                dataType: "json",
                headers: {
                    "content-type": "application/json;charset=utf-8"
                },
                data: todoObj
            });
        }

        function patchData(url, moodList) {
            return $http({
                method: 'PATCH',
                url: url,
                dataType: "json",
                headers: {
                    "content-type": "application/json;charset=utf-8"
                },
                data: moodList
            });
        }

        function patchEntry(url, inputString) {
            return $http({
                method: 'PATCH',
                url: url,
                dataType: "json",
                headers: {
                    "content-type": "application/json;charset=utf-8"
                },
                data: {
                    text: inputString
                }
            });
        }

        function postJournal(url, journalObj) {
            return $http({
                method: 'POST',
                url: url,
                dataType: "json",
                headers: {
                    "content-type": "application/json;charset=utf-8"
                },
                data: journalObj
            });
        }

        function deleteData(url) {
            return $http({
                method: 'DELETE',
                url: url,
                headers: {
                    "content-type": "application/json;charset=utf-8"
                },
            });
        }

        return {
            get: getData,
            post: postData,
            postTodo: postTodo,
            postJournal: postJournal,
            patchEntry: patchEntry,
            delete: deleteData,
            patch: patchData
            //   put: putData,
            //   loginPost: loginPost,
            //   postScores: postScores,
            //   getScores: getScores
        };
    }


})(angular, window.currentUser);
