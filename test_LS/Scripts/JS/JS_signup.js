
$(document).ready(function () {
	$("#formSignup").submit(f1);

});


function f1() {

	AddUser();
	return false;

}

function AddUser() {
	User = {

		FirstName: $("#firstName").val(),
		LastName: $("#lastName").val(),
		Email: $("#email").val(),
		Password: $("#pass_log_id").val()


	}
	ajaxCall("POST", "../api/User", JSON.stringify(User), success, error);

}
function success(data) {

	if (data) {
		swal("Added Successfuly!", ":)", "success");
		setTimeout(function () { window.location.replace('login.html'); }, 3000);
	} else {
		swal("The email address is already registered in the system", "", "error");

	}






}
function error(err) {
	alert("error" + err);
}

$(document).on('click', '.toggle-password', function () {


	$(this).toggleClass("fa-eye fa-eye-slash");
	var input = $("#pass_log_id");
	input.attr('type') === 'password' ? input.attr('type', 'text') : input.attr('type', 'password')

});

$(document).on('click', '.retype_toggle-password', function () {
	$(this).toggleClass("fa-eye fa-eye-slash");
	var input2 = $("#retype_pass_log_id");
	input2.attr('type') === 'password' ? input2.attr('type', 'text') : input2.attr('type', 'password')
});


function check_pass() {
	if (document.getElementById('pass_log_id').value ==
		document.getElementById('retype_pass_log_id').value) {
		document.getElementById('submit').disabled = false;
	} else {
		document.getElementById('submit').disabled = true;
		console.log('Passwords do not match');
	}
}



