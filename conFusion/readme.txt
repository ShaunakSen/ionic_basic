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













