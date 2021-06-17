$(document).ready(function () {

	$("#formLogin").submit(f1);

});

function f1() {

	User();
	return false;

}

function User() {
	var pass = $("#pass_log_id").val();
	var email = $("#email").val();

	ajaxCall("Get", "../api/User/?Password=" + pass + "&Email=" + email, "", success, error);
}

function success(data) {
	if (data) {

		swal("The connection was successful:)", "Loading...", "success");

		setTimeout(function () { window.location.replace('ManagingEmployees.html'); }, 3000);


	} else {
		swal("The connection failed!", "The password or the email is incorrect", "error");
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

