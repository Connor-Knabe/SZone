
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
				//var a = moment.tz(resultsArray[i].date, "America/Toronto");
				//alert("Date"+a.format());
				var newYork = moment.tz("2014-06-01 12:00", "America/New_York");
				alert(newYork.format());
				alert("Notes");
								
				$( "#notes" ).append( "<p>"+"<b>Date:</b> "+resultsArray[i].date+"<br> <b>Note:</b> "+resultsArray[i].notes+"</p>" );

			}
		}

    });
}