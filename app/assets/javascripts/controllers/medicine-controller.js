(function(ng) {
    ng.module('BlueMirrorApp').controller('MedicineController', function($state, $scope,  $compile, $timeout, uiCalendarConfig, $q, DataRequestService, UserService) {


        /* MEDICATION FUNCTIONS */

        $scope.medications = [];

        $scope.medObj = {
                     name: ''
                    };

        // total meds
        $scope.totalmeds = function() {
            return $scope.medications.length;
        };

        // add meds
        $scope.addMeds = function() {
            $scope.medObj.name = $scope.input;
            $scope.error = '';
            $scope.input = '';
        };

        // get meds
        $q.when(DataRequestService.get('/meds')).then((response) => {

            console.log(response.data);

            $scope.defaultMeds = response.data;

            for (var med in $scope.defaultMeds) {
                $scope.allMedications = $scope.defaultMeds[med];
                $scope.medications.push($scope.allMedications);
            }


        }).catch((error) => {
            console.log(error);
        });

        // post meds
        $scope.postMeds = function() {
            // debugger;

            if ($scope.input === undefined || $scope.input === '') {

                $scope.error = "Please enter a medication";

            } else {
                $scope.addMeds();

                $q.when(DataRequestService.postTodo('/meds', $scope.medObj)).then((response) => {

                    $scope.currentMeds = response.data.location;
                    $scope.medications.push($scope.currentMeds);

                }).catch((error) => {
                    console.log(error);
                });
            }

        };

        // delete meds
        $scope.deleteMeds = function() {

            for (let i = $scope.medications.length - 1; i >= 0; i--) {

                if ($scope.medications[i].done === true) {
                    $q.when(DataRequestService.delete(`/meds/${$scope.medications[i].id}`)).then((response) => {

                        console.log(response);

                    }).catch((error) => {
                        console.log(error);
                    });

                    $scope.medications.splice(i, 1);
                }
            }
        };


        /* CALENDAR FUNCTIONS  */

        $scope.currentView = 'month';

        /* event source that contains custom events on the scope */
        $scope.events = [];

        /* add custom event*/
        $scope.addEvent = function () {
          $q.when(DataRequestService.post('/events', $scope.eventObj)).then((response) => {

              $scope.eventId = response.data.location.id;

          }).catch((error) => {
              console.log(error);
          });

            $scope.events.push({
                _id: $scope.eventId,
                title: $scope.ev.title,
                start: moment($scope.ev.from),
                allDay: true,
                stick: true
            });

            $scope.eventObj.title = $scope.ev.title;
            $scope.eventObj.from = moment($scope.ev.from);
        };

        /* Change View */
        $scope.changeView = function (view, calendar) {
            $scope.currentView = view;
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        };

        /* Change View */
        $scope.renderCalender = function (calendar) {
            $timeout(function () {
                if (uiCalendarConfig.calendars[calendar]) {
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            });
        };

        /* Event Render */
        $scope.eventRender = function (event, element, view) {
            element.attr({'tooltip': event.title, 'tooltip-append-to-body': true});
            $compile(element)($scope);
            element.append( "<span class='closeon'>X</span>");
            element.append( "<span class='closeon'>⭐</span>");
            element.find(".closeon").click(function() {
                $q.when(DataRequestService.delete(`/events/${event._id}`)).then((response) => {

                    $('.calendar').fullCalendar('removeEvents', event._id);

                }).catch((error) => {
                    console.log(error);
                });
            });
        };

        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                eventClick: function(event){
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

        /* get events */
        $q.when(DataRequestService.get('/events')).then((response) => {

            $scope.loadedEvents = response.data;

            $('.calendar').fullCalendar('addEventSource', $scope.loadedEvents);

        }).catch((error) => {
            console.log(error);
        });

    });
})(angular);
