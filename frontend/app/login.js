angular.module("myApp")
	.controller('loginCtrl', function($scope, $http, $auth){
		$scope.login = function(){
			console.log("here");
			$auth.authenticate("twitter");
		};

		$scope.isAuthenticated = $auth.isAuthenticated;
	});