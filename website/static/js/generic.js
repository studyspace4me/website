$(document).foundation();

//when enter is pressed in the search input control fire the click event of the button
$('#searchInput').keypress(function (e) {
    if (e.which == 13) { //enter key code
        $('#searchButton').click();
        return false;
    }
});
