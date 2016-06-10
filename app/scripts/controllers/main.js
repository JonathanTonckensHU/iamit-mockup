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
	//overschrijf document.write omdat quince1.nocache.js
	//document.write wil gebruiken maar dat kan niet omdat ie wordt toegevoegd
	//van uit een script en niet midden in een pagina
	//dit is een manier om te voorkoment dat er foutmeldingen komen
	//quince1.nocache.js is obfuscated generated code dus lastig om aan te passen
	//dit is makkelijker
	document.write = function(txt) {};
	var sc = document.createElement("script");
	sc.src = "/scripts/quince_minigame/quince1.nocache.js";
	document.body.appendChild(sc);
	//deze code is om er voor te zorgen dat de dingen die normaal door
	//quince1.nocache.js worden gedaan via document.write toch gedaan worden
	//quince1.nocache zou normaal namelijk <script defer="defer">quince1.onInjectionDone("quince1");</script>
	//outputten via document.write
	sc.addEventListener("load", function() {
		quince1.onInjectionDone("quince1");
	});
  }

}

if(typeof angular !== 'undefined') {
  angular.module('iamitMockupApp')
  .controller('MainCtrl', Main);
} else {
  module.exports = Main;
}
