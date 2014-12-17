var customInterpolationApp = angular.module('customInterpolationApp', []);

customInterpolationApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

function dashboardController($http, $scope) {
    var selectedOrderby = "Name"; //initial value

    $scope.fetch = function(filter) {
        $http.get("static/json/data.json").success(function (data) {
            $scope.results = data;
            //$scope.filterBusy = { "status.busy" : "false" };

            if(filter == 'all')
                $scope.filterIconBarQuery = "";
            else if(filter == 'favorites')
                $scope.filterIconBarQuery = { favorite: "true" };

            Move("hiddenMapContainer"); //a trick to keep the map in a known container

            //highlight the selected filter option
            $('.iconStatus').css('background-color', 'transparent');
            $('#' + filter).css('background-color', 'orange');

            var orderby = function(type) {
                $scope.orderbyReverse = false;

                if (type == "Name") {
                    $scope.orderbyPredicate = "name";
                }
                else if (type == "Crowding") {
                    var rooms = data["rooms"];
                    rooms.sort(crowdingComparer);

                    $scope.results = data;
                    $scope.orderbyPredicate = "";
                }
                else if (type == "AvailabilityTime"){
                    $scope.orderbyPredicate = "status.until";
                    $scope.orderbyReverse = true; //to get it from more available to less available
                }
                else if(type == "LatestUpdate"){
                    $scope.orderbyPredicate = "lastUpdate";
                }
                else if (type == "Nearest") {
                    //TODO
                }

                $(".contentPanel").hide('fast'); //close all results
                selectedOrderby = type;

                ////highlight the selected orderby option
                $(".orderbyItem").css('color', '#999999');
                $(".orderbyItem").css('background-color', 'transparent');

                $("#orderby" + type).css('color', 'white');
                $("#orderby" + type).css('background-color', '#ef8228');
            };

            orderby(selectedOrderby);

            $scope.searchClick = function (){
              $scope.filterSearchBarQuery = { name: $scope.searchQuery };
              $scope.orderByPredicate = 'name';
            };
            $scope.orderbyFunc = orderby;
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
                Move("map" + id);
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

//empty is smaller than every other status
//none is greater than every other status
//full is greater than half so then half is smaller than full
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