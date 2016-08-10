const fsm = require('fsm');

class StateMachine {
  constructor (target, stateFns, initialState = 'idling') {
    this.target = target;
    this.stateFns = stateFns;
    this.states = target.memory.states || [initialState];
  }

  update () {
    this.target.memory.states = this.states = fsm.update(this, this.stateFns);
  }

  clearState () {
    this.target.memory.states = this.states = ['idling'];
  }

  shiftState () {
    this.states.shift();
    this.target.memory.states = this.states;
  }
}

module.exports = StateMachine;
