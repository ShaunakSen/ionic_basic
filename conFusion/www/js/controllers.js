angular.module('conFusion.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};
    $scope.reservation = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };

    //RESERVE TABLE TEMPLATE MODAL
    $ionicModal.fromTemplateUrl("templates/reserve.html", {
      scope: $scope
    }).then(function (modal) {
      $scope.reserveForm = modal;
    });

    $scope.closeReserve = function () {
      $scope.reserveForm.hide();
    };

    $scope.reserve = function () {
      $scope.reserveForm.show();
    };


    $scope.doReserve = function () {
      console.log("Doing reservation...", $scope.reservation);

      //time delay

      $timeout(function () {
        $scope.closeReserve();
      }, 1000);
    };


  })
  .controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate',
    function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate) {

      console.log('here');
      $scope.baseURL = baseURL;
      $scope.tab = 1;
      $scope.filtText = '';
      $scope.showDetails = true;
      $scope.showMenu = false;
      $scope.message = 'Loading...';

      $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails
      };

      /*$scope.dishes = {};
       menuFactory.getDishes().then(
       function (response) {
       $scope.dishes = response.data;
       $scope.showMenu = true;
       // menu is now ready to be displayed
       },
       function (response) {
       $scope.message = "Error: " + response.status + " " + response.statusText;
       }
       );*/

      $scope.dishes = menuFactory.getDishes().query(
        function (response) {
          //success function
          $scope.dishes = response;
          $scope.showMenu = true;
        },
        function (response) {
          //error function
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

      $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
          $scope.filtText = 'appetizer';
        }
        else if (setTab === 3) {
          $scope.filtText = 'mains';
        }
        else if (setTab === 4) {
          $scope.filtText = 'dessert';
        }
        else {
          $scope.filtText = '';
        }
      };
      $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
      };

      $scope.addFavorite = function (index) {
        console.log("Index is ", index);
        favoriteFactory.addToFavorites(index);
        $ionicListDelegate.closeOptionButtons();
        var favorites_current = favoriteFactory.getFavorites();
        console.log(favorites_current);
      };

    }])
  .controller('ContactController', ['$scope', function ($scope) {
    $scope.feedback = {
      mychannel: "",
      firstName: "",
      lastName: "",
      agree: false,
      email: ""
    };
    $scope.channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];
    $scope.invalidChannelSelection = false;

  }])
  .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

    $scope.feedbackStatus = false;
    $scope.message = "";

    $scope.sendFeedback = function () {
      console.log($scope.feedback);

      if ($scope.feedback.agree && $scope.feedback.mychannel == "") {
        $scope.invalidChannelSelection = true;
        console.log('incorrect option');
      }
      else {
        $scope.invalidChannelSelection = false;

        // Data OK.. POST in server

        feedbackFactory.sendFeedback().save($scope.feedback,
          function (response) {
            $scope.feedbackStatus = true;
            console.log(response);
            //OK...Set Default Values Now
            $scope.feedback = {
              mychannel: "",
              firstName: "",
              lastName: "",
              agree: false,
              email: ""
            };
            $scope.feedbackForm.$setPristine();
            console.log('Restored default values.... ' + $scope.feedback);
            $scope.message = "Feedback Sent"

          },
          function (response) {
            console.log(response);
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );


      }
    }

  }])
  .controller('dishDetailController', ['$scope', '$stateParams', 'menuFactory', 'favoriteFactory',
    'baseURL', '$ionicPopover', '$ionicModal',
    function ($scope, $stateParams, menuFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal) {

      $scope.baseURL = baseURL;
      $scope.search = '';
      $scope.dish = {};
      $scope.showDish = false;
      $scope.message = "Loading...";

      // MODAL CODE
      $ionicModal.fromTemplateUrl('templates/dish-comment.html',{
        scope: $scope
      }).then(function (modal) {
        $scope.commentForm = modal;
      });

      $scope.showCommentForm = function () {
        $scope.closePopover();
        $scope.commentForm.show();
      };
      $scope.hideCommentForm = function () {
        $scope.commentForm.hide();
      };

      // CODE TO HANDLE COMMENTS
      $scope.comments = {
        name: "",
        rating: 5,
        comment: "",
        date: ""
      };

      $scope.addComment = function () {
        $scope.comments.date = new Date().toISOString();
        $scope.comments.rating = parseInt($scope.comments.rating);
        console.log($scope.comments);
        $scope.dish.comments.push($scope.comments);

        menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);
        $scope.hideCommentForm();
      };


      // POPOVER CODE
      $ionicPopover.fromTemplateUrl('templates/popover.html',{
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });

      $scope.openPopover = function ($event) {
        $scope.popover.show($event);
      };
      $scope.closePopover = function () {
        $scope.popover.hide();
      };

      $scope.addFavorite = function (index) {
        console.log("Index is ", index);
        favoriteFactory.addToFavorites(index);
        $scope.closePopover();
        var favorites_current = favoriteFactory.getFavorites();
        console.log(favorites_current);
      };


      /*menuFactory.getDish(parseInt($stateParams.id, 10)).then(
       function (response) {
       $scope.dish = response.data;
       $scope.showDish = true;
       },
       function (response) {
       $scope.message = "Error: " + response.status + " " + response.statusText;
       }
       );*/

      $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)}).$promise.then(
        function (response) {
          $scope.dish = response;
          $scope.showDish = true;
          console.log()
        },
        function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

      function inArray(array, item) {
        for (var i = 0; i < array.length; ++i) {
          if (array[i] === item) {
            return true;
          }
        }
        return false;
      }

      $scope.order = function (param) {
        orderString = '';
        var acceptable2 = ['-rating', '-date', '-author', '-comment'];
        var acceptable = ['rating', 'date', 'author', 'comment'];
        if (param.charAt(0) === '-') {
          if (inArray(acceptable2, param)) {
            return param;
          }
          else {
            return '';
          }
        }
        else {
          if (inArray(acceptable, param)) {
            return param;
          }
          else {
            return '';
          }
        }
      }
    }])
  .controller('CommentFormController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    //SETTING DEFAULT VALUES
    $scope.comments = {
      name: "",
      ratings: 5,
      comment: ""
    };

    $scope.validateTextarea = function () {
      return $scope.comments['comment'] == "" && !$scope.commentsForm.comment.$pristine;

    };

    $scope.validateForm = function () {
      if ($scope.commentsForm.$invalid) {
        return false;
      }
      else {
        var comment = $scope.comments.comment;
        if (comment != "")
          return true;
      }
    };

    $scope.processComment = function () {
      $scope.addPreview();
    };

    $scope.addPreview = function () {
      $scope.compatibleObject = {
        author: "",
        rating: 5,
        comment: "",
        date: "Ok"
      };
      $scope.compatibleObject.author = $scope.comments.name;
      $scope.compatibleObject.rating = $scope.comments.ratings;
      $scope.compatibleObject.comment = $scope.comments.comment;
      $scope.compatibleObject.date = new Date().toISOString();
      console.log($scope.compatibleObject);

      $scope.dish.comments.push($scope.compatibleObject);

      //update on server

      menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);

      //restore defaults

      $scope.comments = {
        name: "",
        ratings: 5,
        comment: ""
      };

      $scope.commentsForm.$setPristine();
    }


  }])
  .controller('IndexController', ['$scope', 'baseURL', 'menuFactory', 'corporateFactory',
    function ($scope, baseURL, menuFactory, corporateFactory) {

      /*$scope.dish = {};*/
      $scope.baseURL = baseURL;
      $scope.showPromotion = false;
      $scope.showDish = false;
      $scope.showLeader = false;
      $scope.message = "Loading...";
      $scope.promotions = menuFactory.getPromotions().query(
        function (response) {
          //success function
          $scope.showPromotion = true;
          $scope.promotions = response

        },
        function (response) {
          //error function
          $scope.message = "Error: " + response.status + " " + response.statusText;
        }
      );

      /*menuFactory.getDish(0).then(function (response) {
       $scope.dish = response.data;
       $scope.showDish = true;
       },
       function (response) {
       $scope.message = "Error: " + response.status + " " + response.statusText;
       }
       );*/

      $scope.dish = menuFactory.getDishes().get({id: 0})
        .$promise.then(function (response) {
            $scope.dish = response;
            $scope.showDish = true;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );

      $scope.executiveChief = corporateFactory.getLeaders().get({id: 3})
        .$promise.then(function (response) {
            $scope.showLeader = true;
            $scope.executiveChief = response;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );
    }])
  .controller('AboutController', ['$scope', 'corporateFactory', 'baseURL', function ($scope, corporateFactory, baseURL) {

    $scope.baseURL = baseURL;
    $scope.message = "Loading...";
    $scope.showLeaders = false;

    $scope.leaders = corporateFactory.getLeaders().query(
      function (response) {
        $scope.showLeaders = true;
        $scope.leaders = response;
      },
      function (response) {
        //error function
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    )
  }])
  .controller('FavoritesController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL',
    '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout',
    function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout) {
      $scope.baseURL = baseURL;
      $scope.shouldShowDelete = false; //DEFAULT

      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Loading ...'
      });

      $scope.favorites = favoriteFactory.getFavorites();
      // RETURNS A OBJECT ARRAY CONTAINING ID OF FAVORITE ITEMS

      // FETCH LIST OF DISHES

      $scope.dishes = menuFactory.getDishes().query(
        function (response) {
          //success function
          $scope.dishes = response;
          $timeout(function () {
            $ionicLoading.hide();
          }, 1000)
        },
        function (response) {
          //error function
          $scope.message = "Error: " + response.status + " " + response.statusText;
          $timeout(function () {
            $ionicLoading.hide();
          }, 1000)
        }
      );
      $scope.toggleDelete = function () {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
      };

      $scope.deleteFavorite = function (index) {

        var confirmPopup = $ionicPopup.confirm({
          title: "Confirm Delete",
          template: "Are You Sure You Want To Delete This Item? "
        });

        confirmPopup.then(function (res) {
          if(res){
            favoriteFactory.deleteFromFavorites(index);
          }
        });
        $scope.shouldShowDelete = false;
      };

    }])
  .filter('favoriteFilter', function () {
    return function (dishes, favorites) {
      var out = [];
      for (var i = 0; i < favorites.length; ++i) {
        for (var j = 0; j < dishes.length; ++j) {
          if (favorites[i].id == dishes[j].id) {
            out.push(dishes[j]);
          }
        }
      }
      return out;
    }
  });
