const spawnStates = {
  idling: target => {
    if (target.hasJob() && target.canWork() && target.enoughEnergyForJob()) {
      return spawnStates.building;
    }
  },

  building: target => {
    if (!target.isBuilding()) {
      target.startBuilding()
      return spawnStates.idling;
    }
  }
};

module.exports = spawnStates;
