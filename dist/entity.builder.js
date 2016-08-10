const builderStates = require('states.upgrader');
const StateMachine = require('StateMachine');
const builderConstants = require('constants.upgrader');

class BuilderEntity extends StateMachine {
  constructor (target, spawn, initialState = 'idling') {
    super(target, builderStates, initialState);
    this.spawn = spawn;
  }

  emptyEnergy () {
    return this.target.carry.energy === 0;
  }

  canCarryEnergy () {
    return this.target.carry.energy < this.target.carryCapacity;
  }

  inTransferRange () {
    const constructionSites = this.target.room.find(FIND_CONSTRUCTION_SITES);
    const path = this.target.pos.findPathTo(constructionSites[0]); // refactor, high cpu cost
    return path.length <= 1;
  }

  setDestinationTransfer () {
    this.target.memory.destination = builderConstants.TRANSFERING;
  }

  inCollectRange () {
    const sources = this.target.room.find(FIND_SOURCES); // refactor, average cpu cost
    const path = this.target.pos.findPathTo(sources[1]); // refactor, high cpu cost
    return path.length <= 1;
  }

  setDestinationCollect () {
    this.target.memory.destination = builderConstants.COLLECTING;
  }

  harvest () {
    const sources = this.target.room.find(FIND_SOURCES); // refactor, average cpu cost
    this.target.harvest(sources[1]);
  }

  needsToTransfer () {
    return this.target.carry.energy > 0;
  }

  transfer () {
    const constructionSites = this.target.room.find(FIND_CONSTRUCTION_SITES);
    this.target.build(constructionSites[0]);
  }

  getDestination () {
    let destination;
    switch (this.target.memory.destination) {
      case builderConstants.COLLECTING:
        destination = this.target.room.find(FIND_SOURCES)[1]; // refactor, average cpu cost
        break;
      case builderConstants.TRANSFERING:
        const constructionSites = this.target.room.find(FIND_CONSTRUCTION_SITES);
        destination = constructionSites[0];
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

module.exports = BuilderEntity;
