// WORK IN PROGRESS

var app = angular.module('clock',[]);
app.controller('Clock', function($scope,$interval, $filter, $locale) {
  
  $interval(function(){
    _update();
  },1000);
  
  $scope.decadeStart = function(){
    return Math.floor($scope.year/10)*10;
  };
  $scope.decadeEnd = function(){
    return Math.ceil($scope.year/10)*10;
  };
  
  $scope.monthEnd = function(){
    var d = new Date($scope.year, $scope.month, 0);
    return d.getDate();
  };
  
  var f = $filter('date');
  
  var _update = function(){
    var d = new Date();
    $scope.year = f(d, 'yyyy');
    
    $scope.month = f(d, 'MM');
    $scope.monthFormat = f(d, 'MMMM');
    
    $scope.day = f(d, 'dd');
    $scope.hour = f(d, 'HH');
    $scope.minute = f(d, 'mm');
    $scope.second = f(d, 'ss');
  };
  _update();
});
app.directive('prog', function(){
  return {
    scope:{
      min:'=',
      max:'=',
      value:'='
    },
    template:'<div class="prog" ng-attr-style="transform:rotate({{degree}}deg);"></div>',
    restrict:'E',
    replace:true,
    link:function(){},
    controller:function($scope, $interval){
      var _getPercent = function(min,max,value){
        return ((value-min)/(max-min))*100;
      };
      $interval(function(){
        $scope.percent = _getPercent($scope.min, $scope.max, $scope.value);
        $scope.degree = $scope.percent * (3.6/2);
      }, 1000);
    }
  };
});
