'use strict';

angular.module('conFusion.services', ['ngResource'])
  .constant("baseURL", "http://localhost:3000/")
  .factory('menuFactory', ['$http', '$resource', 'baseURL', function ($http, $resource, baseURL) {
    //define functions here

    /*this.getDishes = function () {
     return $http.get(baseURL + "dishes");
     };*/

    return $resource(baseURL + "dishes/:id", null, {'update': {method: 'PUT'}});

    /*this.getDish = function (index) {
     return $http.get(baseURL + "dishes/" + index);
     };*/
    // DEPRECIATED SERVICE CODE
    /*this.getPromotions = function () {
     return $resource(baseURL + "promotions/:id", null);
     };*/
  }])
  .factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    return $resource(baseURL + "promotions/:id");
  }])
  .factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    var corpfac = {};

    /*var leadership = [
     {
     name: "Peter Pan",
     image: 'images/alberto.png',
     designation: "Chief Epicurious Officer",
     abbr: "CEO",
     description: "Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother's wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections."
     },
     {
     name: "Dhanasekaran Witherspoon",
     image: 'images/alberto.png',
     designation: "Chief Food Officer",
     abbr: "CFO",
     description: "Our CFO, Danny, as he is affectionately referred to by his colleagues, comes from a long established family tradition in farming and produce. His experiences growing up on a farm in the Australian outback gave him great appreciation for varieties of food sources. As he puts it in his own words, Everything that runs, wins, and everything that stays, pays!"
     },
     {
     name: "Agumbe Tang",
     image: 'images/alberto.png',
     designation: "Chief Taste Officer",
     abbr: "CTO",
     description: "Blessed with the most discerning gustatory sense, Agumbe, our CFO, personally ensures that every dish that we serve meets his exacting tastes. Our chefs dread the tongue lashing that ensues if their dish does not meet his exacting standards. He lives by his motto, You click only if you survive my lick."
     },
     {
     name: "Alberto Somayya",
     image: 'images/alberto.png',
     designation: "Executive Chef",
     abbr: "EC",
     description: "Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!"
     }

     ];*/

    /*corpfac.getLeader = function (index) {
     return leadership[index];
     };
     corpfac.getLeaders = function () {
     return leadership;
     };*/

    corpfac.getLeaders = function () {
      return $resource(baseURL + "leadership/:id", null);
    };

    return corpfac;

    // Implement two functions, one named getLeaders,
    // the other named getLeader(index)
    // Remember this is a factory not a service

  }])
  .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    var feedbackfac = {};
    feedbackfac.sendFeedback = function () {
      return $resource(baseURL + "feedback");
    };
    return feedbackfac;

  }])
  .factory('favoriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    var favFac = {};
    var favorites = [];

    favFac.addToFavorites = function (index) {
      // CHECK IF ALREADY IN FAVORITES
      for (var i = 0; i < favorites.length; ++i) {
        if (favorites[i].id == index) {
          return;
        }
      }
      favorites.push({id: index});
    };

    favFac.getFavorites = function () {
      return favorites;
    };

    favFac.deleteFromFavorites = function (index) {
      for (var i = 0; i < favorites.length; ++i) {
        if (favorites[i].id == index) {
          favorites.splice(i, 1);
        }
      }
    };

    return favFac;
  }])
  .factory('$localStorage', ['$window', function ($window) {
    return {
      store: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      storeObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key, defaultValue) {
        return JSON.parse($window.localStorage[key] || defaultValue);
      }
    }
  }]);
