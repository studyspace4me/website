var customInterpolationApp = angular.module('customInterpolationApp', []);

customInterpolationApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

function dashboardController($http, $scope) {
    $scope.fetch = function(type) {
        $http.get("static/json/data.json").success(function (data) {
            //$scope.filterBusy = { status.busy : "false" };

            if(type == 'all') {
                $scope.results = data;
                $scope.orderByPredicate = 'name';
                $scope.filterIconBarQuery = "";
            }
            else if(type == 'favorites'){
                $scope.results = data;
                $scope.orderByPredicate = 'name';
                $scope.filterIconBarQuery = { favorite : "true" };
            }
            else if(type == 'nearest'){
                $scope.results = data;
                $scope.orderByPredicate = "";
                $scope.filterIconBarQuery = "";
            }
            else if(type == 'crowding'){
                var rooms = data["rooms"];
                rooms.sort(crowdingComparer);

                $scope.results = data;
                $scope.orderByPredicate = "";
                $scope.filterIconBarQuery = "";
            }

            //highlight the selected filter/orderby option
            $('.iconStatus').css('background-color', 'transparent');
            $('#' + type).css('background-color', 'orange');

            $scope.searchClick = function (){
              $scope.filterSearchBarQuery = { name: $scope.searchQuery };
              $scope.orderByPredicate = 'name';
            };

            $scope.getBackground = function (feedback) {
                if (feedback == "Full")
                    return { 'background-color': 'red' };
                else if (feedback == "Half")
                    return { 'background-color': 'orange' };
                else if (feedback == "Empty")
                    return  { 'background-color': 'green' };
                else if(feedback == "None")
                    return { 'background-color': 'gray' };

                return  { 'background-color': 'transparent' };
            };
            $scope.getLastUpdate = function (lastUpdate) {
                if (lastUpdate == "null")
                    return "Not updated yet";

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
        });
    };

    var initialize = function(){
        $scope.fetch('all');
    };
    initialize();
};

//empty is small than every other status
//none is greater than every other status
//full is grater than half so then half is smaller than full
var crowdingComparer= function(a,b) {
    if (a["feedback"] == b["feedback"])
        return 0;

    else if (a["feedback"] == "Empty")
        return -1;
    else if (b["feedback"] == "Empty")
        return 1;

    else if (a["feedback"] == "None")
        return 1;
    else if (b["feedback"] == "None")
        return -1;

    else if (a["feedback"] == "Full" &&  b["feedback"] == "Half")
        return 1;
    else if (a["feedback"] == "Half" && b["feedback"] == "Full")
        return -1;
};