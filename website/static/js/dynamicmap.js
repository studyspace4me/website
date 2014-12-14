var mapV;
var pUnoGf;
var pUnoFf;
var pDueGf;
var pDueFf;
var placeImage='static/assets/icons/mapmark.svg';
var luoghi;
var userLocation; // Locazione dell'utente qunado autorizza la localizzazione

// Per controllare le direzioni
var dd; //DirectionDisplay
var ds = new google.maps.DirectionsService(); //DirectionService
var geoCoder = new google.maps.Geocoder();

 var contentString = '<div class="contenuto">'+
				'<h1 class="firstTitle">Luogo</h1>'+
                '<input id="textluogo" type="text" value="From">'+
                '<input class="miaPosizione" name="luogo" type="button" value="Use my position" onclick="impostaLocazzione(this)">'+
     '<div id="tipoViaggio">'+
     '<div class="stato31"><div class="viaggio"><label><input type="radio" name="travelModeluogo" value="DRIVING" checked /> Driving</label></div>'+
     '<div class="viaggio"><label><input type="radio" name="travelModeluogo" value="BICYCLING" /> Bicylcing</label></div></div>'+
     '<div class="stato31"><div class="viaggio"><label><input type="radio" name="travelModeluogo" value="TRANSIT" /> Public transport</label></div>'+
     '<div class="viaggio"></div><div class="viaggio"><label><input type="radio" name="travelModeluogo" value="WALKING" /> Walking</label></div'+
     '</div></div>'+
'<input class="direzione" type="submit" value="Get Directions" name="luogo" onclick="calcRoute(this)">'+
				'</div>';

function initialize() {
	  
  // Creo lo stile, impostando i valori per le zone desiderate
    var miostile = [{stylers: [{ hue: "#00ffe7" }, { saturation: -25 }]
    }, {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }, {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ lightness: 95 },{ visibility: "simplified" }]
    }, {
      featureType: "administrative.locality",
      elementType: "labels",
      stylers: [{ visibility: "on" }]
    }, {
      featureType: "road",
      elementType: "labels.text",
      stylers: [{ visibility: "on" }]
    }
  ];
	
	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(miostile ,{name: "StudySpace4Me"});
	
		// Create a map object, and include the MapTypeId to add
		// to the map type control.
        var trento = new  google.maps.LatLng(46.072462,11.1544677);
        var mapOptions = {
          center: trento,
          zoom: 15,
		  mapTypeControlOptions: {mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'style']}
        };

        mapV = new google.maps.Map(document.getElementById('map'),mapOptions);
        dd = new google.maps.DirectionsRenderer({ draggable: true });
        dd.setMap(mapV);

		    pUnoGf = new google.maps.KmlLayer({
            url: 'https://sites.google.com/site/publickmlstorage/files/povo1gf.kml',
            preserveViewport:true,
            suppressInfoWindows:true
        });
        pUnoGf.setMap(mapV);

        pDueFf = new google.maps.KmlLayer({
        url:'https://sites.google.com/site/publickmlstorage/files/povo21f.kml',
        preserveViewport:true,
        suppressInfoWindows:true});
        pDueFf.setMap(mapV);

        pUnoFf = new google.maps.KmlLayer({
        url:'https://sites.google.com/site/publickmlstorage/files/povo11f.kml',
        suppressInfoWindows:true});
        pDueGf = new google.maps.KmlLayer({
        url:'https://sites.google.com/site/publickmlstorage/files/povo2gf.kml',
        suppressInfoWindows:true});

        var bords= new google.maps.LatLngBounds(new google.maps.LatLng(46.068599,11.149404),new google.maps.LatLng(46.067678,11.150337));
        var ggo= new google.maps.GroundOverlay('https://sites.google.com/site/publickmlstorage/files/Povo2firstfloor.svg',bords);
        ggo.setMap(mapV);
		//Associate the styled map with the MapTypeId and set it to display.
		mapV.mapTypes.set('style', styledMap);
		mapV.setMapTypeId('style');
        //Creo i marcatori dei vari aree dell'università di trento
        luoghi=[['Povo 1',46.066966, 11.150452],
                ['Povo 2',46.068144, 11.150530]];
    
        var marker, k;
        for (k = 0; k < luoghi.length; k++) { 
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(luoghi[k][1], luoghi[k][2]),
        icon: new google.maps.MarkerImage(placeImage,
        null, null, null, new google.maps.Size(48,48)),
        draggable: false,
        title: luoghi[k][0],
        map: mapV });
        makeInfoWindow(marker,contentString);
    }
    
    //uso la geolocalizzazione per determinare la posizione dell'utente
    localizzazione();

    // Resize stuff...
    google.maps.event.addDomListener(window, "resize", function() {
        var center = mapV.getCenter();
        google.maps.event.trigger(mapV, "resize");
        mapV.setCenter(center);
    });

    google.maps.event.addListenerOnce(mapV, 'idle', function() {
        google.maps.event.trigger(mapV, 'resize');
    });
}

function getMap(id) {
    cambiaPiano(id);
}

function localizzazione(){
   if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(coordinate,porblemiNellaLocalizzazione,{
         timeout: 10000,
         enableHighAccuracy: true,
         maximumAge: Infinity});
    }
    else{
      alert("Geo-localization isn't possible");
    }
}
//Altra Parte
function cambiaPiano(aula){
    switch(aula.charAt(0))
    {
      case "a":
          if(aula.charAt(1)=="1"){
            pUnoFf.setMap(null);
            pUnoGf.preserveViewport=false;
            pUnoGf.setMap(mapV);
          }
          else
          {
            pUnoFf.preserveViewport=false;
            pUnoFf.setMap(mapV);
            pUnoGf.setMap(null);
          }
          break;
      case "b":
      if(aula.charAt(3)=="6" || aula.charAt(3)=="7"){
            pDueFf.preserveViewport=false;
            pDueFf.setMap(mapV);
            pDueGf.setMap(null);
          }
          else
          {
            pDueFf.setMap(null);
            pDueGf.preserveViewport=false;
            pDueGf.setMap(mapV);
          }
          break;
    }
}

function makeInfoWindow(marker, message) {
            var luogo = marker.getTitle();
            var ris = message.replace("Luogo",luogo);
            luogo=luogo.replace(/ /g,'');
            ris = ris.replace(/luogo/g,luogo);
            var infoWindow = new google.maps.InfoWindow({
                content: ris,
                maxWidth: 400
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(mapV, marker);
            });
}
function calcRoute(obj) {
                //In che modo si pensa di attraversare il percorso
                var tmp= document.getElementsByName("travelMode"+obj.name);
                var modoViaggio;
                for(var i=0;i<tmp.length;i++)
                {
                    if(tmp[i].checked==true)
                        modoViaggio=tmp[i].value;
                }
                alert(modoViaggio);
                //Imposto il luogo di partenza, che potrebbe essere o la locazzione dell'utente o un luogo scelto da lui
                var start = document.getElementById("text"+obj.name).value;
                //Imposto il luogo di arrivo
                var index = obj.name.charAt(obj.name.length-1);
                var k = parseInt(index);
				var end = new google.maps.LatLng(luoghi[k-1][1],luoghi[k-1][2]);
				var request = {
					origin:start,
					destination:end,
					travelMode: google.maps.DirectionsTravelMode[modoViaggio]
				};
				
				ds.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						dd.setDirections(response);
					}else {
			// alert an error message when the route could nog be calculated.
			if (status == 'ZERO_RESULTS') {
				alert('No route could be found between the origin and destination.');
			} else if (status == 'UNKNOWN_ERROR') {
				alert('A directions request could not be processed due to a server error. The request may succeed if you try again.');
			} else if (status == 'REQUEST_DENIED') {
				alert('This webpage is not allowed to use the directions service.');
			} else if (status == 'OVER_QUERY_LIMIT') {
				alert('The webpage has gone over the requests limit in a too short  period of time.');
			} else if (status == 'NOT_FOUND') {
				alert('At least one of the origin, destination, or waypoints could not be geocoded.');
			} else if (status == 'INVALID_REQUEST') {
				alert('The DirectionsRequest provided was invalid.');					
			} else {
				alert("There was an unknown error in your request. Requeststatus: \n\n"+status);
			}
		}
    });
}

function coordinate(position){
          var latlng = new  google.maps.LatLng(position.coords.latitude,     position.coords.longitude);
    geoCoder.geocode({'latLng': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			// if the geolocation was recognized and an address was found
			if (results[0]) {
				// compose a string with the address parts
				var address = results[0].address_components[1].long_name+' '+results[0].address_components[0].long_name+', '+results[0].address_components[3].long_name
                userLocation=address;
			}
		} else {
			// if the address couldn't be determined, alert and error with the status message
			alert("Geocoder failed due to: " + status);
		}
	});
}
function impostaLocazzione(tmp){
    document.getElementById("text"+tmp.name).value=userLocation;
}
function porblemiNellaLocalizzazione(error) {
    if (error.code == 1) {
        alert("The user didn't allow the geo-localization");
    } else if (error.code == 2) {
        alert("Position not available");
    } else if (error.code == 3) {
        alert("Timeout");
    } else {
        alert("ERROR:" + err.message);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
