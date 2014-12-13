function load_notes(){
	$.ajax({
        type: "POST",
        url: "/loadNotes",
	})
	.done(function( data ) {
		$( "#ip" ).append( '<p id="red"> You have not allowed GPS tracking, using your IP address instead(less accurate). </p>');				
    });
}