(function(ng) {
    ng.module('BlueMirrorApp').controller('TodoController', function($state, $scope, $q, DataRequestService, UserService) {

        $scope.currentUser = UserService.getUser();

        $scope.todoObj = {
            todo: ''
        };

        $scope.todos = [];
        console.log($scope.todos);
        $scope.randomArray = [];

        // total todos
        $scope.totalToDo = function() {
            return $scope.todos.length;
        };

        // add todos
        $scope.addToDo = function() {
            $scope.todoObj.todo = $scope.input;
            $scope.error = '';
            $scope.input = '';
        };

        // get todos
        $q.when(DataRequestService.get('/todos')).then((response) => {

            // console.log(response.data);

            $scope.defaultTodos = response.data;

            for (var todo in $scope.defaultTodos) {
                $scope.allTodos = $scope.defaultTodos[todo];
                $scope.todos.push($scope.allTodos);
            }


        }).catch((error) => {
            console.log(error);
        });

        //get others' todos
        $scope.othersTodos = function() {
            $q.when(DataRequestService.get('/todos/featured')).then((response) => {
                let data = response.data;
                $scope.shuffle(data);
            }).catch((error) => {
                console.log(error);
            });
        };

        $scope.clearOthers = function() {
            $scope.randomArray = [];
        };

        //shuffle and push featured to dos
        $scope.shuffle = function(data) {

            for (var i = data.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
            console.log('data', data);
            for (let i = 0; i < 5; i++) {
                $scope.randomArray.push(data[i]);
                console.log('eh', $scope.randomArray);
            }

        };
        // post todos
        $scope.postTodos = function() {

            if ($scope.input === undefined || $scope.input === '') {

                $scope.error = "Please enter a task";

            } else {
                $scope.addToDo();

                $q.when(DataRequestService.postTodo('/todos', $scope.todoObj)).then((response) => {
                    $scope.currentTodos = response.data.location;
                    $scope.todos.push($scope.currentTodos);

                }).catch((error) => {
                    console.log(error);
                });
            }

        };

        // delete todos
        $scope.deleteTodos = function() {

            for (let i = $scope.todos.length - 1; i >= 0; i--) {

                if ($scope.todos[i].done === true) {
                    $q.when(DataRequestService.delete(`/todos/${$scope.todos[i].id}`)).then((response) => {

                    }).catch((error) => {
                        console.log(error);
                    });

                    $scope.todos.splice(i, 1);
                }
            }
        };
    });

})(angular);
