'use strict';

/**
 * @ngdoc function
 * @name iamitMockupApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the iamitMockupApp
 */

 class GlobalCtrl {
   constructor() {
     this.user = {
       first_name: "Game",
       last_name: "Member",
       id: "@123ASD23#",
       email: "test@iamprogrez.com",
     };

     this.score = {
       credits: 10000,
       skill_points: 500
     };
   }

   getName(user) {
     user = (user)?user:this.user;
     if(user) {
       return user.first_name + ' ' + user.last_name;
     }
   }

   getCredits(score) {
     score = (score)?score:this.score;
     if(score) {
      return score.credits;
     }
   }

   getSkillpoints(score) {
     score = (score)?score:this.score;
     if(score) {
      return score.skill_points;
     }
   }

   replace(str,from,to) {
     return str.replace(from,to);
   }

   setCredits(credits) {
     this.score.credits = credits;
   }

   setSkillpoints(skill_points) {
     this.score.skill_points = skill_points;
   }

   updateScore(type,score) {
     this.score[type] += score;
   }

 }

if(typeof angular !== "undefined") {
  angular.module('iamitMockupApp').controller('GlobalCtrl', GlobalCtrl);
} else {
   module.exports = GlobalCtrl;
}
