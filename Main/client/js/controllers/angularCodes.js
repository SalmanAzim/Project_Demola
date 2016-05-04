var xsd;
var mychart;
var app = angular.module("myApp", ['test', 'app', 'angular.morris-chart', 'ui.bootstrap', 'angular-dialgauge']);

app.factory('socket', function ($rootScope) {
	var socket = io.connect();
	return {
		on: function (eventName, callback) {
			socket.on(eventName, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		},
		emit: function (eventName, data, callback) {
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		}
	};
});

app.controller('MyController', function ($scope, socket, $window) {
	//:::::::::::::::::::::::::::::::Balaji:::::::::::::::::::::::::::::

	//Variables=========================================================

	$scope.booleanDP = [];
	$scope.doubleDP = [];
	$scope.longDP = [];
	$scope.stringDP = [];
	$scope.integerDP = [];
	$scope.allDP = [];
	$scope.testObject = '';
	$scope.currentObject = '';

	$scope.gaugeValue = 50;

	$scope.data = [
		{ y: "2006", a: 100, b: 90 },
		{ y: "2007", a: 75, b: 65 },
		{ y: "2008", a: 50, b: 40 },
		{ y: "2009", a: 75, b: 65 },
		{ y: "2010", a: 50, b: 40 },
		{ y: "2011", a: 75, b: 65 },
		{ y: "2012", a: 100, b: 90 }
	];

	$scope.donutData = [
		{ label: "Download Sales", value: 12 },
		{ label: "In-Store Sales", value: 30 },
		{ label: "Mail-Order Sales", value: 20 }
	];

    $scope.imagepath = '../images/background-image3.jpg';

	// Variables with respect to grid
	$scope.gridDetails = {
		value: 'hide',
		hide: false,
		colorSelect: 'black',
		color: 'rgba(0, 0, 0, .20)' // Lalter the opacity of the color also can be modified
	};

	// Variables with main drag drop panel
	$scope.dropTargetOne = {
		style: {
			'background-color': 'transparent',
			'background-image': 'linear-gradient(0deg, transparent 24%, ' + $scope.gridDetails.color + ' 25%, ' + $scope.gridDetails.color + ' 26%, transparent 27%, transparent 74%, ' + $scope.gridDetails.color + ' 75%, ' + $scope.gridDetails.color + ' 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ' + $scope.gridDetails.color + ' 25%, ' + $scope.gridDetails.color + ' 26%, transparent 27%, transparent 74%, ' + $scope.gridDetails.color + ' 75%, ' + $scope.gridDetails.color + ' 76%, transparent 77%, transparent)',
			'background-size': '30px 30px'
		}
	};

	// Variables with respect to Datapoint based Object selection panel 
	$scope.dpSelectPanel = {
		parentSelect: '',
		dpSelect: '',
		dpList: [],
		booleanShow: false,
		integerShow: false,
		doubleShow: false,
		stringShow: false,
		longShow: false,
		arrayShow:false
	};

	// Variables with respect to bottom panel
	$scope.bottomPropPanel = {
		name: '',
		panelShow: false,
		dpSelectShow: false,
		imageDetailsShow: false,
		fontPropShow: false,
		minMaxButton: false,
		minMaxShow: false,
		rowSelectionShow: false,
		rowNos: 2,
		minMaxValue: 'Min-Max',
		parentSelect: '',
		dpSelect: '',
		colorSelect: 'black',
		backColorList: ['transparent', 'red', 'orange', 'blue', 'green', 'black', 'white', '#DCDCDC'],
		colorList: ['red', 'orange', 'blue', 'green', 'black', 'white', '#DCDCDC'],
		fontSelect: 'Verdana',
		fontList: ['Arial', 'Impact', 'Times New Roman', 'Verdana', 'Tahoma'],
		dpList: [],
		fontSize: 8,
		backColorSelect: 'white',
		value: 0,
		maxColorSelect: 'red',
		minColorSelect: 'orange',
		nomColorSelect: 'green',
		maxPercent: 75,
		minPercent: 35,
		width: 100,
		height: 100,
		url: '../images/leanware-logo.png'
	};

	// Variables with respect to main panel style
	$scope.mainPanelStyle = {
		'overflow': 'auto', 'position': 'absolute',
		'left': '15%', 'top': '0%', 'right': '0', 'bottom': '0%',
		'background': 'url(' + $scope.imagepath + ')',
		'background-size': '100% 100%',
		'background-repeat': 'no-repeat'
	};

	// Variables with respect to main panel style
	$scope.bottomPanelStyle = {
		'overflow': 'auto', 'position': 'absolute',
		'left': '15%', 'top': '85%', 'bottom': '0',
		'height': '15%', 'width': '85%'
	};

	//Object details with its properties
	$scope.objectDetails = [];

	//---------------------variable model for each objects--------------

	//label property model
	$scope.labelProperties = {
		id: '',
		objectId: '',
		html: '',
		objectHtml: '',
		name: '',
		font: 'Verdana',
		color: 'black',
		fontSize: '8px'
	};

	//textBox property model
	$scope.textBoxProperties = {
		id: '',
		objectId: '',
		parent: '',
		dataPoint: '',
		html: '',
		objectHtml: '',
		name: '',
		font: 'Verdana',
		color: 'black',
		backColor: 'white',
		fontSize: '8px',
		minMaxPresence: false,
		value: 0,
		maxColor: 'red',
		minColor: 'orange',
		nomColor: 'green',
		maxPercent: 75,
		minPercent: 35
	};

	//listBox property model
	$scope.listBoxProperties = {
		id: '',
		objectId: '',
		parent: '',
		dataPoint: '',
		html: '',
		objectHtml: '',
		name: '',
		font: 'Verdana',
		color: 'black',
		backColor: 'white',
		fontSize: '8px',
		typeMap: false,
		rows: 2,
		minMaxPresence: false,
		maxColor: 'red',
		maxColorValue: 2,
		minColor: 'orange',
		minColorValue: 0,
		nomColor: 'green',
		nomColorValue: 1
	};

	//image property model
	$scope.imageBoxProperties = {
		id: '',
		objectId: '',
		parent: '',
		dataPoint: '',
		html: '',
		objectHtml: '',
		name: '',
		url: '../images/leanware-logo.png',
		width: 100,
		height: 100
	};

	//Initialization Functions===========================================

	$scope.initializeObjectDisplay = function () {
		$scope.dpSelectPanel.booleanShow = false;
		$scope.dpSelectPanel.integerShow = false;
		$scope.dpSelectPanel.doubleShow = false;
		$scope.dpSelectPanel.stringShow = false;
		$scope.dpSelectPanel.longShow = false;
		$scope.dpSelectPanel.arrayShow = false;
		$scope.dpSelectPanel.mapShow = false;
	};

	$scope.initializeObjectProperties = function () {
		$scope.labelProperties = {
			id: '',
			objectId: '',
			html: '',
			name: '',
			objectHtml: '',
			font: 'Verdana',
			color: 'black',
			fontSize: '8px'
		};
		$scope.textBoxProperties = {
			id: '',
			objectId: '',
			parent: '',
			dataPoint: '',
			html: '',
			objectHtml: '',
			name: '',
			font: 'Verdana',
			color: 'black',
			backColor: 'white',
			fontSize: '8px',
			minMaxPresence: false,
			value: 0,
			maxColor: 'red',
			minColor: 'orange',
			nomColor: 'green',
			maxPercent: 75,
			minPercent: 35
		};
		$scope.listBoxProperties = {
			id: '',
			objectId: '',
			parent: '',
			dataPoint: '',
			html: '',
			objectHtml: '',
			name: '',
			font: 'Verdana',
			color: 'black',
			backColor: 'white',
			fontSize: '8px',
			typeMap: false,
			rows: 2,
			minMaxPresence: false,
			maxColor: 'red',
			maxColorValue: 2,
			minColor: 'orange',
			minColorValue: 0,
			nomColor: 'green',
			nomColorValue: 1
		};
		$scope.imageBoxProperties = {
			id: '',
			objectId: '',
			parent: '',
			dataPoint: '',
			html: '',
			objectHtml: '',
			name: '',
			url: '../images/leanware-logo.png',
			width: 100,
			height: 100
		};
	};

	$scope.initializeProperyitems = function () {
		$scope.bottomPropPanel = {
			name: '',
			panelShow: false,
			dpSelectShow: false,
			imageDetailsShow: false,
			fontPropShow: false,
			minMaxButton: false,
			minMaxShow: false,
			rowSelectionShow: false,
			rowNos: 2,
			minMaxValue: 'Min-Max',
			parentSelect: '',
			dpSelect: '',
			colorSelect: 'black',
			backColorList: ['transparent', 'red', 'orange', 'blue', 'green', 'black', 'white', '#DCDCDC'],
			colorList: ['red', 'orange', 'blue', 'green', 'black', 'white', '#DCDCDC'],
			fontSelect: 'Verdana',
			fontList: ['Arial', 'Impact', 'Times New Roman', 'Verdana', 'Tahoma'],
			dpList: [],
			fontSize: 8,
			backColorSelect: 'white',
			value: 0,
			maxColorSelect: 'red',
			minColorSelect: 'orange',
			nomColorSelect: 'green',
			maxPercent: 75,
			minPercent: 35,
			width: 100,
			height: 100,
			url: '../images/leanware-logo.png'
		};
	};

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	//:::::::::::::::::::::::::::::::Balaji:::::::::::::::::::::::::::::

	//-------------------------------Socket Functions-------------------

	// Initially contatct the initial configuration socket for getting the each individual type data points
	// The reply will also be using socket.io
	socket.emit('initialConfig', {
		'hi': 'hello',
	});

	//Boolean data point socket
	socket.on('boolean_DataPoint', function (data) {
		$scope.booleanDP = data;
	});

	//Integer data point socket
	socket.on('integer_DataPoint', function (data) {
		$scope.integerDP = data;
	});

	//Double data point socket
	socket.on('double_DataPoint', function (data) {
		$scope.doubleDP = data;
	});

	//Long data point socket
	socket.on('long_DataPoint', function (data) {
		$scope.longDP = data;
	});

	//String data point socket
	socket.on('string_DataPoint', function (data) {
		$scope.stringDP = data;
	});

	//All data point socket
	socket.on('all_DataPoint', function (data) {
		$scope.allDP = data;
	});

	// Socket Function which makes the bottom property panel visible
	socket.on('panel_Visibility_OnClick', function (data) {
		$scope.bottomPropPanel.panelShow = false;
		$scope.mainPanelStyle = {
			'overflow': 'auto', 'position': 'absolute',
			'left': '15%', 'top': '0%', 'right': '0', 'bottom': '0%',
			'background': 'url(' + $scope.imagepath + ')',
			'background-size': '100% 100%',
			'background-repeat': 'no-repeat'
		};
	});

	// Socket Function which makes the bottom property panel visible and assign the default values
	socket.on('panel_Visibility', function (data) {
		$scope.initializeProperyitems();
		$scope.bottomPropPanel.panelShow = !$scope.bottomPropPanel.panelShow;
		if ($scope.bottomPropPanel.panelShow) {
			$scope.mainPanelStyle = {
				'overflow': 'auto', 'position': 'absolute',
				'left': '15%', 'top': '0%', 'right': '0', 'bottom': '15%',
				'background': 'url(' + $scope.imagepath + ')',
				'background-size': '100% 100%',
				'background-repeat': 'no-repeat'
			};
		} else {
			$scope.mainPanelStyle = {
				'overflow': 'auto', 'position': 'absolute',
				'left': '15%', 'top': '0%', 'right': '0', 'bottom': '0%',
				'background': 'url(' + $scope.imagepath + ')',
				'background-size': '100% 100%',
				'background-repeat': 'no-repeat'
			};
		}
		for (i = 0; len = $scope.objectDetails.length, i < len; i++) {
			//Check the element Id and assign the properties to the options in properties panel
			//If the property has already been assigned earlier it displays them elase it displays the default values.
			if ($scope.objectDetails[i].id === "\"" + data.elementId + "\"") {
				$scope.bottomPropPanel.parentSelect = $scope.objectDetails[i].parent;
				$scope.bottomPropPanel.dpSelect = $scope.objectDetails[i].dataPoint;
				$scope.bottomPropPanel.colorSelect = $scope.objectDetails[i].color;
				$scope.bottomPropPanel.fontSelect = $scope.objectDetails[i].font;
				$scope.bottomPropPanel.name = $scope.objectDetails[i].name;
				switch ($scope.objectDetails[i].objectId) {
					case 'label':
						$scope.bottomPropPanel.fontPropShow = true;
						$scope.bottomPropPanel.minMaxShow = false;
						$scope.bottomPropPanel.fontSize = parseInt($scope.objectDetails[i].fontSize.replace("px", ""));
						break;
					case 'textBox':
						$scope.bottomPropPanel.dpSelectShow = true;
						$scope.bottomPropPanel.minMaxButton = true;
						$scope.bottomPropPanel.fontPropShow = true;
						$scope.bottomPropPanel.fontSize = parseInt($scope.objectDetails[i].fontSize.replace("px", ""));
						$scope.bottomPropPanel.backColorSelect = $scope.objectDetails[i].backColor;
						$scope.bottomPropPanel.minMaxShow = $scope.objectDetails[i].minMaxPresence;
						$scope.bottomPropPanel.value = $scope.objectDetails[i].value;
						$scope.bottomPropPanel.maxColorSelect = $scope.objectDetails[i].maxColor;
						$scope.bottomPropPanel.maxPercent = $scope.objectDetails[i].maxPercent;
						$scope.bottomPropPanel.minColorSelect = $scope.objectDetails[i].minColor;
						$scope.bottomPropPanel.minPercent = $scope.objectDetails[i].minPercent;
						$scope.bottomPropPanel.nomColorSelect = $scope.objectDetails[i].nomColor;
						break;
					case 'listBox':
						$scope.bottomPropPanel.dpSelectShow = true;
						$scope.bottomPropPanel.minMaxButton = true;
						$scope.bottomPropPanel.fontPropShow = true;
						$scope.bottomPropPanel.fontSize = parseInt($scope.objectDetails[i].fontSize.replace("px", ""));
						$scope.bottomPropPanel.rowSelectionShow = !$scope.objectDetails[i].typeMap;
						$scope.bottomPropPanel.minMaxValue = 'Map';
						$scope.bottomPropPanel.backColorSelect = $scope.objectDetails[i].backColor;
						$scope.bottomPropPanel.minMaxShow = $scope.objectDetails[i].minMaxPresence;
						$scope.bottomPropPanel.value = $scope.objectDetails[i].value;
						$scope.bottomPropPanel.maxColorSelect = $scope.objectDetails[i].maxColor;
						$scope.bottomPropPanel.maxPercent = $scope.objectDetails[i].maxPercent;
						$scope.bottomPropPanel.minColorSelect = $scope.objectDetails[i].minColor;
						$scope.bottomPropPanel.minPercent = $scope.objectDetails[i].minPercent;
						$scope.bottomPropPanel.nomColorSelect = $scope.objectDetails[i].nomColor;
						break;
					case 'image':
						$scope.bottomPropPanel.imageDetailsShow = true;
						$scope.bottomPropPanel.url = $scope.objectDetails[i].url;
						$scope.bottomPropPanel.width = $scope.objectDetails[i].width;
						$scope.bottomPropPanel.height = $scope.objectDetails[i].height;
				}
			}
		}
		$scope.currentObject = data.elementId;

	});

	//Socket Function which is pinged when the object is added
	socket.on('added_Object', function (data) {
		$scope.initializeObjectProperties();
		dummyflag = false;
		for (i = 0; len = $scope.objectDetails.length, i < len; i++) {
			if ($scope.objectDetails[i].id === data.id) {
				dummyflag = true;
			}
		}
		if (!dummyflag) {
			switch (data.objectId) {
				case 'label':
					$scope.labelProperties.id = String(data.id);
					$scope.labelProperties.objectId = data.objectId;
					$scope.labelProperties.html = data.currentHtml;
					$scope.labelProperties.objectHtml = data.objectHtml;
					$scope.objectDetails.push($scope.labelProperties);
					break;
				case 'textBox':
					$scope.textBoxProperties.id = String(data.id);
					$scope.textBoxProperties.objectId = data.objectId;
					$scope.textBoxProperties.html = data.currentHtml;
					$scope.textBoxProperties.objectHtml = data.objectHtml;
					$scope.objectDetails.push($scope.textBoxProperties);
					break;
				case 'listBox':
					$scope.listBoxProperties.id = String(data.id);
					$scope.listBoxProperties.objectId = data.objectId;
					$scope.listBoxProperties.html = data.currentHtml;
					$scope.listBoxProperties.objectHtml = data.objectHtml;
					$scope.objectDetails.push($scope.listBoxProperties);
					break;
				case 'image':
					$scope.imageBoxProperties.id = String(data.id);
					$scope.imageBoxProperties.objectId = data.objectId;
					$scope.imageBoxProperties.html = data.currentHtml;
					$scope.imageBoxProperties.objectHtml = data.objectHtml;
					$scope.objectDetails.push($scope.imageBoxProperties);
					break;
			}
		}
	});

	//------------------------------------------------------------------

	//-----------------------------Tab Alert Function-------------------

	// Function that generates alert when the Object Tab is clicked				
	$scope.tabAlert = function () {
		setTimeout(function () {
			$window.alert('The Objects will be displayed based on the Datapoint you select');
		});
	};

	//------------------------------------------------------------------

	//-----------------------------Object left Panel Functions-------------------

	// Function that generates the list of Data points based on the parent (Phase) selection				
	$scope.generateDP = function () {
		$scope.dpSelectPanel.dpList.length = 0;
		if ($scope.dpSelectPanel.parentSelect !== '') {
			for (i = 0; len = $scope.allDP.length, len > i; i++) {
				if ($scope.allDP[i].id === $scope.dpSelectPanel.parentSelect) {
					$scope.dpSelectPanel.dpList = Object.keys($scope.allDP[i].data);
				}
			}
		}
	};


	// Function that generates the list of Objects based on the DataPoint selection				
	$scope.generateObject = function () {
		if (($scope.dpSelectPanel.parentSelect !== '') && ($scope.dpSelectPanel.dpSelect !== '')) {
			for (i = 0; len = $scope.allDP.length, len > i; i++) {
				if ($scope.allDP[i].id === $scope.dpSelectPanel.parentSelect) {
					switch ($scope.allDP[i].data[$scope.dpSelectPanel.dpSelect]) {
						case 'boolean':
							$scope.initializeObjectDisplay();
							$scope.dpSelectPanel.booleanShow = true;
							break;
						case 'integer':
							$scope.initializeObjectDisplay();
							$scope.dpSelectPanel.integerShow = true;
							break;
						case 'string':
							$scope.initializeObjectDisplay();
							$scope.dpSelectPanel.doubleShow = true;
							break;
						case 'double':
							$scope.initializeObjectDisplay();
							$scope.dpSelectPanel.longShow = true;
							break;
						case 'long':
							$scope.initializeObjectDisplay();
							$scope.dpSelectPanel.stringShow = true;
							break;
						case 'array(string)':
							$scope.initializeObjectDisplay();
							$scope.dpSelectPanel.arrayShow = true;
							break;
						case 'hashmap(string, boolean)':
							$scope.initializeObjectDisplay();
							$scope.dpSelectPanel.mapShow = true;
							break;
						default:
							$scope.initializeObjectDisplay();
							break;
					}
				}
			}
		}
	};

	//------------------------------------------------------------------

	//-----------------------------left Panel Functions-------------------

	//Function that shows or hides the grid depending upon the user requirements
	$scope.showHideGrid = function () {
		if ($scope.gridDetails.hide) {
			$scope.dropTargetOne.style = {};
			$scope.gridDetails.value = 'show';
		} else {
			$scope.dropTargetOne.style = {
				'background-color': 'transparent',
				'background-image': 'linear-gradient(0deg, transparent 24%, ' + $scope.gridDetails.color + ' 25%, ' + $scope.gridDetails.color + ' 26%, transparent 27%, transparent 74%, ' + $scope.gridDetails.color + ' 75%, ' + $scope.gridDetails.color + ' 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ' + $scope.gridDetails.color + ' 25%, ' + $scope.gridDetails.color + ' 26%, transparent 27%, transparent 74%, ' + $scope.gridDetails.color + ' 75%, ' + $scope.gridDetails.color + ' 76%, transparent 77%, transparent)',
				'background-size': '30px 30px'
			};
			$scope.gridDetails.value = 'hide';
		}
	};

	//Function that changes the grid color
	$scope.gridColorChange = function () {
		if ($scope.gridDetails.colorSelect === 'black') {
			$scope.gridDetails.color = 'rgba(0, 0, 0, .20)';
			$scope.dropTargetOne.style = {
				'background-color': 'transparent',
				'background-image': 'linear-gradient(0deg, transparent 24%, ' + $scope.gridDetails.color + ' 25%, ' + $scope.gridDetails.color + ' 26%, transparent 27%, transparent 74%, ' + $scope.gridDetails.color + ' 75%, ' + $scope.gridDetails.color + ' 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ' + $scope.gridDetails.color + ' 25%, ' + $scope.gridDetails.color + ' 26%, transparent 27%, transparent 74%, ' + $scope.gridDetails.color + ' 75%, ' + $scope.gridDetails.color + ' 76%, transparent 77%, transparent)',
				'background-size': '30px 30px'
			};
		} else {
			$scope.gridDetails.color = 'rgba(255, 255, 255, .20)';
			$scope.dropTargetOne.style = {
				'background-color': 'transparent',
				'background-image': 'linear-gradient(0deg, transparent 24%, ' + $scope.gridDetails.color + ' 25%, ' + $scope.gridDetails.color + ' 26%, transparent 27%, transparent 74%, ' + $scope.gridDetails.color + ' 75%, ' + $scope.gridDetails.color + ' 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ' + $scope.gridDetails.color + ' 25%, ' + $scope.gridDetails.color + ' 26%, transparent 27%, transparent 74%, ' + $scope.gridDetails.color + ' 75%, ' + $scope.gridDetails.color + ' 76%, transparent 77%, transparent)',
				'background-size': '30px 30px'
			};
		}
	};

	//Function that changes the backgroud image depending on the user configurations
	$scope.setBackground = function () {
		$scope.imagepath = $scope.newimagepath;
    };

	//-----------------------------Bottom Property Panel Functions-------------------

	// Function that generates the list of Data points based on the parent (Phase) selection				
	$scope.generatePropDP = function () {
		$scope.bottomPropPanel.dpList.length = 0;
		if (($scope.bottomPropPanel.parentSelect !== '') && ($scope.currentObject !== '')) {
			var objectId = '';
			for (i = 0; len = $scope.objectDetails.length, i < len; i++) {
				if ($scope.objectDetails[i].id === "\"" + $scope.currentObject + "\"") {
					objectId = $scope.objectDetails[i].objectId;
				}
			}
			for (i = 0; len = $scope.allDP.length, len > i; i++) {
				if ($scope.allDP[i].id === $scope.bottomPropPanel.parentSelect) {
					switch (objectId) {
						case 'label':
							break;
						case 'textBox':
							var dataPointArray = [];
							dataPointArray = Object.keys($scope.allDP[i].data);
							for (j = 0; lenJ = dataPointArray.length, lenJ > j; j++) {
								if (($scope.allDP[i].data[dataPointArray[j]] === 'string') || ($scope.allDP[i].data[dataPointArray[j]] === 'integer') || ($scope.allDP[i].data[dataPointArray[j]] === 'double') || ($scope.allDP[i].data[dataPointArray[j]] === 'long')) {
									$scope.bottomPropPanel.dpList.push(dataPointArray[j]);
								}
							}
							break;
						default:
							$scope.bottomPropPanel.dpList = Object.keys($scope.allDP[i].data);
							break;
					}
				}
			}
		}
	};

	//function that registers the data points to the variable
	$scope.assignProperties = function () {
		if ($scope.currentObject !== '') {
			for (i = 0; len = $scope.objectDetails.length, i < len; i++) {
				if ($scope.objectDetails[i].id === "\"" + $scope.currentObject + "\"") {
					dummyName = 'empty';
					//Assign the selected configuration values to the object details
					$scope.objectDetails[i].parent = $scope.bottomPropPanel.parentSelect;
					$scope.objectDetails[i].dataPoint = $scope.bottomPropPanel.dpSelect;
					$scope.objectDetails[i].font = $scope.bottomPropPanel.fontSelect;
					$scope.objectDetails[i].color = $scope.bottomPropPanel.colorSelect;
					$scope.objectDetails[i].fontSize = $scope.bottomPropPanel.fontSize + "px";
					$scope.objectDetails[i].name = $scope.bottomPropPanel.name;
					//convert 'ObjectHTML' String to HTML DOM Element
					var htmlElement = angular.element($scope.objectDetails[i].objectHtml);
					if ($scope.bottomPropPanel.name !== '') {
						dummyName = $scope.bottomPropPanel.name;
					}
					//Assign values for DOM elements					
					switch ($scope.objectDetails[i].objectId) {
						case 'label':
							//Label Assigns Name, color and Font family
							htmlElement[0].innerHTML = dummyName;
							htmlElement[0].style.fontFamily = $scope.bottomPropPanel.fontSelect;
							htmlElement[0].style.color = $scope.bottomPropPanel.colorSelect;
							htmlElement[0].style.fontSize = $scope.bottomPropPanel.fontSize + "px";
							break;
						case 'textBox':
							//Textbox Assigns properties to DOM
							htmlElement[0].innerHTML = dummyName;
							htmlElement[0].style.fontFamily = $scope.bottomPropPanel.fontSelect;
							htmlElement[0].style.color = $scope.bottomPropPanel.colorSelect;
							htmlElement[0].style.backgroundColor = $scope.bottomPropPanel.backColorSelect;
							htmlElement[0].style.fontSize = $scope.bottomPropPanel.fontSize + "px";
							if ($scope.bottomPropPanel.minMaxShow) {
								$scope.objectDetails[i].minMaxPresence = $scope.bottomPropPanel.minMaxShow;
								$scope.objectDetails[i].value = $scope.bottomPropPanel.value;
								$scope.objectDetails[i].maxColor = $scope.bottomPropPanel.maxColorSelect;
								$scope.objectDetails[i].maxPercent = $scope.bottomPropPanel.maxPercent;
								$scope.objectDetails[i].minColor = $scope.bottomPropPanel.minColorSelect;
								$scope.objectDetails[i].minPercent = $scope.bottomPropPanel.minPercent;
								$scope.objectDetails[i].nomColor = $scope.bottomPropPanel.nomColorSelect;
							}
							break;
						case 'image':
							//Assign image properties to DOM 
							htmlElement[0].src = $scope.bottomPropPanel.url;
							htmlElement[0].width = $scope.bottomPropPanel.width;
							htmlElement[0].height = $scope.bottomPropPanel.height;
							break;
					}
					//convert HTML DOM Element to String and assign it to 'ObjectHTML'
					$scope.objectDetails[i].objectHtml = htmlElement[0].outerHTML;
					//Emit the event to Server indicating that the properties has changed
					socket.emit('propChanged', $scope.objectDetails[i]);
				}
			}
		}
	};

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

});