window.onload = function () {

	/**
	*
	*	Demo 1: Elements
	*
	*/
	var dropZoneOne = document.querySelector('#drop-target-one');
	var dropZoneDelete = document.querySelector('#drop-target-delete');
	var dragElements = document.querySelectorAll('#drag-elements1 li');
	var xhttp = new XMLHttpRequest();

	var dragCharts = $("[fusioncharts='']");
	var dragDeleteElements = new Array();
	var elementDeleteDragged = null;

	var angular_elements = document.querySelectorAll('#angular_elements p');

	for (var i = 0; i < dragElements.length; i++) {
		dragElements[i].addEventListener('dragstart', function (e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.innerHTML);
			elementDragged = this;
		});
		dragElements[i].addEventListener('dragend', function (e) {
		});
	};

	for (var i = 0; i < angular_elements.length; i++) {
		var chart_real = angular_elements[i];
		chart_real.addEventListener('dragstart', function (e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.innerHTML);
			elementDragged = this;
		});
	}

	///////////////////////////////////////////////////////////////////////////////////	
	for (var i = 0; i < dragDeleteElements.length; i++) {

		// Event Listener for when the drag interaction starts.
		dragDeleteElements[i].addEventListener('dragstart', function (e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.innerHTML);
			elementDeleteDragged = this;
		});

		// Event Listener for when the drag interaction finishes.
		dragDeleteElements[i].addEventListener('dragend', function (e) {
		});
	};
	///////////////////////////////////////////////////////////////////////////////////	

	// Event Listener for when the dragged element is over the drop zone.
	dropZoneOne.addEventListener('dragover', function (e) {
		if (e.preventDefault) {
			e.preventDefault();
		}

		e.dataTransfer.dropEffect = 'move';

		return false;
	});

	// Event Listener for when the dragged element enters the drop zone.
	dropZoneOne.addEventListener('dragenter', function (e) {
		this.className = "over";
	});

	// Event Listener for when the dragged element leaves the drop zone.
	dropZoneOne.addEventListener('dragleave', function (e) {
		this.className = "";
	});

	// Event Listener for when the dragged element dropped in the drop zone.
	dropZoneOne.addEventListener('drop', function (e) {
		var isAngular = false;
		var angular_to_be_sent;
		var dataSource;
		var dataSource_gauge;
		var dataSource_cylinder;
		var ess = window.event;
		if (e.preventDefault) e.preventDefault();
		if (e.stopPropagation) e.stopPropagation();


		this.className = "";
		var nodes_test = document.getElementById("drop-target-one");
		var nodes = document.getElementById("drop-target-one").childNodes;
		var cln = elementDragged.cloneNode(true);
		cln.removeAttribute("draggable");
		cln.style.top = (ess.clientY - 60) + "px";
		cln.style.left = (ess.clientX - 140) + "px";


		if (cln.class == "drag-elements-li") {
			cln.setAttribute("class", "drag-elements-new-li");
		}
		if (cln.getAttribute("class") == "angular_elements_child") {

			var to_compile;

			angular.injector(['ng', 'myApp']).invoke(function ($compile) {
				// Create a scope.
				var $scope = angular.element(document.body).scope();
				// Specify what it is we'll be compiling.
				dataSource = $scope.myRealTimeData;
				dataSource_gauge = $scope.dataSource_gauge;
				dataSource_cylinder = $scope.dataSource_cylinder;
				if (cln.id == "real_time_graph") {
					dataSource = $scope.myRealTimeData;
					angular_to_be_sent = "<div id='firstChart' fusioncharts=''  width='300' height='200'  type='realtimeline'> </div>";
					to_compile = "<div fusioncharts=''  width='300' height='200'  type='realtimeline'  dataSource='" + JSON.stringify(dataSource) + "'> </div>";
				}
				else if (cln.id == "real_time_gauge") {
					dataSource = $scope.dataSource_gauge;
					angular_to_be_sent = "<div id='firstChart' fusioncharts=''  width='200' height='200'  type='angulargauge'> </div>";
					to_compile = "<div fusioncharts=''  width='200' height='200'  type='angulargauge' dataSource='" + JSON.stringify(dataSource_gauge) + "'> </div>";
				}
				else if (cln.id == "real_time_tank") {
					dataSource = $scope.dataSource_cylinder;
					angular_to_be_sent = "<div id='firstChart' fusioncharts=''  width='200' height='200'  type='cylinder'> </div>";
					to_compile = "<div fusioncharts=''  width='200' height='200'  type='cylinder' dataSource='" + JSON.stringify(dataSource_cylinder) + "'> </div>";
				}
				// Compile the tag, retrieving the compiled output.
				var $compiled = $compile(to_compile)($scope);
				// Ensure the scope and been signalled to digest our data.
				$scope.$digest();
				// Append the compiled output to the page.
				cln = $compiled[0];

				cln.style.top = (ess.clientY - 60) + "px";
				cln.style.left = (ess.clientX - 140) + "px";
				isAngular = true;
			});
		}
		cln.setAttribute("oncontextmenu", "showCustomMenu(this)");
		cln.setAttribute("ondblclick", "showDoubleMenu(this)");
		nodes_test.appendChild(cln);
		var cln_test = $(cln);
		cln_test.css({
			position: 'absolute',
			cursor: 'pointer'
		});
		var $draggables_p = $("#drop-target-one");
		var $draggables = $draggables_p.children();
		var id, $draggableItem;
		for (var i = 0; i < $draggables.length; i++) {
			var $my_test_array = new Array();
			for (var j = 0; j < $draggables.length; j++) {
				if ($draggables.eq(i)[0] != $draggables.eq(j)[0]) {
					$draggableItem = $draggables.eq(j);
					$my_test_array.push($draggableItem);
				}
			}

			$($draggables.eq(i)).draggable({
				obstacle: $my_test_array,
				preventCollision: true,
				containment: "#drop-target-one",
				stop: function (event, ui) {
					
				},
				drag: function (event, ui) {
					socket.emit('moveObject', { 'loggedinUser': loggedinUser, currentId: this.id, positionX: ui.position.left, positionY: ui.position.top});
				}
			});
		}
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var aaa = xhttp.responseText;
				cln.setAttribute("id", JSON.parse(aaa));
				if (isAngular) {
					socket.emit('newObject', { 'loggedinUser': loggedinUser, 'currentHtml': angular_to_be_sent, 'isAngular': isAngular, 'dataSource': dataSource, 'id': aaa });
				}
				else {
					socket.emit('newObject', { 'loggedinUser': loggedinUser, 'currentHtml': cln.outerHTML, 'isAngular': isAngular, 'dataSource': null, 'id':xhttp.responseText, 'objectId': cln.getAttribute("data-objectid"), 'objectHtml':cln.innerHTML});
				}
			}
		};

		xhttp.open('POST', '/getNewObject', true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send();

		elementDragged = null;

		return false;
	});
};
