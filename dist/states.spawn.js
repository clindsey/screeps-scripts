const spawnStates = {
  idling: target => {
    if (target.hasJob() && !target.needsToCollect()) {
      return spawnStates.building;
    }
  },

  building: target => {
    if (!target.startedBuilding()) {
      target.startBuilding()
    } else if (!target.stillBuilding()) {
      target.doneBuilding();
      return spawnStates.idling;
    }
  }
};

module.exports = spawnStates;
