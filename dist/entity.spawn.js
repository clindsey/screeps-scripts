const spawnStates = require('states.spawn');
const fsm = require('fsm');
const StateMachine = require('StateMachine');

class SpawnEntity extends StateMachine {
  hasJob () {
    const harvesters = _.filter(Game.creeps, creep => creep.memory.type === 'harvester');
    return harvesters.length < 2;
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
