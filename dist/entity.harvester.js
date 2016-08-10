const harvesterStates = require('states.harvester');
const StateMachine = require('StateMachine');
const harvesterConstants = require('constants.harvester');

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
    this.target.memory.destination = harvesterConstants.TRANSFERING;
  }

  inCollectRange () {
    const sources = this.target.room.find(FIND_SOURCES); // refactor, average cpu cost
    const path = this.target.pos.findPathTo(sources[0]); // refactor, high cpu cost
    return path.length <= 1;
  }

  setDestinationCollect () {
    this.target.memory.destination = harvesterConstants.COLLECTING;
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
      case harvesterConstants.COLLECTING:
        destination = this.target.room.find(FIND_SOURCES)[0]; // refactor, average cpu cost
        break;
      case harvesterConstants.TRANSFERING:
        destination = this.spawn.target;
        break;
    }
    return destination;
  }

  distanceToDestination () {
    const destination = this.getDestination();
    const dist = this.target.pos.findPathTo(destination).length; // refactor, high cpu cost
    return dist;
  }

  followNav () {
    const destination = this.getDestination();
    const path = this.target.pos.findPathTo(destination); // refactor, high cpu cost
    this.target.move(path[0].direction);
  }
}

module.exports = HarvesterEntity;
