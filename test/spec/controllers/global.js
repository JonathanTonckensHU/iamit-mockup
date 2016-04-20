'use strict';

let expect = require("chai").expect;

const GlobalCtrl = require('../../../app/scripts/controllers/global');

const controller = new GlobalCtrl();

describe('Setting global variable', () => {
  it('Sets the first_name, last_name, id and email in the user object',() => {
    expect(controller.user).to.have.all.keys('first_name','last_name','id','email');
  });
  it('Sets the credits and skill_points in the score object',() => {
    expect(controller.score).to.have.all.keys('credits','skill_points');
  });
  it('Gets the full name of a user',() => {
    let params = {
      first_name: 'Test',
      last_name: 'User'
    };
    expect(controller.getName(params)).to.equal('Test User');
  });
  it('Gets the credits',() => {
    let params = {
      credits: 10
    }
    expect(controller.getCredits(params)).to.equal(10);
  });
  it('Gets the skillpoints',() => {
    let params = {
      skill_points: 10
    }
    expect(controller.getSkillpoints(params)).to.equal(10);
  });
});
describe('Top level functions', () => {
  it('Replaces underscores with spaces',() => {
    expect(controller.replace('skill_points','_',' ')).to.equal('skill points');
  });
  it('Sets the credits',() => {
    controller.setCredits(10);
    expect(controller.getCredits()).to.equal(10);
  });
  it('Sets the skill points',() => {
    controller.setSkillpoints(12);
    expect(controller.getSkillpoints()).to.equal(12);
  });
  it('Updates the score',() => {
    controller.setCredits(9);
    controller.setSkillpoints(12);
    controller.updateScore('credits',3);
    controller.updateScore('skill_points',5);
    expect(controller.getCredits()).to.equal(12);
    expect(controller.getSkillpoints()).to.equal(17);
  })
});
