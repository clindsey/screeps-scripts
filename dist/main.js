const SpawnEntity = require('entity.spawn');
const HarvesterEntity = require('entity.harvester');

const entityTypes = {
  spawn: SpawnEntity,
  harvester: HarvesterEntity
};

module.exports.loop = () => {
  const spawnEntity = new entityTypes['spawn'](Game.spawns['0-336-233-0']);
  spawnEntity.update();
  Object.keys(Game.creeps).forEach((creepName) => {
    const creep = Game.creeps[creepName];
    const creepEntity = new entityTypes[creep.memory.type](creep, spawnEntity);
    creepEntity.update();
  });
};
