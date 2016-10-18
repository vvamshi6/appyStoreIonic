/*
* FileName:app.js
* CreatedBy: Vamsee
* Date :16-09-2016
* Purpose : Main Routing application for ionic app
*/
/*Creating appystore module by using module function and adding required dependencies*/
angular.module('appyStore', ['ionic','appyStore.controllers','appyStore.services','angular-carousel-3d','ngTouch'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // ImgCache.$init();
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
/*config method for routing and differnet states in routing*/
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  // if (ionic.Platform.isAndroid())
  //      $ionicConfigProvider.scrolling.jsScrolling(false);
  //more options at once
  // ImageCacheProvider.setStorage(window.localStorage);
    // ImgCacheProvider.setOptions({
    //     debug: true,
    //     usePersistentCache: true
    // });
    // ImgCacheProvider.manualInit = true;

  $stateProvider
  /*Categories state for displaying the Category list*/
  .state('categories', {
    url: '/categories',
    templateUrl: 'templates/Categories.html',
    controller:'categoryCtrl'
  })
  /*Content state for displaying the Content list*/
  .state('content', {
    url: '/content/?pcatid?catid?count?caption',
    templateUrl: 'templates/Content.html',
    controller: 'contentCtrl'
  })
  /**/
  .state('player', {
                url: '/player?url?poster?pcatid?catid?count',
                templateUrl: 'templates/videoPlayer.html',
                controller: 'contentCtrl'
  })
  /**/
  .state('search',{
    url:'/search',
    templateUrl:'templates/searchScreen.html',
    controller:'searchCtrl'
  })
  .state('search.searchResult',{
    url:'/searchResult?keyword',
    templateUrl:'templates/searchResult.html'
    // controller:'searchCtrl'
  });
  /*Default url for the Routing*/
  $urlRouterProvider.otherwise('/categories');
});
