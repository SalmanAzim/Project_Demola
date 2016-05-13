// var app = angular.module('myApp', []);
// app.controller('MyController', function($scope) {
//     $scope.imagepath='../new/background-image3.jpg';
//
//     $scope.setBackground = function(){
//        // var file = $scope.myFile;
//        //
//        // console.log('file is ' );
//        // console.dir(file);
//        //
//        // var uploadUrl = "../new";
//        // fileUpload.uploadFileToUrl(file, uploadUrl);
//        $scope.imagepath=$scope.newimagepath;
//
//     };
// });
$(document).ready(function(){

   // jQuery methods go here...

   $( "#LeftPanAdjustButton" ).click(function() {
  $( "#LeftPan" ).animate({

    left: "-15%",
  }, 500);

  $( "#main_ui" ).animate({

    left: "0%",
  }, 500);

  $('#LeftPanAdjustButton2').removeClass('not');

});

$( "#LeftPanAdjustButton2" ).click(function() {
$( "#LeftPan" ).animate({

 left: "0%",
}, 500);

$( "#main_ui" ).animate({

 left: "15%",
}, 500);

$('#LeftPanAdjustButton2').addClass('not');

});



});

function fullscreen() {

    $('#LeftPan').addClass('lefthide');

    $('#main_ui').addClass('mainhide');




}

function exitFullscreen() {
      $('#LeftPan').removeClass('lefthide');
      $('#main_ui').removeClass('mainshow');
}
