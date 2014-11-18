$(document).foundation();

$(function() {
    $("#loginSubmit").click( function(event){
        $( "#loginForm" ).submit();
    });

    $("#signupSubmit").click( function(event){
        $( "#signupForm" ).submit();
    });

    $("#preferencesSubmit").click( function(event){
        $( "#preferencesForm" ).submit();
    });

    //MECHANICS ANIMATIONS

    $("#contentResult").hide();
    $("#mapContainer").hide();
    $("#headerResult").click( function(event){
        $("#contentResult").slideToggle();
        if($("#headerButton").text() == "More info"){
            $("#headerButton").text("Less info");
            $("#headerResult .summaryHeader").hide();
        }
        else{
            $("#headerButton").text("More info");
            $("#headerResult .summaryHeader").show();
        }
    });

    $("#mapButton").click( function(event){
        $("#mapContainer").slideToggle();
        if($("#mapButton").text() == "Click to view")
        //to perserve style
            $("#mapButton").html($("#mapButton").html().replace("Click to view", "Click to hide"));
        else
            $("#mapButton").html($("#mapButton").html().replace("Click to hide", "Click to view"));
    });

    //ORDERBY CLICK


    $("#orderbyContent .item").click( function(event){
        normalBackground();

        if(event.target.id == "all")
            $("#orderbyContent #all").css("background-color", "rgb(0, 140, 186)");
        if(event.target.id == "nearest")
            $("#orderbyContent #nearest").css("background-color", "rgb(0, 140, 186)");
        if(event.target.id == "temperature")
            $("#orderbyContent #temperature").css("background-color", "rgb(0, 140, 186)");
        if(event.target.id == "crowding")
            $("#orderbyContent #crowding").css("background-color", "rgb(0, 140, 186)");
        if(event.target.id == "favorites")
            $("#orderbyContent #favorites").css("background-color", "rgb(0, 140, 186)");
    });

    function normalBackground() {
        $("#orderbyContent #all").css("background-color", "transparent");
        $("#orderbyContent #nearest").css("background-color", "transparent");
        $("#orderbyContent #temperature").css("background-color", "transparent");
        $("#orderbyContent #crowding").css("background-color", "transparent");
        $("#orderbyContent #favorites").css("background-color", "transparent");
    }
});
