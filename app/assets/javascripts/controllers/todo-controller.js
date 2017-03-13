(function(ng) {
    ng.module('BlueMirrorApp').controller('TodoController', function($state, $scope, $q) {

        $scope.todos = [
                        {
                            "text": '',
                            "done": false,
                        }
                       ];


          $scope.totalToDo = function() {
             return $scope.todos.length;
         };


          $scope.addToDo = function() {

              if ($scope.input === undefined) {

                  $scope.error ="Please enter a task";

              } else {
                  $scope.todos.push({"text":$scope.input,"done":false});

                  $scope.error ="";
                  $scope.input = "";
             }
         };


          $scope.clearCompleted = function() {

            for (let i = $scope.todos.length - 1; i >= 0; i--) {

                if ($scope.todos[i].done === true) {
                    $scope.todos.splice(i,1);
                }
            }


    };
});

})(angular);
