var customInterpolationApp = angular.module('customInterpolationApp', []);

customInterpolationApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

function dashboardController($http, $scope) {
    $scope.fetch = function(type) {
        $http.get("/api/rooms/").success(function (data) {
            if(type == 'all') {
                $scope.results = data;
            }
            else if(type == 'favorites'){

            }
            else if(type == 'nearest'){

            }
            else if(type == 'crowding'){

            }

            //highlight the selected filter/orderby option
            $('.iconStatus').css('background-color', 'transparent');
            $('#' + type).css('background-color', 'orange');

            $scope.getBackground = function (feedback) {
                if (feedback == "Full")
                    return { 'background-color': 'red' };
                else if (feedback == "Half")
                    return { 'background-color': 'orange' };
                else if (feedback == "Empty")
                    return  { 'background-color': 'green' };

                return  { 'background-color': 'transparent' };
            };
            $scope.getLastUpdate = function (lastUpdate) {
                return "Updated " + moment(lastUpdate).fromNow();
            };
            $scope.getTime = function (until) {
                return "Next lecture " + moment(until).fromNow();
            };
            $scope.getFavoriteImage = function (favorite) {
                if (favorite == true)
                    return "static/assets/icons/favorite.svg";

                return "static/assets/icons/emptyFavorite.svg";
            };
            $scope.getRoomIcon = function (type) {
                return "static/assets/icons/" + type + ".svg";
            };
            $scope.showContent = function (id) {
                if ($("#" + id).is(":hidden")) {
                    $(".contentPanel").hide('fast');
                    $("#" + id).slideDown();
                }
                else
                    $("#" + id).slideUp();

                getMap(id);
                Swap("map" + id);
                google.maps.event.trigger(mapV, "resize"); // resize map
            };
            $scope.changeFavorite = function (id) {
                var srcImage = $("#" + id).attr('src');
                if (srcImage.indexOf("emptyFavorite") >= 0)
                    $("#" + id).attr('src', 'static/assets/icons/favorite.svg');
                else
                    $("#" + id).attr('src', 'static/assets/icons/emptyFavorite.svg');
            };
            $scope.reload = function () {
                //$route.reload();
                alert('lol');
            };
            $scope.order = function () {

            };
        });
    };

    var initialize = function(){
        $scope.fetch('all');
    };
    initialize();
}