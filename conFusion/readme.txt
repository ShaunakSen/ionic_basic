Starting off with ionic:

Ionic Navigation
____________________

ionNavBar for creating top header/bar which automatically updates as application state changes

ionNavBackButton adds back button to nav bar



In www/index.html

<body ng-app="starter">
    <ion-nav-view></ion-nav-view>
</body>


<ion-nav-view></ion-nav-view> is ionic custom directive

similar to ui-view

angular uses ui router
so this is where our templates will be attached

rename app to conFusion
<body ng-app="conFusion">

Go to js/app.js

angular.module('conFusion', ['ionic', 'conFusion.controllers'])


Go to js/controllers.js

angular.module('conFusion.controllers', [])

NOTE ONE IMP THING

Ionic implements controllers as diff module, services as diff module etc.

So we have angular.module('conFusion.controllers', [])

Now we need to include these modules through DI

So in app.js we had:
angular.module('conFusion', ['ionic', 'conFusion.controllers'])

conFusion.controllers module is injected here

Now working on side menu
______________________________

Go to templates/menu.html

Rename it to sidebar.html

<ion-side-menu-content>

Here goes content for ur app

</ion-side-menu-content>


<ion-side-menu-content>
    <ion-nav-bar class="bar-stable">
      <ion-nav-back-button>
      </ion-nav-back-button>

      <ion-nav-buttons side="left">
        <button class="button button-icon button-clear ion-navicon" menu-toggle="left">
        </button>
      </ion-nav-buttons>
    </ion-nav-bar>
    <ion-nav-view name="menuContent"></ion-nav-view>
</ion-side-menu-content>


bar-stable gives a grey color

Lets change that

bar-royal

<ion-nav-back-button>
</ion-nav-back-button>

Depending on the platform ie ios or android this is displayed differently


<ion-nav-buttons side="left">
        <button class="button button-icon button-clear ion-navicon" menu-toggle="left">
        </button>
</ion-nav-buttons>
This button is used to show/hide the side menu

<ion-nav-view name="menuContent"></ion-nav-view>

Remember we had used ui-view with a name in ui-router
same thing here

Rename: <ion-nav-view name="mainContent"></ion-nav-view>

Basically i will use ui-roter to paste items in here

Next:

<ion-side-menu side="left">
    <ion-header-bar class="bar-positive">
      <h1 class="title">Navigation</h1>
    </ion-header-bar>
    <ion-content>
      <ion-list>
        <ion-item menu-close href="#/app/home">
          Home
        </ion-item>
        <ion-item menu-close href="#/app/aboutus">
          About Us
        </ion-item>
        <ion-item menu-close href="#/app/menu">
          Menu
        </ion-item>
        <ion-item menu-close href="#/app/contactus">
          Contact Us
        </ion-item>
        <ion-item class="item-divider">
          Services
        </ion-item>
        <ion-item menu-close ng-click="login()">
          Login
        </ion-item>
      </ion-list>
    </ion-content>
</ion-side-menu>

Now we need to look at Routes in app.js
_______________________________________________


In app.js

We have:

.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

This state is abstract state

This means it has nested sub states as:

.state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  ......
  ......

In state app
templateUrl is templates/menu.html

We changed it
So now
templateUrl: 'templates/sidebar.html'

Change next state to:

.state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

Similarly we change templates/search.html to home.html


Similarly:

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/sidebar.html',
        controller: 'AppCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html'
          }
        }
      })

      .state('app.aboutus', {
        url: '/aboutus',
        views: {
          'menuContent': {
            templateUrl: 'templates/aboutus.html'
          }
        }
      })

      .state('app.contactus', {
        url: '/contactus',
        views: {
          'menuContent': {
            templateUrl: 'templates/contactus.html'
          }
        }
      })
      .state('app.menu', {
        url: '/menu',
        views: {
          'menuContent': {
            templateUrl: 'templates/menu.html',
            controller: ''
          }
        }
      })

      .state('app.dishdetails', {
        url: '/menu/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/dishdetail.html',
            controller: ''
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/playlists');
  });

note we have changed views and states to match our needs

Similarly we rename files in the templates folder

Also remember we had used <ion-nav-view name="mainContent"></ion-nav-view>

So rename all menuContent to mainContent

Also
$urlRouterProvider.otherwise('/app/home');

______________________

Go to terminal
ionic serve --lab

It shows preview both in ios and android mode

_____________________

Go to templates/aboutus

<ion-view view-title="Browse">
  <ion-content>
    <h1>Browse</h1>
  </ion-content>
</ion-view>


ion-view .. within ionic if we declare template we have to use ion-view

view-title: It denotes the title shown on header bar when that particular view is shown on the screen

We change it to:
<ion-view view-title="About Us">
  <ion-content>
    <h4>About Us</h4>
  </ion-content>
</ion-view>

Similarly we edit the remaining templates

Ionic CSS Components
________________________________

ionic provides a no of css classes that provides various UI components

Ionic Card Class

-We will use this

Now we want to reconstruct our spa into an ionic app
_________________________________________________________

1. configure services
2. configure controllers
3. Redesign the templates

Services
___________

Paste in the services.js file which we developed earlier into www/js/
Updating this file:

angular.module('conFusion.services', ['ngResource'])

Also right now base url is: .constant("baseURL","http://localhost:3000/")

When we deploy this app to server we need to give ip address of server here

Also we inject ngResource ..


In index.html:
We have
<script src="lib/ionic/js/ionic.bundle.js"></script>
Ionic bundle doe not include ngResource..So we need to explicitly include this

<script src="lib/ionic/js/angular/angular-resource.js"></script>

We include angular-resource

What does ionic bundle include??
/*!
* ionic.bundle.js is a concatenation of:
* ionic.js, angular.js, angular-animate.js,
* angular-sanitize.js, angular-ui-router.js,
* and ionic-angular.js
*/

include services.js

<script src="js/services.js"></script>

In app.js

We need to inject services module into angular module
In app.js:

angular.module('conFusion', ['ionic', 'conFusion.controllers', 'conFusion.services'])

Controllers
______________

In controllers.js:

It contains a controller called AppCtrl.. Leave it as it is

It also has controllers: PlaylistsCtrl and PlaylistCtrl

Remove these

Replace with the controller code developed in the previous course

Let us now work on the templates
_______________________________________


Home.html:

To make this work in app.js:

.state('app.home', {
  url: '/home',
  views: {
    'mainContent': {
      templateUrl: 'templates/home.html',
      controller: 'IndexController'
    }
  }
})

In IndexController:

.controller('IndexController', ['$scope', 'baseURL', 'menuFactory', 'corporateFactory',
    function ($scope, baseURL, menuFactory, corporateFactory) {

      /*$scope.dish = {};*/
      $scope.baseURL = baseURL;
      ...
      ...

We want our images to be downloaded from server

So we need baseUrl

In home.html we simply display the data using help of ionic's built in classes
and layouts
We use the card layout here


Ionic Components Part 2
______________________________

We have lists class and also <ion-list>  directive

The directive supports addnl features for interaction like swiping, dragging to reorder, adding delete buttons

<ion-list>
  <ion-item></ion-item>
</ion-list>

Similarly we have tabs class
and also directive


Ionic Supports a Grid

It uses CSS Flexbox


row
  col

we can include any no of cols in row
each will get equal width by default

we can explicitly define the proportion of screen width that a col should take up
col-50
This col takes half the width

col-offset-x where x is a percentage

Vertical alignment: col-top, col-center, col-bottom

If we apply row-top all cols within that row will be alligned to top

responsive-sm, responsive-md, responsive-md is used for responsiveness

But note here u r designing for mobile.. So dont add too many cols


Working on the Menu View
____________________________

Updating MenuController

Inject baseUrl
controller('MenuController', ['$scope', 'menuFactory', 'baseURL', function ($scope, menuFactory, baseURL) {

$scope.baseURL = baseURL;
....
....
}

Same for dishDetailController

Configure states in app.js


state('app.menu', {
  url: '/menu',
  views: {
    'mainContent': {
      templateUrl: 'templates/menu.html',
      controller: 'MenuController'
    }
  }
})

.state('app.dishdetails', {
  url: '/menu/:id',
  views: {
    'mainContent': {
      templateUrl: 'templates/dishdetail.html',
      controller: 'dishDetailController'
    }
  }
});

In menu.html we have:
<ion-view view-title="Menu">
  <ion-content>
    <ion-list>
      <ion-item ng-repeat="dish in dishes" href="#/app/menu/{{dish.id}}">
        {{dish.name}}
      </ion-item>
    </ion-list>
  </ion-content>
</ion-view>


We change it:

<ion-view view-title="Menu">
  <ion-content>
    <ion-list>
      <ion-item ng-repeat="dish in dishes | filter:{category: filtText}"
                href="#/app/menu/{{dish.id}}" class="item-thumbnail-left">
        <img ng-src="{{baseURL + dish.image}}">
        <h2>{{dish.name}}</h2>
        <span>{{dish.price | currency}}</span>
        <span class="badge badge-assertive">{{dish.label}}</span>
        <p>{{dish.description}}</p>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-view>



Note: here the description shows only a single line. To make it show all add a class of item-text-wrap to
<ion-item>. Here we want to make separate view for dish detail so we dont do that

Setting up the tabs


<div class="tabs-striped tabs-color-royal">
    <ul class="tabs">
      <li ng-class="{active:isSelected(1)}" class="tab-item">
        <a ng-click="select(1)">The Menu</a>
      </li>
      <li ng-class="{active:isSelected(2)}" class="tab-item">
        <a ng-click="select(2)">Appetizers</a>
      </li>
      <li ng-class="{active:isSelected(3)}" class="tab-item">
        <a ng-click="select(3)">Mains</a>
      </li>
      <li ng-class="{active:isSelected(4)}" class="tab-item">
        <a ng-click="select(4)">Desserts</a>
      </li>
    </ul>
</div>


DishDetails View
_____________________

go to dishdetail.html

<ion-view view-title="Dish Detais">
  <ion-content>
    <div class="card">
      <div class="item item-body item-text-wrap">
        <img class="full-image" ng-src="{{baseURL + dish.image}}">
        <h2>
          {{dish.name}}
          <span style="font-size: 0.8em">{{dish.price | currency}}</span>
          <span class="badge badge-assertive">{{dish.label}}</span>
        </h2>
        <p>{{dish.description}}</p>
      </div>
    </div>
  </ion-content>
</ion-view>


Similarly we make aboutus and contactus views also


Ionic Modals and Forms
____________________________


Ionic modals take up the entire screen space

Ionic Forms are quite similar to bootstrap forms

Display and hiding of modals are controlled by controllers

Constructing a modal:

1. Design template structure
2. Code showing and hiding functions in the controller

go to login.html. This is a modal

<ion-modal-view>.. This is used to create modal

<ion-header-bar> contains title and close button

<ion-content> contains the main content

<ion-header-bar>
  <h1 class="title">Login</h1>
  <div class="buttons">
    <button class="button button-clear" ng-click="closeLogin()">Close</button>
  </div>
</ion-header-bar>

closeLogin()  function should be there in controller

Let us look at content now

<form ng-submit="doLogin()">

doLogin() function should be there in controller

Form elements are displayed as a set of list items

<input type="text" ng-model="loginData.username">

This implies that we should have a js object loginData and it should have a property of username and it is tied in through 2 way
data binding to this input

Similar for password

Lets look at js code now

Go to AppCtrl controller

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
...
}

Note $ionicModal and $timeout are services injected into this controller

$scope.loginData = {};
$scope.reservation = {};

We will use another form later. $scope.reservation = {}; is for that

Creating Modal:

$ionicModal.fromTemplateUrl('templates/login.html', {
  scope: $scope
}).then(function (modal) {
  $scope.modal = modal;
});

Note after the above function we have the modal variable  in the scope

So we can make use of this modal var to hide or show modal

$scope.closeLogin = function () {
  $scope.modal.hide();
};


Now we know this login modal opens on clicking login option in the sidebar

Lets look at sidebar.html

<ion-item menu-close ng-click="login()">
  Login
</ion-item>

This causes the modal to show

Note also:
.state('app', {
  url: '/app',
  abstract: true,
  templateUrl: 'templates/sidebar.html',
  controller: 'AppCtrl'
})


sidebar.html is under AppCtrl

So all modal code is written in AppCtrl


Let us now create a new modal and form !!

We will add functionality so that a logged in user can reserve table

In sidebar.html
<ion-item menu-close ng-click="reserve()">
  Reserve Table
</ion-item>


Lets create template for reserve table

Create reserve.html in templates

Look at code in reserve.html for this


Now we need to add the appropriate code in controller

$ionicModal.fromTemplateUrl("templates/reserve.html", {
  scope: $scope
}).then(function (modal) {
  $scope.reserveForm = modal;
})

closeReserve Function:

$scope.closeReserve = function () {
  $scope.reserveForm.hide();
};


doReserve function:

$scope.doReserve = function () {
  console.log("Doing reservation...", $scope.reservation);

  //time delay

  $timeout(function () {
    $scope.closeReserve();
  }, 1000);
};

Ionic Lists
_____________________


Ionic provides enhanced lists with advanced features like:

Delete button, Reorder Button, Option button

For eg: there is a directive: <ion-option-button>
This shows a button when a list item is swiped to the left

<ion-list>
  <ion-item ng-repeat="">
  ...
    <ion-option-button class="button-assertive icon ion-plus-circled"
    ng-click="addFavorite({{dish.id}})">
    </ion-option-button>
  </ion-item>

...

</ion-list>


Similarly there is a directive <ion-delete-button>

This directive when included in <ion-item> causes delete button to be shown on left edge when enabled
But how do we enable this delete button to be shown??

For this the ion-list should have attr show-delete


<ion-list show-delete="shouldShowDelete">
  <ion-item ng-repeat="">
  ...
    <ion-delete-button class="ion-minus-circled"
    ng-click="deleteFav({{dish.id}})">
    </ion-delete-button>
  </ion-item>

...

</ion-list>

Similar approach can be used to implement a reorder button

Angular also supports an additional repeat called collection-repeat

How does it differ from ng-repeat?

In ng-repeat if we have a collection of 2000 items it will display them
But our screen has capacity to show only 10 items
So it is pointless to display the remaining 1990 items
collection-repeat renders into DOM as many items as are currently visible


Angular Custom Filters
_____________________________

these can be written as a factory



Implementations
____________________


First we want an option button when list is swiped to the left

In menu.html

<ion-option-button class="button-assertive icon ion-plus-circled"
ng-click="addFavorite(dish.id)"></ion-option-button>


We need to implement this addFavorite function in MenuController

We want to keep track of favorites using a factory called favoriteFactory

So in controllers:

.controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate',
    function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate) {
      ...

      $scope.addFavorite = function (index) {
        console.log("Index is ", index);
        favoriteFactory.addToFavorite(index);
        $ionicListDelegate.closeOptionButtons();
      };
    }

Now we have to implement the favoriteFactory

In services.js:

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

    return favFac;
  }]);



Now add My Favorites To Sidebar Menu
When My Favorites is clicked it should show list of favs
Also we should be able to delete a favorite


In favoriteFactory

favFac.getFavorites = function () {
  return favorites;
};

Creating deleteFromFavorites method:

favFac.deleteFromFavorites = function (index) {
  for (var i = 0; i < favorites.length; ++i) {
    if (favorites[i].id == index) {
      favorites.splice(i, 1);
    }
  }
};

Now create a new template for displaying favorites: favorites.html

<ion-view view-title="My Favorites">
  <ion-content>
    <ion-list>
      <ion-item ng-repeat="dish in dishes | favoriteFilter: favorites"
                href="#/app/menu/{{dish.id}}" class="item-thumbnail-left">
        <img ng-src="{{baseURL + dish.image}}">
        <h2>{{dish.name}}
          <span style="font-size: 0.8em">{{dish.price | currency}}</span>
          <span class="badge badge-assertive">{{dish.label}}</span>
        </h2>
        <p>{{dish.description}}</p>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-view>

Notice the line: <ion-item ng-repeat="dish in dishes | favoriteFilter: favorites"


favoriteFilter is our custom filter and it takes in an object favorites as parameter

We get this favorites object from getFavorites method in favoriteFactory

Now we need to add option for delete

<ion-delete-button class="ion-minus-circled" ng-click="deleteFavorite(dish.id)"></ion-delete-button>

Now we wanna show this delete button only when reqd

For this we need to add another attr to ion-list

<ion-list show-delete="shouldShowDelete">

When shouldShowDelete is true the delete option will be shown

Now we want to add icons to header bar
This is done by ion-nav-buttons

<ion-nav-buttons side="secondary">
  <div class="buttons">
      <button class="button button-icon icon ion-ios-minus-outline" ng-click="toggleDelete()"></button>
  </div>
</ion-nav-buttons>

secondary: buttons displayed in RHS of header bar

toggleDelete function should be implemented in our controller

We create a new controller called FavoritesController

In app.js

.state('app.favorites', {
  url: '/favorites',
  views: {
    'mainContent': {
      templateUrl: 'templates/favorites.html',
      controller: 'FavoritesController'
    }
  }
})

Now in controllers.js we need to implement FavoritesController


Setting up the controller:

.controller('FavoritesController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate',
    function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate) {

}]);

In FavoritesController:

$scope.baseURL = baseURL;
$scope.shouldShowDelete = false; //DEFAULT
$scope.favorites = favoriteFactory.getFavorites();
// RETURNS A OBJECT ARRAY CONTAINING ID OF FAVORITE ITEMS

// FETCH LIST OF DISHES

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
  $scope.toggleDelete = function () {
    $scope.shouldShowDelete = !$scope.shouldShowDelete;
  };

  $scope.deleteFavorite = function (index) {
    favoriteFactory.deleteFromFavorites(index);
    $scope.shouldShowDelete = false;
  };
);


Now for the filter

<ion-item ng-repeat="dish in dishes | favoriteFilter: favorites"

Note that favorites is an object array defined in FavoritesController

favoriteFilter takes in as a parameter favorites object array

After FavoritesController:

.filter('favoriteFilter', function () {

});


This function actually returns a function which acts as a filter. This is how
Angular implements filters

.filter('favoriteFilter', function () {
    return function (dishes, favorites) {

    }
  });

1st param: array over which u wanna do the filtering
2nd param: array which u pass

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

Finally out array contains favorites only


Now in sidebar.html

<ion-item menu-close href="#/app/favorites">
  My Favorites
</ion-item>

_________________________________________________________


Popup, Popover, Action sheets and Loading
____________________________________________

All of these involve overlaying content on top of the screen

If u have a popup user is expected to interact with it
if u have a loading msg, until loading msg is taken off, user cant interact with screen

Show and hide all these uses javascript

Gestures
__________

on-hold, on-tap, on-double-tap, on-touch, on-release, on-drag-up,
on-drag-right, on-swipe-left, on-swipe-right ....

Invoke a function to handle gestures

<ion-item on-swipe-left="deleteFavorite(dish.id)">

Now what we want to do:

1.On clicking My Favorites data is fetched from server. We want to add a loading spinner while
that happens
2.On Clicking Delete option we want to add Confirmation PopOver
3.On swiping left I want to delete item


For 2.

In FavoritesController:

Inject $ionicPopup

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


For 1.

Inject '$ionicLoading', '$timeout' as DI

$ionicLoading.show({
  template: '<ion-spinner></ion-spinner> Loading ...'
});

Now Loading will finish in getDishes function i.e the function where data is fetched from server

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

We simulate delay using $timeout

3.
<ion-item ng-repeat="dish in dishes | favoriteFilter: favorites"
on-swipe-left="deleteFavorite(dish.id)"
href="#/app/menu/{{dish.id}}" class="item-thumbnail-left">


Angular ui-router and resolve
_____________________________________


Whenever we accessed resources through the services we used .then() to resolve the promise
But we can do better

This data resolution can be done better

We take help of Resolve object which is available on each state of ui-router

Resolve Object consists of key value pairs:
key: name of resolved dependency that we can inject into controller
value: function that returns value of the dependency

Before moving from one state to another resolution needs to be done

So this ensures when we go to a new state the data is directly available for the controller
to use it


In services.js
________________

menuFactory is a service.. Turn this into a factory

menFactory currently returns dishes as well as promotions

We create a separate factory to handle the promotions data

.factory('menuFactory', ['$http', '$resource', 'baseURL', function ($http, $resource, baseURL) {
  return $resource(baseURL + "dishes/:id", null, {'update': {method: 'PUT'}});
}])
.factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
  return $resource(baseURL + "promotions/:id", null);
}])


Fixing controllers:











