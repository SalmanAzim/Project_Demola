var app = angular.module('myApp', []);
app.controller('MyController', function($scope) {
    $scope.imagepath='../JD/background-image3.jpg';

    $scope.setBackground = function(){
       // var file = $scope.myFile;
       //
       // console.log('file is ' );
       // console.dir(file);
       //
       // var uploadUrl = "../new";
       // fileUpload.uploadFileToUrl(file, uploadUrl);
       $scope.imagepath=$scope.newimagepath;

    };
});
