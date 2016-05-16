var app = angular.module("myApp", ['fv-svg', 'fv-map', 'fv-label', 'angular-canvas-gauge']);

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
	
	$scope.phase1 = [];
	
	$scope.phase2 = [];
	
	socket.on('phase1', function (data) {
		$scope.phase1 = data;
		console.log($scope.phase1);
	});
	
	socket.on('phase2', function (data) {
		$scope.phase2 = data;
		console.log($scope.phase2);
	});
	
});