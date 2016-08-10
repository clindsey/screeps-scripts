class StateMachine {
  constructor (target, initialState) {
    this.target = target;
    this.states = target.memory.states || [initialState];
  }

  update () {
    this.target.memory.states = this.states = fsm.update(this, spawnStates);
  }
}

module.exports = StateMachine;
