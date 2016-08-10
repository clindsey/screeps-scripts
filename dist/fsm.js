const fsm = {
  create: initialState => {
    return [initialState];
  },

  update: (target, stateFns) => {
    const args = Array.prototype.slice.call(arguments, 0);
    args.unshift(target);
    const newState = stateFns[target.target.memory.state].apply(stateFns[target.target.memory.state], args);
    if (newState) {
      target.target.memory.state = newState;
    }
    return target.target.memory.state;
  }
};

module.exports = fsm;
