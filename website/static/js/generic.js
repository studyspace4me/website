$(document).foundation();

$(function() {
    //SUBMIT FORMS
    $("#loginSubmit").click( function(){
        $( "#loginForm" ).submit();
    });

    $("#signupSubmit").click( function(){
        $( "#signupForm" ).submit();
    });

    $("#preferencesSubmit").click( function(){
        $( "#preferencesForm" ).submit();
    });

    //MECHANICS ANIMATIONS
    $("#contentResult").hide();
    $("#mapContainer").hide();
    $("#headerResult").click( function(){
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

    $("#mapButton").click( function(){
        $("#mapContainer").slideToggle();
        if($("#mapButton").text() == "Click to view")
            $("#mapButton").html($("#mapButton").html().replace("Click to view", "Click to hide"));
        else
            $("#mapButton").html($("#mapButton").html().replace("Click to hide", "Click to view"));
    });
});
