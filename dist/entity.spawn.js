const spawnStates = require('states.spawn');
const fsm = require('fsm');
const StateMachine = require('StateMachine');

class SpawnEntity extends StateMachine {
  hasJob () {
  }

  needsToCollect () {
  }

  startedBuilding () {
  }

  stillBuilding () {
  }

  startBuilding () {
  }

  doneBuilding () {
  }
}

module.exports = SpawnEntity;
