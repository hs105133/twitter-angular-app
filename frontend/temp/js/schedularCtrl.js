angular.module("myApp")
	.controller('SchedularCtrl', function($scope, $http, $auth){
		$scope.tweet = function(){
			var datetime = new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(), $scope.time.getHours(), $scope.time.getMinutes());
			var data = {message: $scope.message, datetime: datetime};
			$http.post("/api/post/tweet", data).success(function(res){
				console.log(res);
			});
		};

		$scope.opened = false;
		$scope.minDate = new Date();
		$scope.open = function($event){
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = !$scope.opened;
		};

		$scope.time = new Date();
	});