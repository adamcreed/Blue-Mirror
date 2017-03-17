(function(ng) {
    ng.module('BlueMirrorApp').controller('MoodController', function($state, $scope, $q, DataRequestService, UserService) {

        $(document).ready(function() {
            var ctx = document.getElementById('chartJSContainer').getContext('2d');
            new Chart(ctx, options);
            var options = {
                type: 'line',
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
                            borderWidth: 1
                        },
                        {
                            label: '# of Points',
                            data: [7, 11, 5, 8, 3, 7],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                reverse: false
                            }
                        }]
                    }
                }
            };
            // angular.element(document).ready(function() {
            //     var ctx = $('#mycanvas').get(0).getContext("2d");
            //
            //     var data = [{
            //             value: 270,
            //             color: 'blue',
            //             highlight: 'lightskyblue',
            //             label: 'blue'
            //         },
            //         {
            //             value: 270,
            //             color: 'blue',
            //             highlight: 'lightskyblue',
            //             label: 'blue'
            //         },
            //         {
            //             value: 50,
            //             color: 'lightgreen',
            //             highlight: 'yellowgreen',
            //             label: 'lightgreen'
            //         },
            //         {
            //             value: 40,
            //             color: 'orange',
            //             highlight: 'darkorange',
            //             label: 'orange'
            //         },
            //     ];
            //     var piechart = new Chart(ctx).Pie(data);
            // });
        });
    });
})(angular);
