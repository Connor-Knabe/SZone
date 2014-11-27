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
    var mapOptions = {
        center: { lat: latitude, lng: longitude},
        zoom: 8
    };
    map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
}

function toggleBounce() {

    if (marker.getAnimation() != null) {
    	marker.setAnimation(null);
  	} else {
    	marker.setAnimation(google.maps.Animation.BOUNCE);
  	}
}
