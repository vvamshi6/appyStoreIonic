angular.module('appyStore.controllers',[])
.controller('categoryCtrl',function($scope,CategoryService){
  console.log('categoryCtrl');
  var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getCategoryList&content_type=videos&limit_start=0&age=1.5&incl_age=5';
  CategoryService.getData(url).then(function(data){
		$scope.result = data.data.Responsedetails.category_id_array;
    console.log($scope.result);
    $scope.slides = [];
    $scope.options = {
           sourceProp: 'src',
           visible: 7,
           perspective: 35,
           startSlide: 0,
           border: 0,
           dir: 'rtl',
           width: 290,
           height: 200,
           space: 220,
           clicking:true,
           scrolling:true,
           autoRotationSpeed: 10000,
           loop: true
       }
       angular.forEach($scope.result,function(i){
                     $scope.slides.push({'src': i.image_path['50x50'],
                     'caption':i.category_name,'catid':i.category_id,'pcatid':i.parent_category_id});
                   })
                   console.log($scope.slides);
  	});
})
.controller('contentCtrl',function($scope,$http,ContentService,$stateParams){
  $scope.catid = $stateParams.catid;
  $scope.pcatid = $stateParams.pcatid;
console.log(offset);
  var catid = $scope.catid;
  var pcatid = $scope.pcatid;
  console.log('contentCtrl');
  var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=4&offset=0&catid='+catid+'&pcatid='+pcatid+'&age=1.5&incl_age=5';
  console.log(url);
  var offset = 0;
  ContentService.getData(url).then(function(data){
    $scope.data = data.data.Responsedetails.data_array;
    console.log($scope.data);
    console.log(data.data.Responsedetails.data_array);
  });
  $scope.loadMore = function() {
     offset = offset+4;
     var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=4&offset='+offset+'&catid='+catid+'&pcatid='+pcatid+'&age=1.5&incl_age=5';
    console.log(url);
    ContentService.getData(url).then(function(data){
      $scope.data = $scope.data.concat(data.data.Responsedetails.data_array);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      console.log($scope.data);
    });
 };
})
