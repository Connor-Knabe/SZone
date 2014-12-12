function add_marker(lat, long){
    var myLatlng = new google.maps.LatLng(lat,long);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title:"Your smile location"
    });
    google.maps.event.addListener(marker, 'click', toggleBounce);

    marker.setMap(map);
    map.setCenter(myLatlng);
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

    
}
function form_last10(){
    $.ajax({
        type: "POST",
        url: "/lastTen",
    })
    .done(function( data ) {
		var resultsArray = data.queryResults;
		

		for(var i=0;i<resultsArray.length;i++){
			if(resultsArray[i].gps.latitude!=0){
				add_marker(resultsArray[i].gps.latitude, resultsArray[i].gps.longitude);
			}
		    
		}
		
		

    });

}


function toggleBounce() {

    if (marker.getAnimation() != null) {
    	marker.setAnimation(null);
  	} else {
    	marker.setAnimation(google.maps.Animation.BOUNCE);
  	}
}
