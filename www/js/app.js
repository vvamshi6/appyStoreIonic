/*
 * FileName:app.js
 * CreatedBy: Vamsee
 * Date :16-09-2016
 * Purpose : Main Routing application for ionic app
 */
var appyStoreDb = null;
/*Creating appystore module by using module function and adding required dependencies*/
angular.module('appyStore', ['ionic', 'appyStore.controllers', 'appyStore.services', 'angular-carousel-3d', 'ngTouch','ngCordova'])
  .run(function($ionicPlatform,$cordovaSQLite) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  /*config method for routing and differnet states in routing*/
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $stateProvider
    /*Categories state for displaying the Category list*/
    // .state('categories', {
    //   url: '/categories',
    //   templateUrl: 'templates/Categories.html',
    //   controller:'categoryCtrl'
    // })
    /*Categories state for displaying categories*/
      .state('categories', {
        abstract: true,
        url: '/categories',
        templateUrl: 'templates/main.html'
      })
      /*Child states in category states*/
      /*State to display videos in the category state*/
      .state('categories.videos', {
        url: '/videos',
        templateUrl: 'templates/Categories.html',
        controller: 'categoryCtrl'
      })
      /*State to display audio in the categories*/
      .state('categories.audio', {
        url: '/audio',
        templateUrl: 'templates/audio.html',
        controller:function($scope){
          $scope.message = "UnderConstruction"
        }
      })
      /*child state to display history*/
      .state('categories.history', {
        url: '/history',
        templateUrl: 'templates/history.html',
        controller:function($scope){
          $scope.message = "UnderConstruction"
        }
      })
      /*Content state for displaying the Content list*/
      .state('content', {
        url: '/content/?pcatid?catid?count?caption',
        templateUrl: 'templates/Content.html',
        controller: 'contentCtrl'
      })
      /*player state for displaying video player with hidden params*/
      .state('player', {
        url: '/player',
        params:{
          url:null,
          poster:null,
          pcatid:null,
          catid:null,
          count:null
        },
        templateUrl: 'templates/videoPlayer.html',
        controller: 'contentCtrl'
      })
      // .state('player.video',{
      //   url:'/.video?url?poster',
      //   templateUrl:'templates/video.html'
      // })
      /*search state for searching elements*/
      .state('search', {
        url: '/search',
        templateUrl: 'templates/searchScreen.html',
        controller: 'searchCtrl'
      })
      /*child state for search for displaying the search result*/
      .state('search.searchResult', {
        url: '/.searchResult?keyword',
        templateUrl: 'templates/searchResult.html'
          // controller:'searchCtrl'
      });
    /*Default url for the Routing*/
    $urlRouterProvider.otherwise('/categories/videos');
  });
