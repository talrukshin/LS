$(document).ready(function () {
	ajaxCall("GET", "../api/Employee", "", getSuccess, error);
	$("#insertForm").submit(f1);


});

$(window).ready(function () {// לבדוק איך לעשות את זה????????????????

	$(window).resize(function () {
		var wi = $(window).width();

		if (wi <= 600) {
			$(".btn").click();
		}
	})

});


function getSuccess(data) {

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
				'className': 'btn-sm',
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
						let dataEmployee = "data-personId='" + row.Id + "'";
						

						editBtn = "<button type='button' class = 'editBtn btn ' " + dataEmployee + "><i class='far fa-edit'></i></button>";
						deleteBtn = "<button class = 'editBtn btn ' " + dataEmployee + " style='font-size:20px'><i class='far fa-trash-alt'></i></button>";
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

	}

	catch (err) {
		alert(err);
	}


}

function error() {
	alert("error");

}

function getImg(data, type, full, meta) {

	return '<img src="../img/img2.png" class="avatar border rounded-circle">';

}



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
function error(err) {
	alert("error" + err);
}
