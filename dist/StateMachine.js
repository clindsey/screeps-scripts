const fsm = require('fsm');

const defaultInitialState = 'idling'; // refactor, not happy with this

class StateMachine {
  constructor (target, stateFns, initialState = defaultInitialState) {
    this.target = target;
    this.stateFns = stateFns;
    this.states = target.memory.states || [initialState];
  }

  update () {
    this.target.memory.states = this.states = fsm.update(this, this.stateFns);
  }

  clearState () {
    this.target.memory.states = this.states = [defaultInitialState];
  }

  shiftState () {
    this.states.shift();
    this.target.memory.states = this.states;
  }
}

module.exports = StateMachine;
