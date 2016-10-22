/*
 * FileName:services.js
 * CreatedBy: Vamsee
 * Date :01-10-2016
 * Purpose : Creating appyStore app using ionic framework
 */
/*Including the services to the appyStore module*/
angular.module('appyStore.services', [])
  /*Creating the CategoryService for calling the RestApi and returning the promise*/
  .factory('CategoryService', function($http) {
    var data = [];
    // var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getCategoryList&content_type=videos&limit_start=0&age=1.5&incl_age=5';
    return {
      /**
       * This function data using url
       *
       * @param {String} --url-url for fetch data
       * @return {Object} --data
       */
      getData: function(url) {
        return $http.get(url, {
          headers: {
            'Access-Control-Allow-Origin': 'true',
            'Access-Control-Allow-Methods': 'PUT, GET, POST',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'X_APPY_USERID': '290903782',
            'X_APPY_API_KEY': 'gh610rt23eqwpll',
            'X_APPY_USERID': '290903782',
            'X_APPY_IMEI': '353368070301951',
            'X_APPY_PCP_ID': '999',
            'X_APPY_CAMPAIGN_ID': '8700441600',
            'X_APPY_APP_TYPE': 'lite',
            'X_APPY_TTR': '10800000',
            'X_APPY_UTYPE': 'O',
            'X_APPY_MSISDN': '0',
            'X_APPY_IS_NEW_USER': 'N',
            'X_APPY_UserAgent': 'Mozilla/5.0 (Linux; Android 5.0.2; Panasonic ELUGA Switch Build/LRX22G; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/51.0.2704.81 Mobile Safari/537.36'
          }
        }).then(function(response) {
          /*Taking the promise object*/
          data = response;
          return data;
        });
      }
    }
  })
  /*Creating the ContentService for calling the RestApi and returning the promise*/
  .factory('ContentService', function($http) {
    var data = [];
    return {
      /**
       * This function data using url
       *
       * @param {String} --url-url for fetch data
       * @return {Object} --data
       */
      getData: function(url) {
        return $http.get(url, {
          headers: {
            'Access-Control-Allow-Origin': 'true',
            'Access-Control-Allow-Methods': 'PUT, GET, POST',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'X_APPY_USERID': '290903782',
            'X_APPY_API_KEY': 'gh610rt23eqwpll',
            'X_APPY_USERID': '290903782',
            'X_APPY_IMEI': '353368070301951',
            'X_APPY_PCP_ID': '999',
            'X_APPY_CAMPAIGN_ID': '8700441600',
            'X_APPY_APP_TYPE': 'lite',
            'X_APPY_TTR': '10800000',
            'X_APPY_UTYPE': 'O',
            'X_APPY_MSISDN': '0',
            'X_APPY_IS_NEW_USER': 'N',
            'X_APPY_UserAgent': 'Mozilla/5.0 (Linux; Android 5.0.2; Panasonic ELUGA Switch Build/LRX22G; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/51.0.2704.81 Mobile Safari/537.36'
          }
        }).then(function(response) {
          /*Taking the promise object*/
          data = response;
          return data;
        });
      }
    }
  })
  .factory('SearchService', function($http) {
    var data = [];
    return {
      getData: function(url) {
        return $http.get(url, {
          headers: {
            'Access-Control-Allow-Origin': 'true',
            'Access-Control-Allow-Methods': 'PUT, GET, POST',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'X_APPY_USERID': '290903782',
            'X_APPY_API_KEY': 'gh610rt23eqwpll',
            'X_APPY_USERID': '290903782',
            'X_APPY_IMEI': '353368070301951',
            'X_APPY_PCP_ID': '999',
            'X_APPY_CAMPAIGN_ID': '8700441600',
            'X_APPY_APP_TYPE': 'lite',
            'X_APPY_TTR': '10800000',
            'X_APPY_UTYPE': 'O',
            'X_APPY_MSISDN': '0',
            'X_APPY_IS_NEW_USER': 'N',
            'X_APPY_UserAgent': 'Mozilla/5.0 (Linux; Android 5.0.2; Panasonic ELUGA Switch Build/LRX22G; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/51.0.2704.81 Mobile Safari/537.36'
          }
        }).then(function(response) {
          /*Taking the promise object*/
          data = response;
          return data;
        })
      }
    }
  })
  /*creating appyCache service for cache memory*/
  .factory('appyCache', function($cacheFactory) {
    console.log("appyCache");
    /*returning cacheFactory function*/
    return $cacheFactory();
  })
