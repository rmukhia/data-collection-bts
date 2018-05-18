import { ADD_DATA } from '../actions/add-data';
import { RESET_DATA } from '../actions/reset-data';

const mapDiscount = {
  10: 0,
  20: 1,
  30: 2,
  40: 3,
};

const mapValue = {
  1: [1, 0],
  2: [0, 1],
  3: [1, 1],
  4: [0, 0],
};

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_DATA: {
      const obj = {};
      obj[action.id] = action.value;
      const newState = Object.assign({}, state, obj);
      return newState;
    }
    case RESET_DATA:
      return {};
    case 'UPDATE-SLOT': {
      let stateSlot = [
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []]];
      if (state.slot) {
        stateSlot = [state.slot[0].slice(),
          state.slot[1].slice(),
          state.slot[2].slice(),
          state.slot[3].slice()];
      }

      let i = 0;
      switch (action.value) {
        case 1: // yes
        case 2:
        case 3:
          for (i = mapDiscount[action.discount]; i < 4; i += 1) {
            stateSlot[action.timePeriod - 1][i] = mapValue[action.value];
          }
          break;
        case 4: // no
          for (i = 0; i <= mapDiscount[action.discount]; i += 1) {
            stateSlot[action.timePeriod - 1][i] = mapValue[action.value];
          }
          break;
        default:
      }
      return Object.assign({}, state, { slot: stateSlot });
    }
    default:
      return state;
  }
};
