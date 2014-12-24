
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
				//var a = moment.tz("2013-11-18 11:55", "America/Toronto");
				$( "#notes" ).append( "<p>"+"<b>Date:</b> "+resultsArray[i].date+"<br> <b>Note:</b> "+resultsArray[i].notes+"</p>" );

			}
		}

    });
}