/*
 * FileName:controllers.js
 * CreatedBy: Vamsee
 * Date :01-10-2016
 * Purpose : Creating appyStore app using ionic framework
 */
/*Including the controllers to the appyStore module*/
angular.module('appyStore.controllers', [])
  /*Creating the categoryCtrl for showing the categorylist*/
  .controller('categoryCtrl', function($scope, CategoryService, appyCache, $sce) {
    console.log('categoryCtrl');
    /*Calling the cache from appyCache Service*/
    var cache = appyCache.get("Categorydata");
    console.log(cache);
    /*Url which contains the category list*/
    var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getCategoryList&content_type=videos&limit_start=0&age=1.5&incl_age=5';
    /*Different options for the carousel*/
    $scope.options = {
        sourceProp: 'src',
        visible: 7,
        perspective: 35,
        startSlide: 0,
        border: 0,
        dir: 'ltr',
        width: 290,
        height: 200,
        space: 220,
        clicking: true,
        scrolling: true,
        //  autoRotationSpeed: none,
        loop: true
      }
      /*if cache present then we will asign cache to the $scope.slides object*/
    if (cache) {
      console.log("cached");
      $scope.slides = cache;
    }
    /*If cache is not present we will call RestApi*/
    else {
      /*Calling the Rest api using CategoryService*/
      CategoryService.getData(url).then(function(data) {
        /*Response from CategoryService*/
        $scope.result = data.data.Responsedetails.category_id_array;
        console.log($scope.result);
        $scope.slides = [];
        /*Iterating through the result and adding the imageurls to the slides array*/
        angular.forEach($scope.result, function(i) {
          $scope.slides.push({
            'src': $sce.trustAsResourceUrl(i.image_path['50x50']),
            'caption': i.category_name,
            'catid': i.category_id,
            'pcatid': i.parent_category_id,
            'count': i.content_count
          });
        })
        console.log($scope.slides);
      });
    }
    /*$scope.watch function which watches the slides array object*/
    $scope.$watch("slides", function(newSlides, oldSlides) {
      // console.log("slidesChanged");
      console.log(newSlides);
      /*putting changed slide data to the appyCache service*/
      appyCache.put("Categorydata", newSlides);
      /*assignig cache to the slides object*/
      $scope.slides = appyCache.get("Categorydata");
    });
  })
  /*Creating the contentCtrl for showing the contentlist*/
  .controller('contentCtrl', function($scope, $window, $http, ContentService, appyCache, $location, $stateParams, $ionicPopover, $sce, $location, $ionicHistory) {
    $scope.data = [];
    /*flag to stop scrolling when objects are completed*/
    $scope.noMoreItemsAvailable = false;
    /*Taking categoryid and parent_category_id via stateParams to the scope object*/
    $scope.catid = $stateParams.catid;
    $scope.pcatid = $stateParams.pcatid;
    $scope.count = $stateParams.count;
    $scope.caption = $stateParams.caption;
    var catid = $scope.catid;
    var pcatid = $scope.pcatid;
    var count = $scope.count;
    if ($stateParams.caption) {
      $scope.caption = $stateParams.caption;
      var caption = $stateParams.caption;
    }
    if ($stateParams.poster) {
      console.log($stateParams.poster);
      $scope.poster = $stateParams.poster;
    }
    if ($stateParams.url) {
      var url = $stateParams.url;
      url = $sce.trustAsResourceUrl(url);
      $scope.url = url;
      console.log(url);
    }
    console.log('contentCtrl');
    /*if caption is there creating the cache memory*/
    if ($scope.caption)
      var cache = appyCache.get($scope.caption);
    /*if cache present assing it to the data array*/
    if (cache) {
      console.log(cache);
      $scope.data = cache;
    } else {
      /*Url which contains the content list*/
      var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=4&offset=0&catid=' + catid + '&pcatid=' + pcatid + '&age=1.5&incl_age=5';
      console.log(url);
      var offset = 0;
      /*Calling the Rest api using ContentService*/
      ContentService.getData(url).then(function(data) {
        /*Response from ContentService*/
        // $scope.data.image_path = $sce.trustAsResourceUrl($scope.data.image_path);
        $scope.data = data.data.Responsedetails.data_array;
        console.log($scope.data);
        console.log(data.data.Responsedetails.data_array);
      });
      /*Load more function for loading more items*/
    }
    /*loadMore function to increase offset and call the RestApi*/
    $scope.loadMore = function() {
      offset = offset + 4;
      var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=4&offset=' + offset + '&catid=' + catid + '&pcatid=' + pcatid + '&age=1.5&incl_age=5';
      console.log(url);
      /*Content service for calling the RestApi*/
      ContentService.getData(url).then(function(data) {
        /*Making the flag true when lenght becomes equal to the category count*/
        if ($scope.data.length == count) {
          console.log(count);
          $scope.noMoreItemsAvailable = true;
        }
        // if($scope.data.length > 1){
        $scope.data = $scope.data.concat(data.data.Responsedetails.data_array);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // $scope.$broadcast('scroll.infiniteScrollComplete');
        console.log($scope.data);
        // }
      });
    };
    /*watch function to watch the data array*/
    $scope.$watch("data", function(newData, OldData) {
        appyCache.put($scope.caption, newData);
        console.log(appyCache.get($scope.caption));
        //  console.log(newData);
      })
      /*popover for ionicapp*/
    $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });
    /*ionicHistory goback function to navigate to previous page*/
    $scope.myGoBack = function() {
      console.log('function');
      $window.history.go(-1);
      // $backView = $ionicHistory.backView();
      //  $backView.go();
      // $ionicHistory.goBack();
    };
    /*function to change the url of the video*/
    $scope.changeUrl = function(url, poster) {
      console.log(url);
      /*making the url as trustAsResourceUrl*/
      url = $sce.trustAsResourceUrl(url);
      $scope.url = url;
      var video = document.getElementById("myVideo");
      console.log(poster);
      /*checking the type of video and adding url and poster*/
      isSupp = video.canPlayType("video/mp4");
      if (isSupp == "") {
        video.src = url;
      } else {
        video.src = url;
        video.poster = poster;
      }
      /*loading the video after changing the url*/
      video.load();
      if (video) {
        console.log("Id is found");
      }
    }
  })
  .controller('searchCtrl', function($scope, $window, $stateParams, $ionicHistory, $location, SearchService, $state) {
    var offset = 0;
    $scope.changeKeyWord = function(keyword) {
      if (!keyword)
        alert('Please	enter	a	search	text');
      $scope.textbox = keyword;
      var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=search&keyword=' + keyword + '&content_type=appsgames&limit=5&offset=0&age=1&incl_age=6';
      console.log(url);
      SearchService.getData(url).then(function(data) {
        $scope.count = data.data.Responsedetails[0].total_count;
        $scope.data = data.data.Responsedetails[0].data_array;
        console.log($scope.data);
      });
      if ($scope.textbox) {
        $state.go('.searchResult');
      }
    }
    $scope.loadMore = function(textbox) {
      offset = offset + 5;
      var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=search&keyword=' + textbox + '&content_type=appsgames&limit=5&offset=' + offset + '&age=1&incl_age=6';
      console.log(url);
      /*Content service for calling the RestApi*/
      SearchService.getData(url).then(function(data) {
        /*Making the flag true when lenght becomes equal to the category count*/
        if ($scope.data.length == $scope.count) {
          console.log($scope.count);
          $scope.noMoreItemsAvailable = true;
        }
        // if($scope.data.length > 1){
        $scope.data = $scope.data.concat(data.data.Responsedetails[0].data_array);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // $scope.$broadcast('scroll.infiniteScrollComplete');
        console.log($scope.data);
        // }
      });
    };
    $scope.myGoBack = function() {
      console.log('funciton');
      $window.history.go(-1);
      // $backView = $ionicHistory.backView();
      //  $backView.go();
      // $ionicHistory.backView();
    }
  })
