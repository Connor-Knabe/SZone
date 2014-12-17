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
				$( "#notes" ).append( "<p>"+resultsArray[i].notes+"</p>" );
				var parsedDate = $.format.parseDate(resultsArray[i].date);
				alert(parsedDate);
			}
			
		}
    });
}