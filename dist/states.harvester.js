const harvesterStates = {
  idling: target => {
    console.log(0, target.canCarryEnergy(), target.spawnNeedsEnergy());
    if (target.canCarryEnergy()) {
      console.log(1);
      return 'collecting';
    } else if (target.spawnNeedsEnergy()) {
      console.log(2);
      return 'delivering';
    }
  },

  delivering: target => {
    console.log(3);
    if (target.inTransferRange()) {
      console.log(4);
      return 'transfering';
    } else {
      console.log(5);
      target.setDestinationTransfer();
      return 'navigating';
    }
  },

  collecting: target => {
    console.log(6);
    if (target.inCollectRange()) {
      console.log(7);
      return 'harvesting';
    } else {
      console.log(8);
      target.setDestinationCollect();
      return 'navigating';
    }
  },

  harvesting: target => {
    console.log(9);
    if (target.canCarryEnergy()) {
      console.log('a');
      target.harvest();
    } else {
      console.log('b');
      return 'idling';
    }
  },

  transfering: target => {
    console.log('c');
    if (target.needsToTransfer()) {
      console.log('d');
      target.transfer();
    } else {
      console.log('e');
      return 'idling';
    }
  },

  navigating: target => {
    console.log('f');
    if (target.distanceToDestination() > 1) {
      console.log('10');
      target.followNav();
      return;
    }
    console.log('11', target.target.memory.state);
    return 'idling';
  }
};

module.exports = harvesterStates;
