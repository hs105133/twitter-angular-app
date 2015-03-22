angular.module("myApp")
	.controller('PostCtrl', function($scope, $http, $auth, $stateParams, $state, toastr){
		var postId = $stateParams.postId;

		if(postId) {
			$scope.isEditing = true;
			getPost();
			$scope.save = editPost;
		} else{
			$scope.save = newPost;
			$scope.isEditing = false;
		}

		function getPost(){
			$http.get("/api/post/"+postId).success(function(res){
				$scope.message = res.message;
				$scope.date = new Date(res.datetime);
				$scope.time = new Date(res.datetime);
			});			
		}

		function newPost(){
			var datetime = new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(), $scope.time.getHours(), $scope.time.getMinutes());
			var data = {message: $scope.message, datetime: datetime};
			$http.post("/api/post/tweet", data).success(function(res){
				toastr.success("New post created");
			});			
		}

		function editPost(){ 
			var datetime = new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(), $scope.time.getHours(), $scope.time.getMinutes());
			var data = {message: $scope.message, datetime: datetime};
			$http.post("/api/post/update/"+postId, data).success(function(res){
				toastr.success("Post updated");
			});			
		}

		$scope.deletePost = function(){
			$http.delete("/api/post/destroy/"+postId).success(function(res){
				toastr.info("Post deleted");
				$state.go("posts");
			});			
		}

		$scope.opened = false;
		$scope.minDate = new Date();
		$scope.open = function($event){
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = !$scope.opened;
		};

		$scope.time = new Date();

	})
	.directive('datepickerPopup', function (){
	  return {
	    restrict: 'EAC',
	    require: 'ngModel',
	    link: function(scope, element, attr, controller) {
	      //remove the default formatter from the input directive to prevent conflict
	      controller.$formatters.shift();
	    }
	  }
	});