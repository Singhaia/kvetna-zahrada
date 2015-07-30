// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('ionicApp', ['ionic']);


ionicApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	
	$ionicConfigProvider.views.transition('none');
	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/homepage.html',
			controller: 'HomepageCtrl'
		})
		.state('map', {
			url: '/mapa-zahrady',
			templateUrl: 'templates/garden-map.html',
			controller: 'MapCtrl'
		})
		.state('pamatky-list', {
			url: '/pamatky',
			templateUrl: 'templates/sights-list.html',
			controller: 'SightsCtrl'
		})
		.state('pamatky-detail', {
			url: '/pamatky/:sightid',
			templateUrl: 'templates/sight-detail.html',
			controller: 'SightCtrl'
		})
		.state('info', {
			url: '/informace',
			templateUrl: 'templates/information.html',
			controller: 'InfoCtrl'
		});
	
	$urlRouterProvider.otherwise('/');
	
});



ionicApp.factory('sightsFactory', function($http) {
	function getSights(callback){
		$http({
			method: 'GET',
			url: 'data/sights.json',
			cache: true
		}).success(callback);
	}
	
	return {
		list: getSights,
		find: function(id, callback) {
			getSights(function(data) {
				var sight = data.filter(function(entry) { 
					//console.log(entry.id);
					//console.log(id);
					return entry.id == id;
				})[0];
				
				callback(sight);
			});
		},
		findPrev: function(id, callback) {
			getSights(function(data) {
				//console.log(data);
				var prevSight = data.filter(function(entry) {
					var previd = parseInt(id, 10) - 1;
					return entry.id == previd;
					//console.log(entry);
				})[0];
				
				callback(prevSight);
			});
		},
		findNext: function(id, callback) {
			getSights(function(data) {
				//console.log(data);
				var nextSight = data.filter(function(entry) {
					var nextid = parseInt(id, 10) + 1;
					return entry.id == nextid;
					//console.log(entry);
				})[0];
				
				callback(nextSight);
			});
		}
	};
});



ionicApp.controller('HomepageCtrl', function($scope, $http) {
	$http.get('data/homepage.json').success(function(data) {
		$scope.homepage = data[0];
	}).error(function() {
		console.log('error fetching data from json');
	});
});


ionicApp.controller('MapCtrl', function($scope, sightsFactory) {
	sightsFactory.list(function(sights) {
		$scope.sights = sights;
	});
});


ionicApp.controller('SightsCtrl', function($scope, sightsFactory) {
	sightsFactory.list(function(sights) {
		$scope.sights = sights;
	});
});


ionicApp.controller('SightCtrl', function($scope, $stateParams, sightsFactory) {
	sightsFactory.find($stateParams.sightid, function(sight) {
		console.log($stateParams.sightid);
		$scope.sight = sight;
		$scope.sight.sectionImage = sight.images[0];
		console.log($scope.sight);
	});
	
	sightsFactory.findPrev($stateParams.sightid, function(sightPrev) {
		$scope.prevSight = sightPrev;
		console.log($scope.prevSight);
	});
	
	sightsFactory.findNext($stateParams.sightid, function(sightNext) {
		$scope.nextSight = sightNext;
		console.log($scope.nextSight);
	});
});


ionicApp.controller('InfoCtrl', function($scope, $http) {
	$http.get('data/information.json').success(function(data) {
		$scope.groups = data;
	});
	
	$scope.toggleGroup = function(group) {
		if($scope.isGroupShown(group)) {
			$scope.showGroup = null;
		} else {
			$scope.showGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.showGroup === group;
	};
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
