import { FIND_PARENT } from '../actions/index';

const initialState = {
  parent: 'Misha',
  registered: false
};

export default function registerUser(state = initialState, action) {
  switch (action.type) {
    case FIND_PARENT:
      return {
        ...state,
        parent: action.payload
      };
    default:
      return { ...state };
  }
}
