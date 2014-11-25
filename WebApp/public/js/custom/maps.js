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
            }, function (error) {
                alert("Error: " + error.code);
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

function load_map(){
    var mapOptions = {
        center: { lat: 38.9371942, lng: -92.3184657},
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
