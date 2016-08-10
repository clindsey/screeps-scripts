const spawnStates = require('states.spawn');
const StateMachine = require('StateMachine');

const defaultCreepBody = [WORK, CARRY, MOVE, MOVE];
const baseEnergy = 250;
const harvesterPopulationSize = 2;
const upgraderPopulationSize = 2;
const builderPopulationSize = 1;

class SpawnEntity extends StateMachine {
  constructor (target, initialState = 'idling') {
    super(target, spawnStates, initialState);
  }

  hasJob () {
    const harvesters = _.filter(Game.creeps, creep => creep.memory.type === 'harvester'); // refactor, hardcoded
    const upgraders = _.filter(Game.creeps, creep => creep.memory.type === 'upgrader'); // refactor, hardcoded
    const builders = _.filter(Game.creeps, creep => creep.memory.type === 'builder'); // refactor, hardcoded
    return harvesters.length < harvesterPopulationSize || upgraders.length < upgraderPopulationSize || builders.length < builderPopulationSize; // refactor, this needs to be organized
  }

  needsEnergy () {
    return this.target.energy < this.target.energyCapacity;
  }

  canWork () {
    return !this.target.canCreateCreep(defaultCreepBody);
  }

  needsToCollect () {
    return this.target.energy < baseEnergy;;
  }

  enoughEnergyForJob () {
    return this.target.energy >= baseEnergy;
  }

  isBuilding () {
    return this.target.spawning;
  }

  startBuilding () {
    const harvesters = _.filter(Game.creeps, creep => creep.memory.type === 'harvester'); // refactor, hardcoded
    const upgraders = _.filter(Game.creeps, creep => creep.memory.type === 'upgrader'); // refactor, hardcoded
    const builders = _.filter(Game.creeps, creep => creep.memory.type === 'builder'); // refactor, hardcoded
    if (harvesters.length < harvesterPopulationSize) {
      this.target.createCreep(defaultCreepBody, undefined, {type: 'harvester'}); // refactor, hardcoded
    } else if (builders.length < builderPopulationSize) {
      this.target.createCreep(defaultCreepBody, undefined, {type: 'builder'}); // refactor, hardcoded
    } else if (upgraders.length < upgraderPopulationSize) {
      this.target.createCreep(defaultCreepBody, undefined, {type: 'upgrader'}); // refactor, hardcoded
    }
  }

  transfer (transferFn, resourceType) {
    transferFn(this.target, resourceType);
  }
}

module.exports = SpawnEntity;
