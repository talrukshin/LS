
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
	swal("Added Successfuly!", ":)", "success");
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




//$(document).ready(function () {

//	$(".divHe").hide();
//	$(".divEn").show();

//	$("select").change(function () {

//		var input = $("#language").val();

//		if (input == "En") {
//			$(".divHe").hide();
//			$(".divEn").show();

//		} else if (input == "He") {
//			$(".divHe").show();
//			$(".divEn").hide();
//		}
//	});

//});



////Hebrew pass
//$(document).on('click', '.He_toggle-password', function () {

//	$(this).toggleClass("fa-eye fa-eye-slash");
//	var input = $("#He_pass_log_id");
//	input.attr('type') === 'password' ? input.attr('type', 'text') : input.attr('type', 'password')

//});

//$(document).on('click', '.He_retype_toggle-password', function () {
//	$(this).toggleClass("fa-eye fa-eye-slash");
//	var input3 = $("#He_retype_pass_log_id");
//	input3.attr('type') === 'password' ? input3.attr('type', 'text') : input3.attr('type', 'password')
//});
////end Hebrew pass