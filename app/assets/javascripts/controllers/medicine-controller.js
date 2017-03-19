(function(ng) {
    ng.module('BlueMirrorApp').controller('MedicineController', function($state, $scope,  $compile, $timeout, uiCalendarConfig, $q, DataRequestService, UserService) {


        var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            $scope.currentView = 'month';

            /* event source that contains custom events on the scope */
            $scope.events = [];

            console.log($scope.events);

            /* event source that calls a function on every view switch */
            $scope.eventsF = function (start, end, timezone, callback) {
                var s = new Date(start).getTime() / 1000;
                var e = new Date(end).getTime() / 1000;
                var m = new Date(start).getMonth();
                var events = [{
                    title: 'Feed Me ' + m,
                    start: s + (50000),
                    end: s + (100000),
                    allDay: false,
                    className: ['customFeed']
                }];
                callback(events);
            };

            $scope.calEventsExt = {
                color: '#f00',
                textColor: 'yellow',
                events: [{
                    type: 'party',
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false
                }, {
                    type: 'party',
                    title: 'Lunch 2',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false
                }, {
                    type: 'party',
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: 'http://google.com/'
                }]
            };


            // /* alert on eventClick */
            // $scope.alertOnEventClick = function (date, jsEvent, view) {
            //     $scope.alertMessage = (date.title + ' was clicked ');
            // };

            // /* alert on Drop */
            // $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            //     $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
            // };
            //
            // /* alert on Resize */
            // $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            //     $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
            // };

            $scope.remove = function(index) {
                $scope.events.splice(index,1);
            };

            /* add and removes an event source of choice */
            $scope.addRemoveEventSource = function (sources, source) {
                var canAdd = 0;
                angular.forEach(sources, function (value, key) {
                    if (sources[key] === source) {
                        sources.splice(key, 1);
                        canAdd = 1;
                    }
                });
                if (canAdd === 0) {
                    sources.push(source);
                }
            };

            /* add custom event*/
            $scope.addEvent = function () {
                $scope.events.push({
                    title: $scope.ev.title,
                    start: moment($scope.ev.from),
                    end: moment($scope.ev.to),
                    allDay: true,
                    className: ['openSesame'],
                    stick: true
                });
                console.log($scope.events);
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
                element.append( "<span class='closeon'>X</span>" );
                element.find(".closeon").click(function() {
                    $('.calendar').fullCalendar($scope.remove(), event._id);
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
			            $('.calendar').fullCalendar($scope.remove(), event._id);
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
            $scope.eventSources = [$scope.events, $scope.eventsF];
            $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];





});

})(angular);
