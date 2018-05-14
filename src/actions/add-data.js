const ADD_DATA = 'ADD-DATA';

const addActionCreator = (id, value) => ({
  type: ADD_DATA,
  id,
  value,
});

export { ADD_DATA, addActionCreator };

