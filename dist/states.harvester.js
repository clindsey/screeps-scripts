const harvesterStates = {
  idling: target => {
    console.log('harvester', target.target.name, 'idling', 'enter');
    target.clearState();
    if (target.canCarryEnergy()) {
      console.log('harvester', target.target.name, 'idling', 'can carry energy');
      return 'collecting';
    } else if (target.spawnNeedsEnergy()) {
      console.log('harvester', target.target.name, 'idling', 'spawn needs energy');
      return 'delivering';
    }
  },

  delivering: target => {
    console.log('harvester', target.target.name, 'delivering', 'enter');
    if (target.inTransferRange()) {
      console.log('harvester', target.target.name, 'delivering', 'in transfer range');
      return 'transfering';
    } else {
      target.setDestinationTransfer();
      console.log('harvester', target.target.name, 'delivering', 'need to transfer');
      return 'navigating';
    }
  },

  collecting: target => {
    console.log('harvester', target.target.name, 'collecting', 'enter', target.inCollectRange());
    if (target.inCollectRange()) {
      console.log('harvester', target.target.name, 'collecting', 'in collect range');
      return 'harvesting';
    } else {
      target.setDestinationCollect();
      console.log('harvester', target.target.name, 'collecting', 'need to collect');
      return 'navigating';
    }
  },

  harvesting: target => {
    console.log('harvester', target.target.name, 'harvesting', 'enter');
    if (target.canCarryEnergy()) {
      console.log('harvester', target.target.name, 'harvesting', 'can carry energy');
      target.harvest();
    } else {
      console.log('harvester', target.target.name, 'harvesting', 'cant carry energy');
      return 'idling';
    }
  },

  transfering: target => {
    console.log('harvester', target.target.name, 'transfering', 'enter');
    if (target.needsToTransfer()) {
      console.log('harvester', target.target.name, 'transfering', 'transfering');
      target.transfer();
    } else {
      console.log('harvester', target.target.name, 'transfering', 'done with transfer');
      return 'idling';
    }
  },

  navigating: target => {
    console.log('harvester', target.target.name, 'navigating', 'enter');
    if (target.distanceToDestination() > 1) {
      console.log('harvester', target.target.name, 'navigating', 'following nav');
      target.followNav();
      return;
    }
    console.log('harvester', target.target.name, 'navigating', 'arrived');
    target.shiftState();
  }
};

module.exports = harvesterStates;
