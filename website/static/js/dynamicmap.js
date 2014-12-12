var mapV;
var pUnoGf;
var pUnoFf;
var pDueGf;
var pDueFf;
var placeImage='StudySpace64Icon.svg';
var luoghi;
var start;

// Per controllare le direzioni
var dd; //DirectionDisplay
var ds = new google.maps.DirectionsService(); //DirectionService

 var contentString = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h1 id="firstHeading" class="firstHeading">Luogo</h1>'+
				'<div id="bodyContent">'+
				'<form action="index.html" onsubmit="calcRoute();return false;">'+
				'<input type="submit" value="Get Directions"></form>'+
				'</div>'+
				'</div>';

function initialize() {
    localizzazione();
    // Creo lo stile, ipostando i valori per le zone desiderate
    var miostile = [
        {stylers: [
            { hue: "#fffffe" },
            { saturation: -25 }
        ]
        },
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { lightness: 95 },
                { visibility: "simplified" }
            ]
        },
        {
            featureType: "administrative.locality",
            elementType: "labels",
            stylers: [
                { visibility: "on" }
            ]
        },
        {
            featureType: "road",
            elementType: "labels.text",
            stylers: [
                { visibility: "on" }
            ]
        }
    ];

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(miostile, {name: "StudySpace4Me"});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var trento = new google.maps.LatLng(46.072462, 11.1544677);
    var mapOptions = {
        center: trento,
        zoom: 15,
        mapTypeControlOptions: {mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'style']}
    };


    mapV = new google.maps.Map(document.getElementById('map'), mapOptions);
    dd = new google.maps.DirectionsRenderer();
    dd.setMap(mapV);

    pUnoGf = new google.maps.KmlLayer({
        url: 'https://sites.google.com/site/publickmlstorage/files/povo1gf.kml',
        preserveViewport: true,
        suppressInfoWindows: false
    });
    pUnoGf.setMap(mapV);

    pDueFf = new google.maps.KmlLayer({
        url: 'https://sites.google.com/site/publickmlstorage/files/povo21f.kml',
        preserveViewport: true});
    pDueFf.setMap(mapV);

    pUnoFf = new google.maps.KmlLayer({
        url: 'https://sites.google.com/site/publickmlstorage/files/povo11f.kml'});
    pDueGf = new google.maps.KmlLayer({
        url: 'https://sites.google.com/site/publickmlstorage/files/povo2gf.kml'});

    //Associate the styled map with the MapTypeId and set it to display.
    mapV.mapTypes.set('style', styledMap);
    mapV.setMapTypeId('style');
    //Creo i marcatori delle vari aree dell'università di trento
    luoghi = [
        ['Povo 1', 46.066966, 11.150452],
        ['Povo 2', 46.068144, 11.150530]
    ];

    var marker, k;
    for (k = 0; k < luoghi.length; k++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(luoghi[k][1], luoghi[k][2]),
            icon: new google.maps.MarkerImage(placeImage,
                null, null, null, new google.maps.Size(48, 48)),
            draggable: false,
            title: luoghi[k][0],
            map: mapV });
        makeInfoWindow(marker, contentString);
    }
}

function getMap(id) {
    var pulsante = document.getElementById(id);
    google.maps.event.addDomListener(pulsante, 'click', function () {
        cambiaPiano(id);
    });
}

function localizzazione() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(coordinate, porblemiNellaLocalizzazione, {
            timeout: 10000,
            enableHighAccuracy: true,
            maximumAge: 0});
    }
    else {
        alert("La geo-localizzazione non è possibile");
    }
}
//Altra Parte
function cambiaPiano(aula) {
    switch (aula.charAt(0)) {
        case "a":
            if (aula.charAt(1) == "1") {
                pUnoFf.setMap(null);
                pUnoGf.setMap(mapV);
            }
            else {
                pUnoFf.setMap(mapV);
                pUnoGf.setMap(null);
            }
            break;
        case "b":
            if (aula.charAt(3) == "6" || aula.charAt(3) == "7") {
                pDueFf.setMap(mapV);
                pDueGf.setMap(null);
            }
            else {
                pDueFf.setMap(null);
                pDueGf.setMap(mapV);
            }
            break;
    }
}

function makeInfoWindow(marker, message) {
    message = message.replace("Luogo", marker.getTitle());
    var infoWindow = new google.maps.InfoWindow({
        content: message,
        maxWidth: 200
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(mapV, marker);
    });
}

function calcRoute() {
    var end = "46.066976, 11.150353";
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    ds.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            dd.setDirections(response);
        }
    });
}

function coordinate(position) {
    start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
}

function porblemiNellaLocalizzazione(error) {
    if (error.code == 1) {
        alert("L'utente non ha autorizzato la geolocalizzazione");
    } else if (error.code == 2) {
        alert("Posizione non disponibile");
    } else if (error.code == 3) {
        alert("Timing");
    } else {
        alert("ERRORE:" + err.message);
    }
}

google.maps.event.addDomListener(window,'load',initialize);