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
        //$("#headerResult .summaryHeader").hide();
        //$("#headerResult .summaryHeader").show();
    }).on('click', '.favoriteStar', function(e){
        //stop the propagation of the click on the favorite star, so when clicked the result content doesn't toggle
        e.stopPropagation();
    });

    $("#mapButton").on('click', function(e) {
        $("#mapContainer").slideToggle();
        if ($("#mapButton").text() == "Click to view")
            $("#mapButton").html($("#mapButton").html().replace("Click to view", "Click to hide"));
        else
            $("#mapButton").html($("#mapButton").html().replace("Click to hide", "Click to view"));
    });

    $("#favoriteResult").click( function(){
        var srcImage = $("#favoriteResult").attr('src');
        if(srcImage.indexOf("emptyFavorite") >= 0)
            $("#favoriteResult").attr('src', 'static/assets/icons/favorite.svg');
        else
            $("#favoriteResult").attr('src', 'static/assets/icons/emptyFavorite.svg');
    });
});
