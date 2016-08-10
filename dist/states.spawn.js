const spawnStates = {
  idling: target => {
    if (target.hasJob() && !target.needsToCollect()) {
      return spawnStates.building;
    }
  },

  building: target => {
    if (!target.isBuilding()) {
      target.startBuilding()
    } else {
      return spawnStates.idling;
    }
  }
};

module.exports = spawnStates;
