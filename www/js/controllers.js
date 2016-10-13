/*
* FileName:controllers.js
* CreatedBy: Vamsee
* Date :01-10-2016
* Purpose : Creating appyStore app using ionic framework
*/
/*Including the controllers to the appyStore module*/
angular.module('appyStore.controllers',[])
/*Creating the categoryCtrl for showing the categorylist*/
.controller('categoryCtrl',function($scope,CategoryService,ImgCache){
  console.log('categoryCtrl');
  /*Url which contains the category list*/
  var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getCategoryList&content_type=videos&limit_start=0&age=1.5&incl_age=5';
  /*Calling the Rest api using CategoryService*/
  CategoryService.getData(url).then(function(data){
    /*Response from CategoryService*/
		$scope.result = data.data.Responsedetails.category_id_array;
    console.log($scope.result);
    $scope.slides = [];
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
           clicking:true,
           scrolling:true,
          //  autoRotationSpeed: none,
           loop: true
       }
       /*Iterating through the result and adding the imageurls to the slides array*/
       angular.forEach($scope.result,function(i){
                     $scope.slides.push({'src': i.image_path['50x50'],
                     'caption':i.category_name,'catid':i.category_id,'pcatid':i.parent_category_id,'count':i.content_count});
                   })
                   console.log($scope.slides);
  	});
})
/*Creating the contentCtrl for showing the contentlist*/
.controller('contentCtrl',function($scope,$http,ContentService,$stateParams,$ionicPopover,$sce,$location, $ionicHistory){
  /*Taking categoryid and parent_category_id via stateParams to the scope object*/
  $scope.noMoreItemsAvailable = false;
  $scope.catid = $stateParams.catid;
  $scope.pcatid = $stateParams.pcatid;
  $scope.count = $stateParams.count;
  var catid = $scope.catid;
  var pcatid = $scope.pcatid;
  var count = $scope.count;
  if($stateParams.poster){
    console.log($stateParams.poster);
    $scope.poster = $stateParams.poster;
  }
  if($stateParams.url){
    var url = $stateParams.url;
    url = $sce.trustAsResourceUrl(url);
    $scope.url = url;
    console.log(url);
  }
  console.log('contentCtrl');
  /*Url which contains the content list*/
  var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=4&offset=0&catid='+catid+'&pcatid='+pcatid+'&age=1.5&incl_age=5';
  console.log(url);
  var offset = 0;
  /*Calling the Rest api using ContentService*/
  ContentService.getData(url).then(function(data){
    /*Response from ContentService*/
    $scope.data = data.data.Responsedetails.data_array;
    console.log($scope.data);
    console.log(data.data.Responsedetails.data_array);
  });
  /*Load more function for loading more items*/
  $scope.loadMore = function() {

     offset = offset+4;
     var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=4&offset='+offset+'&catid='+catid+'&pcatid='+pcatid+'&age=1.5&incl_age=5';
    console.log(url);
    /*Content service for calling the RestApi*/
    ContentService.getData(url).then(function(data){
      if ( $scope.data.length == count ) {
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
 /*popover for ionicapp*/
 $ionicPopover.fromTemplateUrl('templates/popover.html', {
  scope: $scope,
}).then(function(popover) {
  $scope.popover = popover;
});
/*ionicHistory goback function to navigate to previous page*/
$scope.myGoBack = function() {
      $ionicHistory.goBack();
};
/*function to change the url of the video*/
$scope.changeUrl = function(url,poster){
  console.log(url);
  /*making the url as trustAsResourceUrl*/
  url = $sce.trustAsResourceUrl(url);
  $scope.url = url;
  var video = document.getElementById("myVideo")
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
  if(video){
    console.log("Id is found");
  }
}
})
