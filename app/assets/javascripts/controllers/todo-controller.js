(function(ng) {
    ng.module('BlueMirrorApp').controller('TodoController', function($state, $scope, $q, DataRequestService, UserService) {

        $scope.currentUser = UserService.getUser();

        $scope.todoObj = {
            todo: ''
        };

        $scope.todos = [];

        // total todos
        $scope.totalToDo = function() {
            return $scope.todos.length;
        };

        // add todos
        $scope.addToDo = function() {

            $scope.todoObj.todo = $scope.input;

            if ($scope.input === undefined || $scope.input === '') {

                $scope.error = "Please enter a task";

            } else {
                $scope.todos.push({
                    "todo": $scope.input,
                    "done": false
                });
                $scope.error = "";
                $scope.input = "";
            }
        };

        // clear todos
        $scope.clearCompleted = function() {

            for (let i = $scope.todos.length - 1; i >= 0; i--) {

                if ($scope.todos[i].done === true) {
                    $scope.todos.splice(i, 1);
                }
            }
        };

        // get todos
        $q.when(DataRequestService.get('/todos')).then((response) => {

            console.log(response.data);

            // $scope.defaultTodos = response.data.slice(0, 5);

            $scope.defaultTodos = response.data;

            for(var todo in $scope.defaultTodos) {
                $scope.allTodos = $scope.defaultTodos[todo];
                $scope.todos.push($scope.allTodos);
                console.log($scope.todos);
}


        }).catch((error) => {
            console.log(error);
        });

        // post todos
        $scope.postTodos = function() {

            $scope.addToDo();

            $q.when(DataRequestService.postTodo('/todos', $scope.todoObj)).then((response) => {
                $scope.currentTodos = response.data.location;
                console.log($scope.currentTodos);

            }).catch((error) => {
                console.log(error);
            });
        };

        // delete todos
        $scope.deleteTodos = function() {

            $scope.clearCompleted();

            $q.when(DataRequestService.delete(`/todos/${$scope.currentTodos.id}`)).then((response) => {

            }).catch((error) => {
                console.log(error);
            });

        };


    });

})(angular);
