const upgraderStates = require('states.upgrader');
const StateMachine = require('StateMachine');
const upgraderConstants = require('constants.upgrader');

class UpgraderEntity extends StateMachine {
  constructor (target, spawn, initialState = 'idling') {
    super(target, upgraderStates, initialState);
    this.spawn = spawn;
  }

  emptyEnergy () {
    return this.target.carry.energy === 0;
  }

  canCarryEnergy () {
    return this.target.carry.energy < this.target.carryCapacity;
  }

  inTransferRange () {
    const path = this.target.pos.findPathTo(this.target.room.controller); // refactor, high cpu cost
    return path.length <= 1;
  }

  setDestinationTransfer () {
    this.target.memory.destination = upgraderConstants.TRANSFERING;
  }

  inCollectRange () {
    const sources = this.target.room.find(FIND_SOURCES); // refactor, average cpu cost
    const path = this.target.pos.findPathTo(sources[0]); // refactor, high cpu cost
    return path.length <= 1;
  }

  setDestinationCollect () {
    this.target.memory.destination = upgraderConstants.COLLECTING;
  }

  harvest () {
    const sources = this.target.room.find(FIND_SOURCES); // refactor, average cpu cost
    this.target.harvest(sources[0]);
  }

  needsToTransfer () {
    return this.target.carry.energy > 0;
  }

  transfer () {
    this.target.transfer(this.target.room.controller, RESOURCE_ENERGY);
  }

  getDestination () {
    let destination;
    switch (this.target.memory.destination) {
      case upgraderConstants.COLLECTING:
        destination = this.target.room.find(FIND_SOURCES)[0]; // refactor, average cpu cost
        break;
      case upgraderConstants.TRANSFERING:
        destination = this.target.room.controller;
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

module.exports = UpgraderEntity;
