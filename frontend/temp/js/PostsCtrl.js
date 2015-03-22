angular.module("myApp")
	.controller('PostsCtrl', function($scope, $http){
		$http.get("/api/post/myPosts").success(function(res){
			$scope.posts = res;
		});
	});