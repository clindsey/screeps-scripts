const SpawnEntity = require('entity.spawn');
const HarvesterEntity = require('entity.harvester');
const UpgraderEntity = require('entity.upgrader');

const entityTypes = {
  harvester: HarvesterEntity,
  upgrader: UpgraderEntity
};

module.exports.loop = () => {
  Object.keys(Memory.creeps).forEach((creepName) => {
    if (!Game.creeps[creepName]) {
      delete Memory.creeps[creepName];
    }
  });
  const spawnEntity = new SpawnEntity(Game.spawns['0-336-233-0']); // refactor, hardcoded
  spawnEntity.update();
  Object.keys(Game.creeps).forEach(creepName => {
    const creep = Game.creeps[creepName];
    if (creep.spawning) {
      return;
    }
    const creepEntity = new entityTypes[creep.memory.type](creep, spawnEntity);
    creepEntity.update();
  });
};
