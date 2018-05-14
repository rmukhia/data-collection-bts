import { ADD_DATA } from '../actions/add-data';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_DATA: {
      const obj = {};
      obj[action.id] = action.value;
      const newState = Object.assign({}, state, obj);
      return newState;
    }
    default:
      return state;
  }
};
