
function load_notes(){
	$.ajax({
        type: "POST",
        url: "/loadNotes",
	})
	.done(function( data ) {
		$("#notes").empty();
        var resultsArray = data.queryResults;
		for(var i=0;i<resultsArray.length;i++){
			if(resultsArray[i].notes == ""){
                //add note that is blank	
			} else {
				var a = moment(resultsArray[i].date);
												
				$( "#notes" ).append( "<p>"+"<b>Date:</b> "+a.format('MMMM Do YYYY, h:mm:ss a')+"<br> <b>Location:</b> "+resultsArray[i].city+"<br> <b>Note:</b> "+resultsArray[i].notes +"</p>" );

			}
		}

    });
}