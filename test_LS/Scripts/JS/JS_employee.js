$(document).ready(function () {


	ajaxCall("GET", "../api/Employee", "", getSuccess, error);
	$("#insertForm").submit(f1);


	$("#editForm").submit(fEdit);
	$("#editDiv").hide();

});



$(window).ready(function () {
	var num = 1;
	$(window).resize(function () {
		var wi = $(window).width();
	

		if (wi <= 800) {
			if (num == 1) {
				$(".btnChange").click();
				num = 2;
			}
			
		}
	})

});


function getSuccess(data) {
	employees = data;
	$("aria-hidden").show();
	try {
		tbl = $('#employeeTable').DataTable({
			data: data,
			'dom':
			"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'<'float-md-right ml-2'B>f>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
			'buttons': ['csv', {
				'text': '<i class="fa fa-id-badge fa-fw" aria-hidden="true"></i>',
				'action': function (e, dt, node) {

					$(dt.table().node()).toggleClass('cards');
					$('.fa', node).toggleClass(['fa-table', 'fa-id-badge']);

					dt.draw('page');
				},
				'className': 'btn-sm btnChange',
				'attr': {
					'title': 'Change views',
				}
			}],
			'select': 'single',
			columns: [

				{ data: "Image", render: getImg },

				{ data: "FirstName" },
				{ data: "LastName" },
				{ data: "Phone" },
				{ data: "Address" },
				{ data: "Roll" },
				{ data: "StartDate" },

				{
					render: function (data, type, row, meta) {
						let dataEmployee = "data-personPhone='" + row.Phone + "'";
						//alert(row.Phone);
						editBtn = "<button type='button' class = 'editBtn btn ' " + dataEmployee + "><img src='../img/update.png' style='width: 35px'></button>";
						deleteBtn = "<button type='button' class = 'deleteBtn btn ' " + dataEmployee + " style='font-size:20px'><img src='../img/delete.png' style='width: 25px'></i></button>";

						return editBtn + deleteBtn;
					}
				},


			],
			'drawCallback': function (settings) {
				var api = this.api();
				var $table = $(api.table().node());

				if ($table.hasClass('cards')) {

					// Create an array of labels containing all table headers
					var labels = [];
					$('thead th', $table).each(function () {
						labels.push($(this).text());
					});

					// Add data-label attribute to each cell
					$('tbody tr', $table).each(function () {
						$(this).find('td').each(function (column) {
							$(this).attr('data-label', labels[column]);
						});
					});

					var max = 0;
					$('tbody tr', $table).each(function () {
						max = Math.max($(this).height(), max);
					}).height(max);

				} else {
					// Remove data-label attribute from each cell
					$('tbody td', $table).each(function () {
						$(this).removeAttr('data-label');
					});

					$('tbody tr', $table).each(function () {
						$(this).height('auto');
					});
				}
			}


		});
		buttonEvents();

	}

	catch (err) {
		alert(err);
	}


}



function buttonEvents() {

	$(document).on("click", ".editBtn", function () {
		mode = "edit";
		markSelected(this);
		$("#editDiv").show();
		populateFields(this.getAttribute('data-personPhone')); // fill the form fields according to the selected row

		$("#saveBTN").prop("disabled", false);

		populateFields(this.getAttribute('data-personPhone')); // fill the form fields according to the selected row

		window.location.replace('#editDiv');
		//alert(this.getAttribute('data-personPhone'));

	});

	$(document).on("click", ".deleteBtn", function () {

		ajaxCall("Post", "../api/Employee/" + this.getAttribute('data-personPhone'), "", successDelete, error);

	});



}

// mark the selected row
function markSelected(btn) {
	$("#personTable tr").removeClass("selected"); // remove seleced class from rows that were selected before
	row = (btn.parentNode).parentNode; // button is in TD which is in Row
	row.className = 'selected'; // mark as selected
}

function error() {
	alert("Error");

}

function getImg(data, type, full, meta) {

	return '<img src="../img/img2.png" class="avatar border rounded-circle">';

}


//Add Employee
function f1() {

	AddEmployee();
	return false; // the return false will prevent the form from being submitted
	// hence the page will not reload
}

function AddEmployee() {
	Employee = {
		Img: "",
		FirstName: $("#firstName").val(),
		LastName: $("#lastName").val(),
		Phone: $("#phone").val(),
		Address: $("#address").val(),
		Roll: $("#Rollsel").val(),
		StartDate: "",

	}
	ajaxCall("POST", "../api/Employee", JSON.stringify(Employee), success, error);

}

function success(data) {
	swal("Added Successfuly!", ":)", "success");

	setTimeout(function () { location.reload(); }, 3000);

}


// Update Employee

function fEdit() {
	onSubmitFunc();
	return false;

}

function onSubmitFunc() {
	var ePhone = $("#phoneEdit").val();
	var eFname = $("#fNameEdit").val();
	var eLname = $("#lNameEdit").val();
	var eAddress = $("#addressEdit").val();


	ajaxCall("Post", "../api/Employee/" + ePhone + "/" + eFname + "/" + eLname + "/" + eAddress, "", updateSuccess, error);
}

function updateSuccess() {
	swal("updated Successfuly!", ":)", "success");

	setTimeout(function () { location.reload(); }, 3000);

}

// fill the form fields
function populateFields(employeePhone) {
	employee = getEmployee(employeePhone);
	$("#fNameEdit").val(employee.FirstName);
	$("#lNameEdit").val(employee.LastName);
	$("#phoneEdit").val(employee.Phone);
	$("#addressEdit").val(employee.Address);



}

// get a person according to its Id
function getEmployee(phone) {
	for (i in employees) {
		if (employees[i].Phone == phone)
			return employees[i];
	}
	return null;
}



//Delete Employee

function successDelete(data) {
	swal("Delete Successfuly!", "Phone Number: " + data, "");

	setTimeout(function () { location.reload(); }, 3000);

}


function error(err) {
	alert("error" + err);
}
