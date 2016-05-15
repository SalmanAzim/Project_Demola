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
		value: 'Hide Grid',
		hide: false,
		colorSelect: 'Grid Color: BLACK',
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
		arrayShow: false
	};

	// Variables with respect to bottom panel
	$scope.bottomPropPanel = {
		backColorList: ['transparent', 'red', 'orange', 'blue', 'green', 'black', 'white', '#DCDCDC'],
		backColorSelect: 'white',
		colorList: ['red', 'orange', 'blue', 'green', 'black', 'white', '#DCDCDC'],
		colorSelect: 'black',
		dangrColorSelect: 'red',
		degree: 0,
		dpList: [],
		dpSelect: '',
		dpSelectShow: false,
		fontList: ['Arial', 'Impact', 'Times New Roman', 'Verdana', 'Tahoma'],
		fontPropShow: false,
		fontSelect: 'Verdana',
		fontSize: 14,
		gaugeDetailsShow: false,
		height: 100,
		imageDetailsShow: false,
		justPanel: false,
		maxColorSelect: 'red',
		maxPercent: 75,
		maxTextBoxDisplayName: 'Maximum Value',
		minColorSelect: 'orange',
		minMaxButton: false,
		minMaxShow: false,
		minMaxValue: 'Min-Max',
		minPercent: 35,
		minTextBoxDisplayName: 'Max-%',
		name: '',
		nomColorSelect: 'green',
		nomTextBoxDisplayName: 'Min-%',
		panelShow: false,
		parentSelect: '',
		radius: 30,
		rowNos: 2,
		rowSelectionShow: false,
		svgCircleShow: false,
		svgDetailsShow: false,
		svgPathShow: false,
		svgSquareShow: false,
		unfixRowNos: false,
		unit: '',
		url: '../images/leanware-logo.png',
		value: 0,
		width: 100,
		zoom: 100
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
		finalHtml: '',
		id: '',
		objectId: '',
		posX: '',
		posY: '',
		html: '',
		objectHtml: '',
		name: '',
		font: 'Verdana',
		color: 'black',
		fontSize: '14px'
	};

	//textBox property model
	$scope.textBoxProperties = {
		finalHtml: '',
		id: '',
		objectId: '',
		posX: '',
		posY: '',
		parent: '',
		dataPoint: '',
		html: '',
		objectHtml: '',
		name: '',
		font: 'Verdana',
		color: 'black',
		backColor: 'white',
		fontSize: '14px',
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
		finalHtml: '',
		id: '',
		objectId: '',
		parent: '',
		posX: '',
		posY: '',
		dataPoint: '',
		html: '',
		objectHtml: '',
		originalHtml: '',
		name: '',
		font: 'Verdana',
		color: 'black',
		backColor: 'white',
		fontSize: '14px',
		typeMap: false,
		rows: 2,
		fixRow: false,
		maxColor: 'red',
		maxColorValue: 2,
		minColor: 'orange',
		minColorValue: 0,
		nomColor: 'green',
		nomColorValue: 1
	};

	//image property model
	$scope.imageBoxProperties = {
		finalHtml: '',
		id: '',
		objectId: '',
		parent: '',
		posX: '',
		posY: '',
		dataPoint: '',
		html: '',
		objectHtml: '',
		name: '',
		url: '../images/leanware-logo.png',
		width: 100,
		height: 100,
		degree: 0
	};

	//svg property model
	$scope.svgProperties = {
		finalHtml: '',
		id: '',
		name: '',
		objectId: '',
		parent: '',
		dataPoint: '',
		posX: '',
		posY: '',
		html: '',
		objectHtml: '',
		justPanel: false,
		nomColorSelect: 'green',
		dangrColorSelect: 'red',
		color: 'black',
		width: 60,
		height: 60,
		radius: 30,
		zoom: 100,
		degree: 0
	};

	//Gauge property model
	$scope.gaugeProperties = {
		fontSize: 14,
		finalHtml: '',
		id: '',
		name: '',
		objectId: '',
		parent: '',
		dataPoint: '',
		posX: '',
		posY: '',
		html: '',
		objectHtml: '',
		unit: '',
		nomColor: 'green',
		maxColor: 'orange',
		minColor: 'orange',
		color: 'green',
		width: 60,
		height: 60,
		minValue: 30,
		maxValue: 70,
	};

	//Chart property model
	$scope.chartProperties = {
		finalHtml: '',
		id: '',
		name: '',
		objectId: '',
		parent: '',
		dataPoint: '',
		posX: '',
		posY: '',
		html: '',
		objectHtml: '',
		width: 60,
		height: 60,
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
			finalHtml: '',
			id: '',
			objectId: '',
			posX: '',
			posY: '',
			html: '',
			objectHtml: '',
			name: '',
			font: 'Verdana',
			color: 'black',
			fontSize: '14px'
		};
		$scope.textBoxProperties = {
			finalHtml: '',
			id: '',
			objectId: '',
			posX: '',
			posY: '',
			parent: '',
			dataPoint: '',
			html: '',
			objectHtml: '',
			name: '',
			font: 'Verdana',
			color: 'black',
			backColor: 'white',
			fontSize: '14px',
			minMaxPresence: false,
			value: 0,
			maxColor: 'red',
			minColor: 'orange',
			nomColor: 'green',
			maxPercent: 75,
			minPercent: 35
		};
		$scope.listBoxProperties = {
			finalHtml: '',
			id: '',
			objectId: '',
			parent: '',
			posX: '',
			posY: '',
			dataPoint: '',
			html: '',
			objectHtml: '',
			originalHtml: '',
			name: '',
			font: 'Verdana',
			color: 'black',
			backColor: 'white',
			fontSize: '14px',
			typeMap: false,
			rows: 2,
			fixRow: false,
			maxColor: 'red',
			maxColorValue: 2,
			minColor: 'orange',
			minColorValue: 0,
			nomColor: 'green',
			nomColorValue: 1
		};
		$scope.imageBoxProperties = {
			finalHtml: '',
			id: '',
			objectId: '',
			parent: '',
			posX: '',
			posY: '',
			dataPoint: '',
			html: '',
			objectHtml: '',
			name: '',
			url: '../images/leanware-logo.png',
			width: 100,
			height: 100,
			degree: 0
		};
		$scope.svgProperties = {
			finalHtml: '',
			id: '',
			name: '',
			objectId: '',
			parent: '',
			dataPoint: '',
			posX: '',
			posY: '',
			html: '',
			objectHtml: '',
			justPanel: false,
			nomColorSelect: 'green',
			dangrColorSelect: 'red',
			color: 'black',
			width: 60,
			height: 60,
			radius: 30,
			zoom: 100,
			degree: 0
		};
		$scope.gaugeProperties = {
			fontSize: 14,
			finalHtml: '',
			id: '',
			name: '',
			objectId: '',
			parent: '',
			dataPoint: '',
			posX: '',
			posY: '',
			html: '',
			objectHtml: '',
			unit: '',
			nomColor: 'green',
			maxColor: 'orange',
			minColor: 'orange',
			color: 'green',
			width: 60,
			height: 60,
			minValue: 30,
			maxValue: 70,
		};
		$scope.chartProperties = {
			finalHtml: '',
			id: '',
			name: '',
			objectId: '',
			parent: '',
			dataPoint: '',
			posX: '',
			posY: '',
			html: '',
			objectHtml: '',
			width: 60,
			height: 60,
		};
	};

	$scope.initializeProperyitems = function () {
		$scope.bottomPropPanel = {
			backColorList: ['transparent', 'red', 'orange', 'blue', 'green', 'black', 'white', '#DCDCDC'],
			backColorSelect: 'white',
			colorList: ['red', 'orange', 'blue', 'green', 'black', 'white', '#DCDCDC'],
			colorSelect: 'black',
			dangrColorSelect: 'red',
			degree: 0,
			dpList: [],
			dpSelect: '',
			dpSelectShow: false,
			fontList: ['Arial', 'Impact', 'Times New Roman', 'Verdana', 'Tahoma'],
			fontPropShow: false,
			fontSelect: 'Verdana',
			fontSize: 14,
			gaugeDetailsShow: false,
			height: 100,
			imageDetailsShow: false,
			justPanel: false,
			maxColorSelect: 'red',
			maxPercent: 75,
			maxTextBoxDisplayName: 'Maximum Value',
			minColorSelect: 'orange',
			minMaxButton: false,
			minMaxShow: false,
			minMaxValue: 'Min-Max',
			minPercent: 35,
			minTextBoxDisplayName: 'Max-%',
			name: '',
			nomColorSelect: 'green',
			nomTextBoxDisplayName: 'Min-%',
			panelShow: false,
			parentSelect: '',
			radius: 30,
			rowNos: 2,
			rowSelectionShow: false,
			svgCircleShow: false,
			svgDetailsShow: false,
			svgPathShow: false,
			svgSquareShow: false,
			unfixRowNos: false,
			units: '',
			url: '../images/leanware-logo.png',
			value: 0,
			width: 100,
			zoom: 100
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
				$scope.bottomPropPanel.name = $scope.objectDetails[i].name;
				switch ($scope.objectDetails[i].objectId) {
					case 'label':
						$scope.bottomPropPanel.fontPropShow = true;
						$scope.bottomPropPanel.minMaxShow = false;
						$scope.bottomPropPanel.colorSelect = $scope.objectDetails[i].color;
						$scope.bottomPropPanel.fontSelect = $scope.objectDetails[i].font;
						$scope.bottomPropPanel.fontSize = parseInt($scope.objectDetails[i].fontSize.replace("px", ""));
						break;
					case 'textBox':
						$scope.bottomPropPanel.dpSelectShow = true;
						$scope.bottomPropPanel.minMaxButton = true;
						$scope.bottomPropPanel.fontPropShow = true;
						$scope.bottomPropPanel.maxTextBoxDisplayName = 'Maximum Value';
						$scope.bottomPropPanel.minTextBoxDisplayName = 'Max-%';
						$scope.bottomPropPanel.nomTextBoxDisplayName = 'Min-%';
						$scope.bottomPropPanel.colorSelect = $scope.objectDetails[i].color;
						$scope.bottomPropPanel.fontSelect = $scope.objectDetails[i].font;
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
						$scope.bottomPropPanel.minMaxValue = 'Map';
						$scope.bottomPropPanel.maxTextBoxDisplayName = 'Maximum Pos Value';
						$scope.bottomPropPanel.minTextBoxDisplayName = 'Minimum Pos Value';
						$scope.bottomPropPanel.nomTextBoxDisplayName = 'Nominal Pos Value';
						$scope.bottomPropPanel.colorSelect = $scope.objectDetails[i].color;
						$scope.bottomPropPanel.fontSelect = $scope.objectDetails[i].font;
						$scope.bottomPropPanel.fontSize = parseInt($scope.objectDetails[i].fontSize.replace("px", ""));
						$scope.bottomPropPanel.rowSelectionShow = !$scope.objectDetails[i].typeMap;
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
						//Before assigning the value for degree from the object array, it si first checked what is the div element value
						//The reason being that the user may just rotate and may not click on OK and when he again looks for the property, it will be 0 since it will be assigned form the object array
						//Hence it is first got from the div element. Incase the Div element transform is empty, then it is given as zero. 
						var transform = angular.element(document.getElementById(data.elementId))[0].style.transform;
						if (transform !== '') {
							$scope.bottomPropPanel.degree = parseInt(transform.substring(transform.indexOf("(") + 1, transform.indexOf("deg)")));
						} else {
							$scope.bottomPropPanel.degree = 0;
						}
						break;
					case 'svg-square':
						$scope.bottomPropPanel.dpSelectShow = true;
						$scope.bottomPropPanel.svgDetailsShow = true;
						$scope.bottomPropPanel.svgSquareShow = true;
						$scope.bottomPropPanel.justPanel = $scope.objectDetails[i].justPanel;
						$scope.bottomPropPanel.width = $scope.objectDetails[i].width;
						$scope.bottomPropPanel.height = $scope.objectDetails[i].height;
						$scope.bottomPropPanel.nomColorSelect = $scope.objectDetails[i].nomColorSelect;
						$scope.bottomPropPanel.dangrColorSelect = $scope.objectDetails[i].dangrColorSelect;
						//Before assigning the value for degree from the object array, it si first checked what is the div element value
						//The reason being that the user may just rotate and may not click on OK and when he again looks for the property, it will be 0 since it will be assigned form the object array
						//Hence it is first got from the div element. Incase the Div element transform is empty, then it is given as zero. 
						var transform = angular.element(document.getElementById(data.elementId))[0].style.transform;
						if (transform !== '') {
							$scope.bottomPropPanel.degree = parseInt(transform.substring(transform.indexOf("(") + 1, transform.indexOf("deg)")));
						} else {
							$scope.bottomPropPanel.degree = 0;
						}
						break;
					case 'svg-circle':
						$scope.bottomPropPanel.dpSelectShow = true;
						$scope.bottomPropPanel.svgDetailsShow = true;
						$scope.bottomPropPanel.svgCircleShow = true;
						$scope.bottomPropPanel.justPanel = $scope.objectDetails[i].justPanel;
						$scope.bottomPropPanel.radius = $scope.objectDetails[i].radius;
						$scope.bottomPropPanel.nomColorSelect = $scope.objectDetails[i].nomColorSelect;
						$scope.bottomPropPanel.dangrColorSelect = $scope.objectDetails[i].dangrColorSelect;
						//Before assigning the value for degree from the object array, it si first checked what is the div element value
						//The reason being that the user may just rotate and may not click on OK and when he again looks for the property, it will be 0 since it will be assigned form the object array
						//Hence it is first got from the div element. Incase the Div element transform is empty, then it is given as zero. 
						var transform = angular.element(document.getElementById(data.elementId))[0].style.transform;
						if (transform !== '') {
							$scope.bottomPropPanel.degree = parseInt(transform.substring(transform.indexOf("(") + 1, transform.indexOf("deg)")));
						} else {
							$scope.bottomPropPanel.degree = 0;
						}
						break;
					case 'svg-path':
						$scope.bottomPropPanel.dpSelectShow = true;
						$scope.bottomPropPanel.svgDetailsShow = true;
						$scope.bottomPropPanel.svgPathShow = true;
						$scope.bottomPropPanel.justPanel = $scope.objectDetails[i].justPanel;
						$scope.bottomPropPanel.zoom = $scope.objectDetails[i].zoom;
						$scope.bottomPropPanel.nomColorSelect = $scope.objectDetails[i].nomColorSelect;
						$scope.bottomPropPanel.dangrColorSelect = $scope.objectDetails[i].dangrColorSelect;
						//Before assigning the value for degree from the object array, it si first checked what is the div element value
						//The reason being that the user may just rotate and may not click on OK and when he again looks for the property, it will be 0 since it will be assigned form the object array
						//Hence it is first got from the div element. Incase the Div element transform is empty, then it is given as zero. 
						var transform = angular.element(document.getElementById(data.elementId))[0].style.transform;
						if (transform !== '') {
							$scope.bottomPropPanel.degree = parseInt(transform.substring(transform.indexOf("(") + 1, transform.indexOf("deg)")));
						} else {
							$scope.bottomPropPanel.degree = 0;
						}
						break;
					case 'gauge-1':
						$scope.bottomPropPanel.dpSelectShow = true;
						$scope.bottomPropPanel.gaugeDetailsShow = true;
						$scope.bottomPropPanel.fontPropShow = true;
						break;
					case 'gauge-2':
						$scope.bottomPropPanel.dpSelectShow = true;
						$scope.bottomPropPanel.gaugeDetailsShow = true;
						$scope.bottomPropPanel.fontPropShow = true;
						break;
					case 'gauge-3':
						$scope.bottomPropPanel.dpSelectShow = true;
						$scope.bottomPropPanel.gaugeDetailsShow = true;
						$scope.bottomPropPanel.fontPropShow = true;
						$scope.bottomPropPanel.minMaxShow = true;
						$scope.bottomPropPanel.minTextBoxDisplayName = 'Min-Value-Start'
						$scope.bottomPropPanel.maxTextBoxDisplayName = 'Max-Value-Start'
						break;
					case 'bar-chart':
						$scope.bottomPropPanel.dpSelectShow = true;
						break;
					case 'line-chart':
						$scope.bottomPropPanel.dpSelectShow = true;
						break;
					case 'candle-chart':
						$scope.bottomPropPanel.dpSelectShow = true;
						break;
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
					$scope.labelProperties.posX = data.positionX;
					$scope.labelProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.labelProperties);
					break;
				case 'textBox':
					$scope.textBoxProperties.id = String(data.id);
					$scope.textBoxProperties.objectId = data.objectId;
					$scope.textBoxProperties.html = data.currentHtml;
					$scope.textBoxProperties.objectHtml = data.objectHtml;
					$scope.textBoxProperties.posX = data.positionX;
					$scope.textBoxProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.textBoxProperties);
					break;
				case 'listBox':
					$scope.listBoxProperties.id = String(data.id);
					$scope.listBoxProperties.objectId = data.objectId;
					$scope.listBoxProperties.html = data.currentHtml;
					$scope.listBoxProperties.objectHtml = data.objectHtml;
					$scope.listBoxProperties.originalHtml = data.objectHtml;
					$scope.listBoxProperties.posX = data.positionX;
					$scope.listBoxProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.listBoxProperties);
					break;
				case 'image':
					$scope.imageBoxProperties.id = String(data.id);
					$scope.imageBoxProperties.objectId = data.objectId;
					$scope.imageBoxProperties.html = data.currentHtml;
					$scope.imageBoxProperties.objectHtml = data.objectHtml;
					$scope.imageBoxProperties.posX = data.positionX;
					$scope.imageBoxProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.imageBoxProperties);
					break;
				case 'svg-square':
					$scope.svgProperties.id = String(data.id);
					$scope.svgProperties.objectId = data.objectId;
					$scope.svgProperties.html = data.currentHtml;
					$scope.svgProperties.objectHtml = data.objectHtml;
					$scope.svgProperties.posX = data.positionX;
					$scope.svgProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.svgProperties);
					break;
				case 'svg-circle':
					$scope.svgProperties.id = String(data.id);
					$scope.svgProperties.objectId = data.objectId;
					$scope.svgProperties.html = data.currentHtml;
					$scope.svgProperties.objectHtml = data.objectHtml;
					$scope.svgProperties.posX = data.positionX;
					$scope.svgProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.svgProperties);
					break;
				case 'svg-path':
					$scope.svgProperties.id = String(data.id);
					$scope.svgProperties.objectId = data.objectId;
					$scope.svgProperties.html = data.currentHtml;
					$scope.svgProperties.objectHtml = data.objectHtml;
					$scope.svgProperties.posX = data.positionX;
					$scope.svgProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.svgProperties);
					break;
				case 'gauge-1':
					$scope.chartProperties.id = String(data.id);
					$scope.chartProperties.objectId = data.objectId;
					$scope.chartProperties.html = data.currentHtml;
					$scope.chartProperties.objectHtml = data.objectHtml;
					$scope.chartProperties.posX = data.positionX;
					$scope.chartProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.chartProperties);
					break;
				case 'gauge-2':
					$scope.chartProperties.id = String(data.id);
					$scope.chartProperties.objectId = data.objectId;
					$scope.chartProperties.html = data.currentHtml;
					$scope.chartProperties.objectHtml = data.objectHtml;
					$scope.chartProperties.posX = data.positionX;
					$scope.chartProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.chartProperties);
					break;
				case 'gauge-3':
					$scope.chartProperties.id = String(data.id);
					$scope.chartProperties.objectId = data.objectId;
					$scope.chartProperties.html = data.currentHtml;
					$scope.chartProperties.objectHtml = data.objectHtml;
					$scope.chartProperties.posX = data.positionX;
					$scope.chartProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.chartProperties);
					break;
				case 'bar-chart':
					$scope.chartProperties.id = String(data.id);
					$scope.chartProperties.objectId = data.objectId;
					$scope.chartProperties.html = data.currentHtml;
					$scope.chartProperties.objectHtml = data.objectHtml;
					$scope.chartProperties.posX = data.positionX;
					$scope.chartProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.chartProperties);
					break;
				case 'line-chart':
					$scope.chartProperties.id = String(data.id);
					$scope.chartProperties.objectId = data.objectId;
					$scope.chartProperties.html = data.currentHtml;
					$scope.chartProperties.objectHtml = data.objectHtml;
					$scope.chartProperties.posX = data.positionX;
					$scope.chartProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.chartProperties);
					break;
				case 'candle-chart':
					$scope.chartProperties.id = String(data.id);
					$scope.chartProperties.objectId = data.objectId;
					$scope.chartProperties.html = data.currentHtml;
					$scope.chartProperties.objectHtml = data.objectHtml;
					$scope.chartProperties.posX = data.positionX;
					$scope.chartProperties.posY = data.positionY;
					$scope.objectDetails.push($scope.chartProperties);
					break;

			}
		}
	});

	socket.on('moved_Object', function (data) {
		for (i = 0; len = $scope.objectDetails.length, i < len; i++) {
			if ($scope.objectDetails[i].id === data.currentId) {
				$scope.objectDetails[i].posX = data.positionX;
				$scope.objectDetails[i].posY = data.positionY;
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
						case 'hashmap(string, integer)':
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
			$scope.gridDetails.value = 'Show Grid';
		} else {
			$scope.dropTargetOne.style = {
				'background-color': 'transparent',
				'background-image': 'linear-gradient(0deg, transparent 24%, ' + $scope.gridDetails.color + ' 25%, ' + $scope.gridDetails.color + ' 26%, transparent 27%, transparent 74%, ' + $scope.gridDetails.color + ' 75%, ' + $scope.gridDetails.color + ' 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ' + $scope.gridDetails.color + ' 25%, ' + $scope.gridDetails.color + ' 26%, transparent 27%, transparent 74%, ' + $scope.gridDetails.color + ' 75%, ' + $scope.gridDetails.color + ' 76%, transparent 77%, transparent)',
				'background-size': '30px 30px'
			};
			$scope.gridDetails.value = 'Hide Grid';
		}
	};

	//Function that changes the grid color
	$scope.gridColorChange = function () {
		if ($scope.gridDetails.colorSelect === 'Grid Color: BLACK') {
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
						case 'listBox':
							var dataPointArray = [];
							dataPointArray = Object.keys($scope.allDP[i].data);
							for (j = 0; lenJ = dataPointArray.length, lenJ > j; j++) {
								if (!$scope.bottomPropPanel.minMaxShow) {
									if ($scope.allDP[i].data[dataPointArray[j]] === 'array(string)') {
										$scope.bottomPropPanel.dpList.push(dataPointArray[j]);
									}
								} else if ($scope.bottomPropPanel.minMaxShow) {
									if (
										$scope.allDP[i].data[dataPointArray[j]] === 'hashmap(string, boolean)') {
										$scope.bottomPropPanel.dpList.push(dataPointArray[j]);
									}
								}
							}
							break;
						case 'svg-square':
							var dataPointArray = [];
							dataPointArray = Object.keys($scope.allDP[i].data);
							for (j = 0; lenJ = dataPointArray.length, lenJ > j; j++) {
								if (($scope.allDP[i].data[dataPointArray[j]] === 'boolean')) {
									$scope.bottomPropPanel.dpList.push(dataPointArray[j]);
								}
							}
							break;
						case 'svg-circle':
							var dataPointArray = [];
							dataPointArray = Object.keys($scope.allDP[i].data);
							for (j = 0; lenJ = dataPointArray.length, lenJ > j; j++) {
								if (($scope.allDP[i].data[dataPointArray[j]] === 'boolean')) {
									$scope.bottomPropPanel.dpList.push(dataPointArray[j]);
								}
							}
							break;
						case 'svg-path':
							var dataPointArray = [];
							dataPointArray = Object.keys($scope.allDP[i].data);
							for (j = 0; lenJ = dataPointArray.length, lenJ > j; j++) {
								if (($scope.allDP[i].data[dataPointArray[j]] === 'boolean')) {
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
					$scope.objectDetails[i].name = $scope.bottomPropPanel.name;
					//convert 'ObjectHTML' String to HTML DOM Element
					var htmlElement = angular.element($scope.objectDetails[i].objectHtml);
					$scope.clean(htmlElement[0]);
					if ($scope.bottomPropPanel.name !== '') {
						dummyName = $scope.bottomPropPanel.name;
					}
					//Assign values for DOM elements					
					switch ($scope.objectDetails[i].objectId) {
						case 'label':
							$scope.objectDetails[i].font = $scope.bottomPropPanel.fontSelect;
							$scope.objectDetails[i].color = $scope.bottomPropPanel.colorSelect;
							$scope.objectDetails[i].fontSize = $scope.bottomPropPanel.fontSize + "px";
							//Label Assigns Name, color and Font family
							htmlElement[0].innerHTML = dummyName;
							htmlElement[0].style.fontFamily = $scope.bottomPropPanel.fontSelect;
							htmlElement[0].style.color = $scope.bottomPropPanel.colorSelect;
							htmlElement[0].style.fontSize = $scope.bottomPropPanel.fontSize + "px";
							break;
						case 'textBox':
							$scope.objectDetails[i].font = $scope.bottomPropPanel.fontSelect;
							$scope.objectDetails[i].color = $scope.bottomPropPanel.colorSelect;
							$scope.objectDetails[i].fontSize = $scope.bottomPropPanel.fontSize + "px";
							$scope.objectDetails[i].backgroundColor = $scope.bottomPropPanel.backColorSelect;
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
							$scope.objectDetails[i].url = $scope.bottomPropPanel.url;
							$scope.objectDetails[i].width = $scope.bottomPropPanel.width;
							$scope.objectDetails[i].height = $scope.bottomPropPanel.height;
							$scope.objectDetails[i].degree = $scope.bottomPropPanel.degree;
							//Assign image properties to DOM 
							htmlElement[0].src = $scope.bottomPropPanel.url;
							htmlElement[0].width = $scope.bottomPropPanel.width;
							htmlElement[0].height = $scope.bottomPropPanel.height;
							break;
						case 'listBox':
							$scope.clean(htmlElement[0]);
							$scope.objectDetails[i].font = $scope.bottomPropPanel.fontSelect;
							$scope.objectDetails[i].color = $scope.bottomPropPanel.colorSelect;
							$scope.objectDetails[i].fontSize = $scope.bottomPropPanel.fontSize + "px";
							$scope.objectDetails[i].backgroundColor = $scope.bottomPropPanel.backColorSelect;
							$scope.objectDetails[i].rows = $scope.bottomPropPanel.rowNos;
							$scope.objectDetails[i].fixRow = $scope.bottomPropPanel.unfixRowNos;
							//Identify if it is a 'map' or an 'array'
							//After identifying, modify the properties of the DOM element and assign properties to the 'objectDetails' variable 
							if ($scope.bottomPropPanel.minMaxValue === 'Map') {
								$scope.objectDetails[i].typeMap = false;
								htmlElement[0].style.backgroundColor = $scope.bottomPropPanel.backColorSelect;
								if ((!$scope.bottomPropPanel.unfixRowNos) && ($scope.bottomPropPanel.rowNos > htmlElement[0].childNodes.length)) {
									var childIncNos = ($scope.bottomPropPanel.rowNos - htmlElement[0].childNodes.length);
									for (child = 0; childLen = childIncNos, childLen > child; child++) {
										var node = document.createElement("LI");                 // Create a <li> node
										var textnode = document.createTextNode("Item" + htmlElement[0].childNodes.length);         // Create a text node
										node.appendChild(textnode);                              // Append the text to <li>
										htmlElement[0].appendChild(node);     // Append <li> to <ul> with id="myList"
									}
								} else if ((!$scope.bottomPropPanel.unfixRowNos) && ($scope.bottomPropPanel.rowNos < htmlElement[0].childNodes.length)) {
									var childIncNos = htmlElement[0].childNodes.length - $scope.bottomPropPanel.rowNos;
									for (child = 0; childLen = childIncNos, childLen > child; child++) {
										var node = htmlElement[0].lastChild;
										htmlElement[0].removeChild(node);
									}
								} else if ($scope.bottomPropPanel.unfixRowNos) {
									//Assign the selected configuration values to the object details
									$scope.objectDetails[i].parent = '';
									$scope.objectDetails[i].dataPoint = '';
									$scope.objectDetails[i].font = 'Verdana';
									$scope.objectDetails[i].color = 'black';
									$scope.objectDetails[i].backColor = 'white';
									$scope.objectDetails[i].fontSize = '14px';
									htmlElement = angular.element($scope.objectDetails[i].originalHtml);
								}
							} else if ($scope.bottomPropPanel.minMaxValue === 'Array') {
								$scope.objectDetails[i].typeMap = true;
								//Assign property values to the variable
								$scope.objectDetails[i].maxColor = $scope.bottomPropPanel.maxColorSelect;
								$scope.objectDetails[i].maxColorValue = $scope.bottomPropPanel.value;
								$scope.objectDetails[i].minColor = $scope.bottomPropPanel.minColorSelect;
								$scope.objectDetails[i].minColorValue = $scope.bottomPropPanel.maxPercent;
								$scope.objectDetails[i].nomColor = $scope.bottomPropPanel.nomColorSelect;
								$scope.objectDetails[i].nomColorValue = $scope.bottomPropPanel.minPercent;
								//Since there will be no appearence changes to be displayed as in case of 'Map' the original DOM element can besupplkied to the viewer. 
								htmlElement = angular.element($scope.objectDetails[i].originalHtml);
							}
							htmlElement[0].style.fontFamily = $scope.bottomPropPanel.fontSelect;
							htmlElement[0].style.color = $scope.bottomPropPanel.colorSelect;
							htmlElement[0].style.fontSize = $scope.bottomPropPanel.fontSize + "px";
							break;
						case 'svg-square':
							$scope.objectDetails[i].justPanel = $scope.bottomPropPanel.justPanel;
							$scope.objectDetails[i].color = $scope.bottomPropPanel.colorSelect;
							$scope.objectDetails[i].width = $scope.bottomPropPanel.width;
							$scope.objectDetails[i].height = $scope.bottomPropPanel.height;
							$scope.objectDetails[i].nomColorSelect = $scope.bottomPropPanel.nomColorSelect;
							$scope.objectDetails[i].dangrColorSelect = $scope.bottomPropPanel.dangrColorSelect;
							$scope.objectDetails[i].degree = $scope.bottomPropPanel.degree;
							//Initially set the values of the SVG Box
							htmlElement[0].width.baseVal.value = $scope.bottomPropPanel.width + 1;
							htmlElement[0].height.baseVal.value = $scope.bottomPropPanel.height + 1;
							//Then set the values of svg element
							var innerElement = "<rect width=" + $scope.bottomPropPanel.width + " height=" + $scope.bottomPropPanel.height + " fill=" + $scope.bottomPropPanel.colorSelect + " />";
							htmlElement[0].innerHTML = innerElement;
							break;
						case 'svg-circle':
							$scope.objectDetails[i].justPanel = $scope.bottomPropPanel.justPanel;
							$scope.objectDetails[i].color = $scope.bottomPropPanel.colorSelect;
							$scope.objectDetails[i].radius = $scope.bottomPropPanel.radius;
							$scope.objectDetails[i].nomColorSelect = $scope.bottomPropPanel.nomColorSelect;
							$scope.objectDetails[i].dangrColorSelect = $scope.bottomPropPanel.dangrColorSelect;
							$scope.objectDetails[i].degree = $scope.bottomPropPanel.degree;
							//Initially set the values of the SVG Box
							htmlElement[0].width.baseVal.value = $scope.bottomPropPanel.radius * 2;
							htmlElement[0].height.baseVal.value = $scope.bottomPropPanel.radius * 2;
							//Then set the values of svg element
							var innerElement = "<circle cx=" + $scope.bottomPropPanel.radius + " cy=" + $scope.bottomPropPanel.radius + " r=" + $scope.bottomPropPanel.radius + " fill=" + $scope.bottomPropPanel.colorSelect + " />";
							htmlElement[0].innerHTML = innerElement;
							break;
						case 'svg-path':
							$scope.objectDetails[i].justPanel = $scope.bottomPropPanel.justPanel;
							$scope.objectDetails[i].color = $scope.bottomPropPanel.colorSelect;
							$scope.objectDetails[i].zoom = $scope.bottomPropPanel.zoom;
							$scope.objectDetails[i].nomColorSelect = $scope.bottomPropPanel.nomColorSelect;
							$scope.objectDetails[i].dangrColorSelect = $scope.bottomPropPanel.dangrColorSelect;
							$scope.objectDetails[i].degree = $scope.bottomPropPanel.degree;
							//Initially set the values of the SVG Box
							//In here particularly it is got from the zoom % and then assigned
							var calcPixWidth = Math.round(htmlElement[0].width.baseVal.value * ($scope.bottomPropPanel.zoom / 100));
							var calcPixHeight = Math.round(htmlElement[0].height.baseVal.value * ($scope.bottomPropPanel.zoom / 100));
							htmlElement[0].width.baseVal.value = calcPixWidth;
							htmlElement[0].height.baseVal.value = calcPixHeight;
							htmlElement[0].style.zoom = $scope.bottomPropPanel.zoom + "%";
							//Set the color for the Svg element (if it is just panel, then color varies else it is black)
							var innerElement = angular.element(htmlElement[0].innerHTML);
							innerElement[0].style.fill = $scope.bottomPropPanel.colorSelect;
							htmlElement[0].innerHTML = innerElement[0].outerHTML;
							break;
						case 'bar-chart':
							break;
						case 'line-chart':
							break;
						case 'candle-chart':
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

	//Function populates the data points in the selection box according to the option (map|array) selected
	// this is only executred for the cases of 'List box'
	$scope.arrayMapDPGenerate = function (data) {
		//change the alue of the selection button to indicate what to be switched too
		if (data === 'Array') {
			$scope.bottomPropPanel.minMaxValue = 'Map';
		} else if (data === 'Map') {
			$scope.bottomPropPanel.minMaxValue = 'Array';

		}
	};

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	//Cleaning the unnecessary linebreaks in the Node
	$scope.clean = function (node) {
		for (var n = 0; n < node.childNodes.length; n++) {
			var child = node.childNodes[n];
			if ((child.nodeType === 8) || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
				node.removeChild(child);
				n--;
			}
			else if (child.nodeType === 1) {
				$scope.clean(child);
			}
		}
	}

});