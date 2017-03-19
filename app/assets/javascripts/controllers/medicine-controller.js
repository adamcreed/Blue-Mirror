(function(ng) {
    ng.module('BlueMirrorApp').controller('MedicineController', function($state, $scope,  $compile, $timeout, uiCalendarConfig, $q, DataRequestService, UserService) {

            $scope.currentView = 'month';

            /* event source that contains custom events on the scope */
            $scope.events = [];

            // console.log($scope.events);

            $scope.remove = function(index) {
                $scope.events.splice(index,1);
            };

            /* add custom event*/
            $scope.addEvent = function () {

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
                console.log(event);
                element.attr({'tooltip': event.title, 'tooltip-append-to-body': true});
                $compile(element)($scope);
                element.append( "<span class='closeon'>X</span>" );
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
