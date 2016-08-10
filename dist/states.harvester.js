const harvesterStates = {
  idling: target => {
    if (target.canCarryEnergy()) {
      return harvesterStates.collecting;
    } else if (target.spawnNeedsEnergy()) {
      return harvesterStates.delivering;
    }
  },

  delivering: target => {
    if (target.inTransferRange()) {
      return harvesterStates.transfering;
    } else {
      target.setDestinationSpawn();
      return harvesterStates.navigating;
    }
  },

  collecting: target => {
    if (target.inCollectRange()) {
      return harvesterStates.harvesting;
    } else {
      target.setDestinationEnergy();
      return harvesterStates.navigating;
    }
  },

  harvesting: target => {
    if (target.canCarryEnergy()) {
      target.harvest();
    } else {
      return harvesterStates.idling;
    }
  },

  transfering: target => {
    if (traget.needsToTransfer()) {
      target.transfer();
    } else {
      return harvesterStates.idling;
    }
  },

  navigating: (target, machine) => {
    if (target.distanceToDestination()) {
      target.followNav();
      return;
    }
    machine.shift();
  }
};

module.exports = harvesterStates;
