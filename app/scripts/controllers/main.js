'use strict';

/**
 * @ngdoc function
 * @name iamitMockupApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iamitMockupApp
 */

class Main {

  constructor() {
    // Declare main scope here
  }

}

if(typeof angular !== 'undefined') {
  angular.module('iamitMockupApp')
  .controller('MainCtrl', Main);
} else {
  module.exports = Main;
}
