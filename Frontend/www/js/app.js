// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','backand','starter.controllers','starter.services','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

  //Update Angular configuration section
  .config(function (BackandProvider) {
      BackandProvider.setAppName('dbprac');
      BackandProvider.setAnonymousToken('20d5beb6-3bc2-49ad-abf8-cce0f68ac6d0');
  })

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('menu', {
      url: "/menu",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'MenuCtrl'
    })
    .state('menu.tabs', {
      url: "/tab",
      views: {
        'menuContent' :{
          templateUrl: "templates/tabs.html"
        }
      }
    })
    .state('menu.tabs.lifeNotes', {
      url: "/lifeNotes",
      views: {
        'lifeNotes-tab': {
          templateUrl: "templates/lifeNotes.html",
          controller: 'ButtonsTabCtrl'
        }
      }
    })
    .state('menu.tabs.list', {
      url: "/list",
      views: {
        'list-tab': {
          templateUrl: "templates/list.html",
          controller: 'StudyCtrl'
        }
      }
    })
    .state('menu.tabs.form', {
      url: "/form",
      views: {
        'form-tab': {
          templateUrl: "templates/form.html",
          controller: 'wishCtrl'
        }
      }
    })
    .state('menu.slidebox', {
      url: "/slidebox",
      views: {
        'menuContent': {
          templateUrl: "templates/slidebox.html",
          controller: 'SlideboxCtrl'
        }
      }
    })
    .state('menu.love', {
      url: "/love",
      views: {
        'menuContent': {
          templateUrl: "templates/love.html",
          controller: 'loveCtrl'
        }
      }
    })
    .state('menu.3DRoom', {
      url: "/3DRoom",
      views: {
        'menuContent': {
          templateUrl: "templates/3DRoom.html",
          controller: 'threeCtrl'
        }
      }
    })
    .state('menu.sessions', {
      url: "/sessions",
      views: {
        'menuContent': {
          templateUrl: "templates/sessions.html",
          controller: 'SessionsCtrl'
        }
      }
    })
    .state('menu.session', {
      url: "/sessions/:sessionImdbID",
      views: {
          'menuContent': {
            templateUrl: "templates/session.html",
            controller: 'SessionCtrl'
        }
      }
    })
    .state('menu.about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "templates/about.html"
        }
      }
    });

  $urlRouterProvider.otherwise("menu/tab/lifeNotes");
});

























