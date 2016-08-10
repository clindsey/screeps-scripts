const fsm = {
  create: initialState => {
    return [initialState];
  },

  update: (target, stateFns) => {
    const args = Array.prototype.slice.call(arguments, 0);
    args.unshift(target, target.states);
    const targetStates = target.states.slice(0);
    const targetState = targetStates[0];
    const newState = stateFns[targetState].apply(stateFns[targetState], args);
    if (newState) {
      fsm.unshift(targetStates, newState);
    }
    return targetStates;
  },

  unshift: (states, newState) => {
    states.unshift(newState);
  }
};

module.exports = fsm;
