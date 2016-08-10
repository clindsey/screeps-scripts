const harvesterStates = require('states.harvester');
const fsm = require('fsm');
const StateMachine = requie('StatemMachine');

class HarvesterEntity extends StateMachine {
  constructor (target, spawn, initialState) {
    super(target, intialState);
    this.spawn = spawn;
  }

  canCarryEnergy () {
    return this.target.carry.energy < this.target.carryCapacity;
  }

  spawnNeedsEnergy () {
    return this.spawn.needsEnergy();
  }

  inTransferRange () {
    const path = this.target.pos.findPathTo(this.spawn);
    return !path.length;
  }

  setDestinationTransfer () {
    this.target.memory.destination = 'transfer';
  }

  inCollectRange () {
    const sources = this.target.room.find(FIND_SOURCES);
    const path = this.target.pos.findPathTo(sources[0]);
    return !path.length;
  }

  setDestinationCollect () {
    this.target.memory.destination = 'collect';
  }

  harvest () {
    const sources = creep.room.find(FIND_SOURCES);
    this.target.harvest(sources[0]);
  }

  needsToTransfer () {
    return this.target.carry.energy === this.target.carryCapacity;
  }

  transfer () {
    this.spawn.transfer(this.target.transfer, RESOURCE_ENERGY);
  }

  getDestination () {
    let destination;
    switch (this.target.memory) {
      case 'collect':
        destination = creep.room.find(FIND_SOURCES)[0];
        break;
      case 'transfer':
        destination = this.spawn;
        break;
    }
    return destination;
  }

  distanceToDestination () {
    const destination = getDestination();
    return this.target.pos.findPathTo(destination).length;
  }

  followNav () {
    const destination = getDestination();
    const path = this.target.pos.findPathTo(destination);
    this.target.move(path[0].direction);
  }
}
