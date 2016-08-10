const SpawnEntity = require('entity.spawn');
const HarvesterEntity = require('entity.harvester');

const entityTypes = {
  harvester: HarvesterEntity
};

module.exports.loop = () => {
  const spawnEntity = new SpawnEntity(Game.spawns['0-336-233-0']); // refactor, magic number
  spawnEntity.update();
  Object.keys(Game.creeps).forEach(creepName => {
    const creep = Game.creeps[creepName];
    const creepEntity = new entityTypes[creep.memory.type](creep, spawnEntity);
    creepEntity.update();
  });
};
