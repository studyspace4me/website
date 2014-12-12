$(document).foundation();

$(function() {
    //SUBMIT FORMS
    $("#loginSubmit").click(function () {
        $("#loginForm").submit();
    });

    $("#signupSubmit").click(function () {
        $("#signupForm").submit();
    });

    $("#preferencesSubmit").click(function () {
        $("#preferencesForm").submit();
    });

    //MECHANICS ANIMATIONS
    $("#contentResult").hide();
    $("#mapContainer").hide();
    $("#headerResult").click(function () {
        if ($("#contentResult").is(":hidden")) {
            //$("#headerResult .summaryHeader").hide();
            $("#contentResult").slideDown();
        }
        else {
            //$("#headerResult .summaryHeader").show();
            $("#contentResult").slideUp();
        }

    }).on('click', '.favoriteStar', function (e) {
        //stop the propagation of the click on the favorite star, so when clicked the result content doesn't toggle
        e.stopPropagation();
    });

    $("#favoriteResult").click(function () {
        var srcImage = $("#favoriteResult").attr('src');
        if (srcImage.indexOf("emptyFavorite") >= 0)
            $("#favoriteResult").attr('src', 'static/assets/icons/favorite.svg');
        else
            $("#favoriteResult").attr('src', 'static/assets/icons/emptyFavorite.svg');
    });
});
