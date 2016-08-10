const spawnStates = {
  idling: target => {
    if (target.hasJob() && target.canWork() && target.enoughEnergyForJob()) {
      return 'building';
    }
  },

  building: target => {
    if (!target.isBuilding()) {
      target.startBuilding()
      return 'idling';
    }
  }
};

module.exports = spawnStates;
