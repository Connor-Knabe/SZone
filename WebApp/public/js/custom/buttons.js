function pt1 (){
    totalPoints += 1;
    $( "#points" ).html(totalPoints);
    form_send(1,$("#notebox_area").val());
    add_marker(latitude,longitude);
}

function pt2 (){
    totalPoints += 2;
    $( "#points" ).html(totalPoints);
    form_send(2,$("#notebox_area").val());
    add_marker(latitude,longitude);
}

function pt3 (){
    totalPoints += 3;
    $( "#points" ).html(totalPoints);
    form_send(3,$("#notebox_area").val());
    add_marker(latitude,longitude);
}

function pt5 (){
    totalPoints += 5;
    $( "#points" ).html(totalPoints);
    form_send(5, $("#notebox_area").val());
    add_marker(latitude,longitude);
}


function note (){
	if ($("#notebox").css("display") == "none") {
		$( "#notebox" ).show();
    } else {
		$( "#notebox" ).hide();
    }
}

function notebox_click (){
	$("#notebox_area").val('');
}

function load_binds(){
    $( "#pt1" ).unbind( "click", pt1 );
    $('#pt1').bind('click', pt1);
    $( "#pt2" ).unbind( "click", pt2 );
    $('#pt2').bind('click', pt2);
    $( "#pt3" ).unbind( "click", pt3 );
    $('#pt3').bind('click', pt3);
    $( "#pt5" ).unbind( "click", pt5 );
    $('#pt5').bind('click', pt5);
    $( "#note" ).unbind( "click", note );
    $('#note').bind('click', note);

	$( "#notebox_area" ).unbind( "click", notebox_click );
    $('#notebox_area').bind('click', notebox_click);

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
}

