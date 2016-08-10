const spawnStates = require('states.spawn');
const StateMachine = require('StateMachine');

class SpawnEntity extends StateMachine {
  constructor (target, initialState) {
    super(target, spawnStates, initialState);
  }

  hasJob () {
    const harvesters = _.filter(Game.creeps, creep => creep.memory.type === 'harvester');
    return harvesters.length < 2; // refactor, this needs to be organized
  }

  canWork () {
    return this.target.canCreateCreep([WORK, CARRY, MOVE]);
  }

  needsToCollect () {
    return this.target.energy < 20;
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
