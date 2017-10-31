


var weightLogApp = angular.module('weightLogApp', ['ngRoute','ui.directives']);

weightLogApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl  : 'weightLossTracker.html',
    controller  : 'weightLossTrackerController'
  });

});

weightLogApp.controller('weightLossTrackerController', function($scope, $timeout){

    function initWeightLoss(){

      // $scope.totalList = [{
      //   date:'2015-01-25',
      //   max:50,
      //   min:49,
      //   variance:1
      // },{
      //   date:'2015-01-24',
      //   max:50,
      //   min:50,
      //   variance:0
      // }];

        $scope.totalList = [];
        $scope.uniqueID = 0;
      $scope.popupDescription = '';

    }

    //clearing all variables when add is clicked
    $scope.add = function(){
      $scope.showPopup = true;
      $scope.popupDescription = 'ADD';
      $scope.showAdd = true;
    //  $scope.datePicker = '';
      $scope.min = '';
      $scope.max = '';
      $scope.editIndex = '';

    };

    //validating required fields
    $scope.validation = function(){

      if(!$scope.datePicker){
        alert('please select date');
        return false;
      } else if(!$scope.min){
        alert('please enter min value');
        return false;
      }else if(!$scope.max){
        alert('please enter max value');
        return false;
      } else if($scope.min > $scope.max){
        alert('please enter min cannot be greater than max');
        return false;
      }

      return true;

    }

    //add and update the weight tracker list
    $scope.confirmAdd = function(isFromEdit){
      console.log($scope.datePicker);
      if($scope.validation() == true){
        var dateConversion = new Date($scope.datePicker);

          var month = parseInt(dateConversion.getMonth())+1;
        var DateTransform = dateConversion.getFullYear()+'/'+ month +'/'+dateConversion.getDate();

        //updating
        if((isFromEdit != null || isFromEdit!= undefined) && isFromEdit== 1){
          $scope.totalList[$scope.editIndex].date = DateTransform;
          $scope.totalList[$scope.editIndex].max = $scope.max;
          $scope.totalList[$scope.editIndex].min = $scope.min;
          $scope.totalList[$scope.editIndex].variance = $scope.max - $scope.min;
          $scope.totalList[$scope.editIndex].mainDate = dateConversion;

        } else{
          //adding
          $scope.uniqueID+=1;
          $scope.totalList.push({
            id:$scope.uniqueID,
            date:DateTransform,
            max:$scope.max,
            min:$scope.min,
            variance:$scope.max - $scope.min,
            mainDate : dateConversion
          });
        }

        $scope.showPopup=false;
      }

    };

    //populating the input fields in the modal while editing
    $scope.edit = function(id){
      $scope.popupDescription = 'EDIT';
        $scope.showPopup = true;
        $scope.showAdd = false;

        var editindx = $scope.totalList.map(function(x){return x.id;}).indexOf(id);
        var currentData = $scope.totalList[editindx];

        $scope.datePicker = currentData.mainDate;
        $scope.min = currentData.min;
        $scope.max = currentData.max;
        $scope.editIndex = editindx;
        //console.log(editindx,currentData);
    };

    //deleting the item from weight log list
    $scope.delete = function(id){

      var editindx = $scope.totalList.map(function(x){return x.id;}).indexOf(id);
      $scope.totalList.splice(editindx, 1);

    };

    //calculating the average of min, max and variance
    $scope.calculateAverage = function(name){
      var total = 0;
     for(var i = 0; i < $scope.totalList.length; i++){
         total += parseInt($scope.totalList[i][name]);
     }

     var avg = total/$scope.totalList.length;

     return avg;
    };

    //starts here
    initWeightLoss();
});


// http-server F:/workisfun/newTaskAngular
