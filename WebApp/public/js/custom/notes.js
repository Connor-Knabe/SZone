
function load_notes(){
	$.ajax({
        type: "POST",
        url: "/loadNotes",
	})
	.done(function( data ) {
        var resultsArray = data.queryResults;
		for(var i=0;i<resultsArray.length;i++){
			if(resultsArray[i].notes == ""){
                //add note that is blank	
			} else {
				var a = moment(resultsArray[i].date);
				
				    var lat = resultsArray[i].gps.latitude;
					var long = resultsArray[i].gps.longitude;


				$.ajax({
			        type: 'GET',
			        dataType: "json",
			        url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=false",
			        data: {},
			        success: function(data) {
			            $('#city').html(data);
			            $.each( data['results'],function(i, val) {
			                $.each( val['address_components'],function(i, val) {
			                    if (val['types'] == "locality,political") {
			                        if (val['long_name']!="") {
			                            //$('#city').html(val['long_name']);
			                            alert("city = " + long_name);
			                        }
			                        else {
				                        alert("Unknown city");
			                            //$('#city').html("unknown");
			                        }
			                        console.log(i+", " + val['long_name']);
			                        console.log(i+", " + val['types']);
			                    }
			                });
			            });
			            console.log('Success');
			        },
			        error: function () { console.log('error'); } 
			    }); 								
				$( "#notes" ).append( "<p>"+"<b>Date:</b> "+a.format('MMMM Do YYYY, h:mm:ss a')+"<br> <b>Note:</b> "+resultsArray[i].notes +"<br> <b>Location:</b> "+"Lat"+resultsArray[i].gps.latitude+"Long"+resultsArray[i].gps.longitude+"</p>" );

			}
		}

    });
}