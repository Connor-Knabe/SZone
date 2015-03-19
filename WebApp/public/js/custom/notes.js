/*
$("#profile").click(function (event) {
	
	if ($('.navbar').css('display') == 'none') {
		$(".navbar").show();	
		alert("Show");
	}
    var target = $(event.target);
    if (target.is($("#notebox_area"))) {
        $(".navbar").hide();
    }
});*/

$("#notebox_area").click(function () {
    $(".navbar").hide();
});

$(window).scroll(function() {
	if ($('.navbar').css('display') == 'none') {
		$(".navbar").show();	
	}	
});


$( "#notebox_area" ).focus(function() {
	
    if ($('.navbar').css('display') != 'none') {
		$(".navbar").hide();
	}	

});



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
				var pointType = "";				
				switch (resultsArray[i].pointAmt) {
				   case 1:
				      // fall through
				      pointType = "Eye Contact";
				      break;
				   case 2:
				      pointType = "Head Nod";
					  break;
				   case 3:
   				      pointType = "Smile Back";
   					  break;
				   case 5:
				      pointType = "Verbal Greeting";
					  break;
				}
				
				
				

				$( "#notes" ).append( "<p>"+"<b>Date:</b> "+a.format('MMMM Do YYYY, h:mm:ss a')+"<br> <b>Location:</b> "+resultsArray[i].city+"<br> <b>Point Amount:</b> "+resultsArray[i].pointAmt + "<br> <b>Point Type:</b> "+pointType+"<br> <b>Note:</b> "+resultsArray[i].notes +"</p>" );

			}
		}

    });
}