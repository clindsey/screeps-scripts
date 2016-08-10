const utils = require('utils');

module.exports.loop = () => {
  const {creeps} = Game;
  console.log('testing', utils.test());
  Object.keys(creeps).forEach((creepName) => {
    const creep = creeps[creepName];
  });
};
