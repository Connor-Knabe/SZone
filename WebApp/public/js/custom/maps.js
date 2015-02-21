var marker;
var infowindow = new google.maps.InfoWindow();

google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
});


function dragFalse(){
    marker.setOptions({draggable: false});
}


function add_marker(lat, long, city, note, dragBool){
	
	console.log("Marker placed");
    var contentString;
    var isDraggable = false;
    if (city==''||note==''){
		contentString == 'No info';
    }
    
    contentString = '<div> <p> <b>City:</b>'+city+'</p> <p><b>Note:</b>'+note+' </p></div>';


    var myLatlng = new google.maps.LatLng(lat,long);
  	
  	
  	if (dragBool!=null && dragBool == true){
  		isDraggable = true;
  	}


    marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
		draggable:isDraggable,
        animation: google.maps.Animation.DROP,
        title:"Your smile location"
    });
    
    console.log("Marker info"+marker);
    
    
    google.maps.event.addListener(marker, 'dragend', function (event) {
        latitude = this.getPosition().lat();
        longitude = this.getPosition().lng();
    });
    	
    google.maps.event.addListener(marker, 'click', function() {
	    console.log("Marker clicked")
	    infowindow.setContent(contentString);
		infowindow.open(map,marker);
	});	

	
   // marker.setMap(map);
    //map.setCenter(myLatlng);
}

function get_gps(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function coords(position) {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
				load_map(latitude,longitude);
            }, function (error) {
                 $.ajax({
                    type: "POST",
                    url: "/ip",
                })
                .done(function( data ) {
					longitude = parseFloat(data.ip_info[1]);
					latitude = parseFloat(data.ip_info[0]);
				    load_map(latitude,longitude);
					$( "#ip" ).append( '<p id="red"> You have not allowed GPS tracking, using your IP address instead(less accurate). </p>');
                });
                
            },
            {
                enableHighAccuracy : true,
                timeout : 10000,
                maximumAge : 1000
            });
	} else {
            alert ("GEOLOCATION NOT SUPPORTED....");
    }
}

function load_map(latitude, longitude){
	var myLatlng = new google.maps.LatLng(latitude,longitude);

    var mapOptions = {
        center: { lat: latitude, lng: longitude},
        zoom: 8
    };
    map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({fillColor: '#808080'});

    google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
        map.setCenter(this.getPosition());
        map.fitBounds(this.getBounds());
    });

    google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
        alert('There was an error obtaining your position. Message: ' + e.message);
	});

    GeoMarker.setMap(map);
    
    
    
    
    
    var point;
    
    point = new google.maps.LatLng(38.9218717, -92.3145218);
    createMarker(point, 'This is point 1');
    
    point = new google.maps.LatLng(38.9238717, -92.3145218);
    createMarker(point, 'This is point 1');
    
    point = new google.maps.LatLng(38.9258717, -92.3145218);
    createMarker(point, 'This is point 1');
    
    console.log("test");
	//add_marker(38.9218717, -92.3145218, "CoMo", "BLah", false);
	//add_marker(38.9238717, -92.3145218, "CoMo2", "BLah2", false);
	//add_marker(38.9258717, -92.3145218, "CoMo3", "BLah3", false);
    
}
var gpsLoc;

function createLast10Marker(lat,lng,city,note) {
	
	console.log("lat"+lat+"long+"+lng+"city"+city+"note"+note);
	
	gpsLoc = new google.maps.LatLng(lat, lng);
	
	if (city==''||note==''){
		contentString == 'No info';
    }
    
    contentString = '<div> <p> <b>City:</b>'+city+'</p> <p><b>Note:</b>'+note+' </p></div>';


    var marker = new google.maps.Marker({
        position: gpsLoc,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });
}



function set_loc(lat,long, allowCustomFlag){
	//manually set location using google maps api
	if (allowCustomFlag){
		add_marker(lat, long, "", "", true);	
	} else {
		alert("You must click add point to confirm location before setting new custom location");
	}
	

}

function form_last10(){
    $.ajax({
        type: "POST",
        url: "/lastTen",
    })
    .done(function( data ) {
	    var zoomArray = new Array();
		var resultsArray = data.queryResults;
		for(var i=0;i<resultsArray.length;i++){
			if(resultsArray[i].gps.latitude!=0){				
				createLast10Marker(resultsArray[i].gps.latitude, resultsArray[i].gps.longitude,resultsArray[i].city, resultsArray[i].notes);
				zoomArray.push(new google.maps.LatLng (resultsArray[i].gps.latitude,resultsArray[i].gps.longitude));
			}
		}
		add_zoom(zoomArray);
    });

}


function add_zoom(LatLngList){
	
	//  Create a new viewpoint bound
	var bounds = new google.maps.LatLngBounds ();
	//  Go through each...
	for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
	  //  And increase the bounds to take this point
	  bounds.extend (LatLngList[i]);
	}
	//  Fit these bounds to the map
	map.fitBounds (bounds);

}


function toggleBounce() {

    if (marker.getAnimation() != null) {
    	marker.setAnimation(null);
  	} else {
    	marker.setAnimation(google.maps.Animation.BOUNCE);
  	}
}
