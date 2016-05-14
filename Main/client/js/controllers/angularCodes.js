var xsd;
var mychart;
var app = angular.module("myApp", ['ng-fusioncharts', 'test', 'app', 'ui.bootstrap']);

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

    $scope.imagepath = '../images/background-image3.jpg';

		$scope.i='Select Color';

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
		longShow: false
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
		width: '100%',
		height: '100%',
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
		width: '100%',
		height: '100%'
	};

	//Initialization Functions===========================================

	$scope.initializeObjectDisplay = function () {
		$scope.dpSelectPanel.booleanShow = false;
		$scope.dpSelectPanel.integerShow = false;
		$scope.dpSelectPanel.doubleShow = false;
		$scope.dpSelectPanel.stringShow = false;
		$scope.dpSelectPanel.longShow = false;
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
			width: '100%',
			height: '100%'
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
			width: '100%',
			height: '100%',
			url: '../images/leanware-logo.png'
		};
	};

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	//Define the `myDataSource` scope variable.
	$scope.myDataSource = {
		chart: {
			//Define the chart attributes.
			"caption": "Monthly revenue for last year",
			"subCaption": "Harry's SuperMart",
			"xAxisName": "Month",
			"yAxisName": "Revenues (In USD)",
			"theme": "fint"
		},
		data: [
			//Define the data labels and data values for the data plots.
			{
				"label": "Jan",
				"value": "420000"
			},
			{
				"label": "Feb",
				"value": "810000"
			},
			{
				"label": "Mar",
				"value": "720000"
			},
			{
				"label": "Apr",
				"value": "550000"
			},
			{
				"label": "May",
				"value": "910000"
			},
			{
				"label": "Jun",
				"value": "510000"
			},
			{
				"label": "Jul",
				"value": "680000"
			},
			{
				"label": "Aug",
				"value": "620000"
			},
			{
				"label": "Sep",
				"value": "610000"
			},
			{
				"label": "Oct",
				"value": "490000"
			},
			{
				"label": "Nov",
				"value": "900000"
			},
			{
				"label": "Dec",
				"value": "730000"
			}
		]
	};

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$scope.updateMyChartData = function () {
	}

	$scope.updateMyChartData_new = function () {

		var test = { label: "13" };
		$scope.categories[0]["category"].push(test);
		$scope.dataset[0].data.push({ "value": "10400" });
		$scope.dataset[1].data.push({ "value": "15400" });

		var test = { label: "14" };
		$scope.categories[0]["category"].push(test);
		$scope.dataset[0].data.push({ "value": "10400" });
		$scope.dataset[1].data.push({ "value": "15400" });

		var test = { label: "15" };
		$scope.categories[0]["category"].push(test);
		$scope.dataset[0].data.push({ "value": "10400" });
		$scope.dataset[1].data.push({ "value": "15400" });

	}

	$scope.updateMyChartData_real = function () {

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////FOR REAL TIME GRAPH
		$scope.myRealTimeData = {
			'chart': {
				'caption': 'Real',
				'subCaption': 'LABEL',
				'xAxisName': 'x-axis',
				'yAxisName': 'y-axis',
				'numberPrefix': '$',
				'refreshinterval': '5',
				'yaxisminvalue': '35',
				'yaxismaxvalue': '36',
				'numdisplaysets': '10',
				'labeldisplay': 'rotate',
				'showValues': '0',
				'showRealTimeValue': '0',
				'theme': 'fint'
			},
			'categories': [
				{
					'category': [
						{
							'label': 'Day Start'
						}
					]
				}
			],
			'dataset': [
				{
					'data': [
						{
							'value': '37.27'
						}
					]
				}
			]
		};


		//////////////////////////////////////////////////////////////////////////////////////////////////////////////FOR REAL TIME GAUGE
		$scope.dataSource_gauge = {
			"chart": {
				"caption": "Speedometer",
				"captionFont": "Arial",
				"captionFontColor": "#333333",
				"manageresize": "1",
				"origw": "320",
				"origh": "320",
				"tickvaluedistance": "-10",
				"bgcolor": "#FFFFFF",
				"upperlimit": "240",
				"lowerlimit": "0",
				"basefontcolor": "#FFFFFF",
				"majortmnumber": "9",
				"majortmcolor": "#FFFFFF",
				"majortmheight": "8",
				"majortmthickness": "5",
				"minortmnumber": "5",
				"minortmcolor": "#FFFFFF",
				"minortmheight": "3",
				"minortmthickness": "2",
				"pivotradius": "10",
				"pivotbgcolor": "#000000",
				"pivotbordercolor": "#FFFFFF",
				"pivotborderthickness": "2",
				"tooltipbordercolor": "#FFFFFF",
				"tooltipbgcolor": "#333333",
				"gaugeouterradius": "115",
				"gaugestartangle": "240",
				"gaugeendangle": "-60",
				"gaugealpha": "0",
				"decimals": "0",
				"showcolorrange": "0",
				"placevaluesinside": "1",
				"pivotfillmix": "",
				"showpivotborder": "1",
				"annrenderdelay": "0",
				"gaugeoriginx": "160",
				"gaugeoriginy": "160",
				"showborder": "0"
			},
			"dials": {
				"dial": [
					{
						"value": "0",
						"bgcolor": "000000",
						"bordercolor": "#FFFFFF",
						"borderalpha": "100",
						"basewidth": "4",
						"topwidth": "4",
						"borderthickness": "2",
						"valuey": "260"
					}
				]
			},
			"annotations": {
				"groups": [
					{
						"x": "160",
						"y": "160",
						"items": [
							{
								"type": "circle",
								"radius": "130",
								"fillasgradient": "1",
								"fillcolor": "#4B4B4B,#AAAAAA",
								"fillalpha": "100,100",
								"fillratio": "95,5"
							},
							{
								"type": "circle",
								"x": "0",
								"y": "0",
								"radius": "120",
								"showborder": "1",
								"bordercolor": "cccccc",
								"fillasgradient": "1",
								"fillcolor": "#ffffff,#000000",
								"fillalpha": "50,100",
								"fillratio": "1,99"
							}
						]
					},
					{
						"x": "160",
						"y": "160",
						"showbelow": "0",
						"scaletext": "1",
						"items": [
							{
								"type": "text",
								"y": "100",
								"label": "KPH",
								"fontcolor": "#FFFFFF",
								"fontsize": "14",
								"bold": "1"
							}
						]
					}
				]
			}
		};

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////FOR REAL TIME CYLINDER
		$scope.dataSource_cylinder = {
			"chart": {
				"theme": "fint",
				"caption": "Diesel Level in Generator",
				"subcaption": "Bakersfield Central",
				"lowerLimit": "0",
				"upperLimit": "220",
				"lowerLimitDisplay": "Empty",
				"upperLimitDisplay": "Full",
				"numberSuffix": " ltrs",
				"showValue": "1",
				"chartBottomMargin": "25"
			},
			"value": "110",
			"annotations": {
				"origw": "400",
				"origh": "190",
				"autoscale": "1",
				"groups": [
					{
						"id": "range",
						"items": [
							{
								"id": "rangeBg",
								"type": "rectangle",
								"x": "$canvasCenterX-45",
								"y": "$chartEndY-30",
								"tox": "$canvasCenterX +45",
								"toy": "$chartEndY-75",
								"fillcolor": "#6caa03"
							},
							{
								"id": "rangeText",
								"type": "Text",
								"fontSize": "11",
								"fillcolor": "#333333",
								//"text": "80 ltrs",
								"x": "$chartCenterX-45",
								"y": "$chartEndY-50"
							}
						]
					}
				]
			}
		};

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////FOR REAL TIME CYLINDER

		$scope.myevents = {
			dataplotclick: function (ev, props) {
				$scope.$apply(function () {
					$scope.selectedValue = props.displayValue;
				});
			},
			chartClick: function (eventObj, argsObj) {
				console.log('Chart clicked at ' + argsObj.chartX + ',' + argsObj.chartY);
			}


		};

	}

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
			$scope.gridDetails.value = 'Show Grid ';
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
							htmlElement[0].url = $scope.bottomPropPanel.url;
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
