const harvesterStates = require('states.harvester');
const StateMachine = require('StateMachine');

class HarvesterEntity extends StateMachine {
  constructor (target, spawn, initialState = 'idling') {
    super(target, harvesterStates, initialState);
    this.spawn = spawn;
  }

  canCarryEnergy () {
    return this.target.carry.energy < this.target.carryCapacity;
  }

  spawnNeedsEnergy () {
    return this.spawn.needsEnergy();
  }

  inTransferRange () {
    const path = this.target.pos.findPathTo(this.spawn.target); // refactor, high cpu cost
    return path.length <= 1;
  }

  setDestinationTransfer () {
    this.target.memory.destination = 'transfer';
  }

  inCollectRange () {
    const sources = this.target.room.find(FIND_SOURCES); // refactor, average cpu cost
    const path = this.target.pos.findPathTo(sources[0]); // refactor, high cpu cost
    return path.length <= 1;
  }

  setDestinationCollect () {
    this.target.memory.destination = 'collect';
  }

  harvest () {
    const sources = this.target.room.find(FIND_SOURCES); // refactor, average cpu cost
    this.target.harvest(sources[0]);
  }

  needsToTransfer () {
    return this.target.carry.energy === this.target.carryCapacity;
  }

  transfer () {
    this.target.transfer(this.spawn.target, RESOURCE_ENERGY);
  }

  getDestination () {
    let destination;
    switch (this.target.memory.destination) {
      case 'collect':
        destination = this.target.room.find(FIND_SOURCES)[0]; // refactor, average cpu cost
        break;
      case 'transfer':
        destination = this.spawn.target;
        break;
    }
    return destination;
  }

  distanceToDestination () {
    const destination = this.getDestination();
    return this.target.pos.findPathTo(destination).length; // refactor, high cpu cost
  }

  followNav () {
    const destination = this.getDestination();
    const path = this.target.pos.findPathTo(destination); // refactor, high cpu cost
    this.target.move(path[0].direction);
  }
}

module.exports = HarvesterEntity;
