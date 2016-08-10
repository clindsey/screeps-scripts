const harvesterStates = {
  idling: target => {
    target.clearState();
    if (target.canCarryEnergy()) {
      return 'collecting';
    } else if (target.spawnNeedsEnergy()) {
      return 'delivering';
    }
  },

  delivering: target => {
    if (target.inTransferRange()) {
      return 'transfering';
    } else {
      target.setDestinationTransfer();
      return 'navigating';
    }
  },

  collecting: target => {
    if (target.inCollectRange()) {
      return 'harvesting';
    } else {
      target.setDestinationCollect();
      return 'navigating';
    }
  },

  harvesting: target => {
    if (target.canCarryEnergy()) {
      target.harvest();
    } else {
      return 'idling';
    }
  },

  transfering: target => {
    if (target.needsToTransfer()) {
      target.transfer();
    } else {
      return 'idling';
    }
  },

  navigating: target => {
    if (target.distanceToDestination() > 1) {
      target.followNav();
      return;
    }
    target.shiftState();
  }
};

module.exports = harvesterStates;
