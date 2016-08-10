const fsm = require('fsm');

const defaultInitialState = 'idling'; // refactor, not happy with this

class StateMachine {
  constructor (target, stateFns, initialState = defaultInitialState) {
    this.target = target;
    this.stateFns = stateFns;
    this.target.memory.state = this.target.memory.state || initialState;
  }

  update () {
    fsm.update(this, this.stateFns);
  }
}

module.exports = StateMachine;
