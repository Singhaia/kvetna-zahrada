// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('ionicApp', ['ionic']);



ionicApp.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/homepage.html',
			controller: 'HomepageCtrl'
		})
		.state('info', {
			url: '/informace',
			templateUrl: 'templates/infopage.html',
			//controller: 'InfopageCtrl'
		})
		.state('map', {
			url: '/mapa-zahrady',
			templateUrl: 'templates/mapa-zahrady.html',
			//controller: 'MapCtrl'
		});
	
	$urlRouterProvider.otherwise('/');
	
});



ionicApp.controller('HomepageCtrl', function($scope, $http) {
	$http.get('data/homepage.json').success(function(data) {
		$scope.homepage = data;
	}).error(function() {
		console.log('error fetching data from json');
	});
});



ionicApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
