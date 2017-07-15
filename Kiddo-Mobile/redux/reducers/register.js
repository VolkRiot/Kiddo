import { RETRIEVE_PARENT } from '../actions/index';

const initialState = {
  parent: null,
  registered: false
}

export default function registerUser(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_PARENT:
      return {
        ...state,
        parent: action.parent
      };
    default:
      return { ...state };
  };
};
