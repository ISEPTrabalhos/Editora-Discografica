function show(message){
	$("#message").html(message);
	$("#message").slideDown("medium").delay(5000).slideUp();
}

function showWarning(message) { // yellow
	$("#message").css("background", 'yellow');
	show(message);
}

function showError(message) { // RED
	$("#message").css("background", '#F00B42');
	show(message);
}

function showSuccess(message) { // GREEN
	$("#message").css("background", '#02AC1E');
	show(message);
}

function showMessage(message) { // blue
	$("#message").css("background", '#A8BEE3');
	show(message);
}