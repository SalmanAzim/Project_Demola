var myApp = angular.module('myApp', ["ng-fusioncharts"]);

function MainCtrl($scope) {
	$scope.count = 0;
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

$scope.myevents = {
    dataplotclick: function (ev, props) {
        $scope.$apply(function () {
            $scope.selectedValue = props.displayValue;
        });
    },
	chartClick: function (eventObj, argsObj) {
                console.log('Chart clicked at ' + argsObj.chartX + ',' + argsObj.chartY);
    }
	
}	



}

//Directive that returns an element which adds buttons on click which show an alert on click
myApp.directive("addbuttonsbutton", function(){
	return {
		restrict: "E",
		template: "<button draggable='true' addbuttons>Drag to add Real Time Graph</button>"
	}
});

//Directive for adding buttons on click that show an alert on click
myApp.directive("addbuttons", function($compile){
	return function(scope, element, attrs){
		
			//test_data = element[0];
		element[0].addEventListener('dragstart', function(e) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text', this.innerHTML);
			//test_data = this;
			elementDragged = this;
		});
	
//		element.bind("click", function(){			
		element.bind("dragend", function(){
			scope.count++;
			console.log(scope.myRealTimeData);
			//test_data = scope.myRealTimeData;
			var url = '//google.com';
		 //window.open(url, "_blank", "height=600,width=800,toolbar=no,location=no,menubar=no,titlebar=no");

			//angular.element(document.getElementById('space-for-buttons')).append($compile("<div><button class='btn btn-default' data-alert="+scope.count+">Show alert #"+scope.count+"</button></div>")(scope));
//angular.element(document.getElementById('space-for-buttons')).append($compile("<div id='firstChart' fusioncharts=''  width='600' height='400'  type='realtimeline'  dataSource='" + scope.myRealTimeData.toString() +"'> </div>")(scope));
//angular.element(document.getElementById('space-for-buttons')).append($compile('<div fusioncharts=""  width="600" height="400"  type="realtimeline"  dataSource=' + JSON.parse(JSON.stringify(scope.myRealTimeData)) + '  id="firstChart" > </div>')(scope));
//angular.element(document.getElementById('space-for-buttons')).append($compile("<div id='firstChart' fusioncharts=''  width='600' height='400'  type='realtimeline'  dataSource='" + JSON.stringify(scope.myRealTimeData.toString()) +"'> </div>")(scope));
//angular.element(document.getElementById('space-for-buttons')).append($compile("<div id='firstChart' fusioncharts=''  width='600' height='400'  type='realtimeline'  dataSource='" + JSON.stringify(scope.myRealTimeData) +"'> </div>")(scope));

angular.element(document.getElementById('drop-target-one')).append($compile("<div id='firstChart' fusioncharts=''  width='600' height='400'  type='realtimeline'  dataSource='" + JSON.stringify(scope.myRealTimeData) +"'> </div>")(scope));

		});
	};
});

//Directive for showing an alert on click
myApp.directive("alert", function(){
	return function(scope, element, attrs){
		element.bind("click", function(){
			console.log(attrs);
			alert("This is alert #"+attrs.alert);
		});
	};
});

