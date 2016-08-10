const SpawnEntity = require('entity.spawn');

module.exports.loop = () => {
  Object.keys(Game.spawns).forEach((spawnName) => {
    const spawnEntity = new SpawnEntity(Game.spawns[spawnName], 'idling');
    spawnEntity.update();
  });
};
