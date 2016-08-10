const spawnStates = require('states.spawn');
const StateMachine = require('StateMachine');

class SpawnEntity extends StateMachine {
  constructor (target, initialState = 'idling') {
    super(target, spawnStates, initialState);
  }

  hasJob () {
    const harvesters = _.filter(Game.creeps, creep => creep.memory.type === 'harvester');
    console.log('has job', harvesters.length);
    return harvesters.length === 0; // refactor, this needs to be organized
  }

  needsEnergy () {
    return this.target.energy < this.target.energyCapacity;
  }

  canWork () {
    return !this.target.canCreateCreep([WORK, CARRY, MOVE]);
  }

  needsToCollect () {
    return this.target.energy < 20;
  }

  enoughEnergyForJob () {
    return this.target.energy >= 20;
  }

  isBuilding () {
    return this.target.spawning;
  }

  startBuilding () {
    this.target.createCreep([WORK, CARRY, MOVE], undefined, {type: 'harvester'});
  }

  transfer (transferFn, resourceType) {
    transferFn(this.target, resourceType);
  }
}

module.exports = SpawnEntity;
