angular.module("myApp", ["satellizer", "ui.bootstrap", "ui.router", "ngAnimate", "toastr"])
	.config(function($authProvider, $stateProvider, $urlRouterProvider, toastrConfig) {
		$authProvider.twitter({
		  url: '/api/users/login',
		  type: '1.0',
		  popupOptions: { width: 495, height: 400 }
		});

		$stateProvider.state("posts", {
			url: "/",
			templateUrl: "views/posts.html",
			controller: "PostsCtrl"
		})
		.state("post", {
			url: "/post/:postId?",
			templateUrl: "views/post.html",
			controller: "PostCtrl"
		});

		$urlRouterProvider.otherwise("/");

		toastrConfig.positionClass = 'toast-bottom-right';
  });