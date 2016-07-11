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

Go to tamplates/aboutus

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




