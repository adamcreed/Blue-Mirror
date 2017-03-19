(function(ng) {
    ng.module('BlueMirrorApp').controller('MedicineController', function($state, $scope, $compile, $timeout, uiCalendarConfig, $q, DataRequestService, UserService) {


        /* MEDICATION FUNCTIONS */

        $scope.meds = [];

        $scope.medObj = {
            name: ''
        };

        // total meds
        $scope.totalmeds = function() {
            return $scope.meds.length;
        };

        // add meds
        $scope.addmeds = function() {
            $scope.medObj.name = $scope.input;
            $scope.error = '';
            $scope.input = '';
        };

        // get meds
        // $q.when(DataRequestService.get('/meds')).then((response) => {
        //
        //     // console.log(response.data);
        //
        //     $scope.defaultTodos = response.data;
        //
        //     // for (var todo in $scope.defaultTodos) {
        //     //     $scope.allTodos = $scope.defaultTodos[todo];
        //     //     $scope.todos.push($scope.allTodos);
        //     // }
        //
        //
        // }).catch((error) => {
        //     console.log(error);
        // });


        // post meds
        // $scope.postMeds = function() {
        //
        //     if ($scope.input === undefined || $scope.input === '') {
        //
        //         $scope.error = "Please enter a task";
        //
        //     } else {
        //         $scope.addToDo();
        //
        //         $q.when(DataRequestService.postTodo('/todos', $scope.todoObj)).then((response) => {
        //             $scope.currentTodos = response.data.location;
        //             $scope.todos.push($scope.currentTodos);
        //
        //         }).catch((error) => {
        //             console.log(error);
        //         });
        //     }
        //
        // };


        // delete meds
        // $scope.deleteMeds = function() {
        //
        //     for (let i = $scope.todos.length - 1; i >= 0; i--) {
        //
        //         if ($scope.todos[i].done === true) {
        //             $q.when(DataRequestService.delete(`/todos/${$scope.todos[i].id}`)).then((response) => {
        //
        //             }).catch((error) => {
        //                 console.log(error);
        //             });
        //
        //             $scope.todos.splice(i, 1);
        //         }
        //     }
        // };











        /* CALENDAR FUNCTIONS  */

        $scope.currentView = 'month';

        /* event source that contains custom events on the scope */
        $scope.events = [];

        // console.log($scope.events);

        $scope.remove = function(index) {
            $scope.events.splice(index, 1);
        };

        /* add custom event*/
        $scope.addEvent = function() {

            $scope.events.push({
                id: event.id,
                title: $scope.ev.title,
                start: moment($scope.ev.from),
                // end: moment($scope.ev.to),
                allDay: true,
                // className: ['openSesame'],
                stick: true
            });
            console.log($scope.eventObj);
            console.log($scope.events);

            $scope.eventObj.title = $scope.ev.title;
            $scope.eventObj.from = moment($scope.ev.from);

            $q.when(DataRequestService.post('/events', $scope.eventObj)).then((response) => {

                console.log(response);

                $scope.eventId = response.id;

            }).catch((error) => {
                console.log(error);
            });
        };

        /* Change View */
        $scope.changeView = function(view, calendar) {
            $scope.currentView = view;
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        };

        /* Change View */
        $scope.renderCalender = function(calendar) {
            $timeout(function() {
                if (uiCalendarConfig.calendars[calendar]) {
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            });
        };


        /* Event Render */
        $scope.eventRender = function(event, element, view) {
            console.log(event);
            element.attr({
                'tooltip': event.title,
                'tooltip-append-to-body': true
            });
            $compile(element)($scope);
            element.append("<span class='closeon'>X</span>");
            element.find(".closeon").click(function() {
                $('.calendar').fullCalendar('removeEvents', event.id);
                console.log($scope.events);
            });
        };
        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                eventClick: function(event) {
                    $(".closon").click(function() {
                        $('.calendar').fullCalendar('removeEvents', event.id);
                    });
                },
                header: {
                    left: 'title',
                    center: 'myCustomButton',
                    right: 'today prev,next'
                },
                dayClick: $scope.alertOnDayClick,
                // eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };


        /* event sources array*/
        $scope.eventSources = [$scope.events];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

        $scope.eventObj = {
            title: '',
            from: ''
        };

        // GET EVENTS
        $q.when(DataRequestService.get('/events')).then((response) => {

            $scope.loadedEvents = response.data;

            $('.calendar').fullCalendar('addEventSource', $scope.loadedEvents);


            console.log(response);

            console.log($scope.events);
        }).catch((error) => {
            console.log(error);
        });


    });

})(angular);
