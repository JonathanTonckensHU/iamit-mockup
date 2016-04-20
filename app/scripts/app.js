'use strict';

/**
 * @ngdoc overview
 * @name iamitMockupApp
 * @description
 * # iamitMockupApp
 *
 * Main module of the application.
 */
angular
  .module('iamitMockupApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'Main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
