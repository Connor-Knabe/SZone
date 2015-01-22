//setting a flag to make sure only one marker can be placed for custom locations
var allowCustomFlag = true;

function pt1 (){
	if (!allowCustomFlag){
		//add marker
		totalPoints += 1;
	    $( '#points' ).html(totalPoints);
	    alert("Lat"+latitude+"Long"+longitude);
	    form_send(1,$('#notebox_area').val(),latitude,longitude);
		allowCustomFlag = true;
	} else {
		totalPoints += 1;
	    $( '#points' ).html(totalPoints);
	    form_send(1,$('#notebox_area').val(),latitude,longitude);
	    add_marker(latitude,longitude);		
	}
}
function pt2 (){
	if (!allowCustomFlag){
		//add marker
		totalPoints += 2;
	    $( '#points' ).html(totalPoints);
	    form_send(2,$('#notebox_area').val(),latitude,longitude);
		allowCustomFlag = true;
	} else {
		totalPoints += 2;
	    $( '#points' ).html(totalPoints);
	    form_send(2,$('#notebox_area').val(),latitude,longitude);
	    add_marker(latitude,longitude);		
	}
}
function pt3 (){
	if (!allowCustomFlag){
		//add marker
		totalPoints += 3;
	    $( '#points' ).html(totalPoints);
	    form_send(1,$('#notebox_area').val(),latitude,longitude);
		allowCustomFlag = true;
	} else {
		totalPoints += 3;
	    $( '#points' ).html(totalPoints);
	    form_send(3,$('#notebox_area').val(),latitude,longitude);
	    add_marker(latitude,longitude);		
	}
}
function pt5 (){
	if (!allowCustomFlag){
		//add marker
		totalPoints += 5;
	    $( '#points' ).html(totalPoints);
	    form_send(5,$('#notebox_area').val(),latitude,longitude);
		allowCustomFlag = true;
	} else {
		totalPoints += 5;
	    $( '#points' ).html(totalPoints);
	    form_send(5,$('#notebox_area').val(),latitude,longitude);
	    add_marker(latitude,longitude);		
	}
}
function note (){
	if ($('#notebox').css('display') == 'none') {
		$( '#notebox' ).show();
    } else {
		$( '#notebox' ).hide();
    }
}
function notebox_click (){
	$('#notebox_area').val('');
}

function last10 (){
	//Call function in maps.js
	form_last10();
}

function setLoc(){
	//set location for map manually
	set_loc(latitude,longitude, allowCustomFlag);
	allowCustomFlag = false;
}



function load_binds(){

	//Bind the click event to a method
    $( '#pt1' ).unbind( 'click', pt1 );
    $('#pt1').bind('click', pt1);
    $( '#pt2' ).unbind( 'click', pt2 );
    $('#pt2').bind('click', pt2);
    $( '#pt3' ).unbind( 'click', pt3 );
    $('#pt3').bind('click', pt3);
    $( '#pt5' ).unbind( 'click', pt5 );
    $('#pt5').bind('click', pt5);
    $( '#note' ).unbind( 'click', note );
    $('#note').bind('click', note);
	$( '#notebox_area' ).unbind( 'click', notebox_click);
    $('#notebox_area').bind('click', notebox_click);
    $( '#last10' ).unbind( 'click', last10);
    $('#last10').bind('click', last10);
	$( '#setLoc' ).unbind( 'click', setLoc);
    $('#setLoc').bind('click', setLoc);





	//For mobile devices since the highlighting would not go away after click event
    $('#pt1').bind('touchstart', function(){
        $(this).addClass('btn2');
    }).bind('touchend', function(){
        $(this).removeClass('btn2');
    });
    $('#pt2').bind('touchstart', function(){
        $(this).addClass('btn2');
    }).bind('touchend', function(){
        $(this).removeClass('btn2');
    });
    $('#pt3').bind('touchstart', function(){
        $(this).addClass('btn2');
    }).bind('touchend', function(){
        $(this).removeClass('btn2');
    });
    $('#pt5').bind('touchstart', function(){
        $(this).addClass('btn2');
    }).bind('touchend', function(){
        $(this).removeClass('btn2');
    });
    $('#note').bind('touchstart', function(){
        $(this).addClass('btn2');
    }).bind('touchend', function(){
        $(this).removeClass('btn2');
    });
    $('#last10').bind('touchstart', function(){
        $(this).addClass('btn2');
    }).bind('touchend', function(){
        $(this).removeClass('btn2');
    });
     $('#setLoc').bind('touchstart', function(){
        $(this).addClass('btn2');
    }).bind('touchend', function(){
        $(this).removeClass('btn2');
    });
    
}
