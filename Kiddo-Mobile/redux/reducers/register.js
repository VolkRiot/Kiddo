import { FOUND_PARENT } from '../actions/index';
import { PARENT_NOT_FOUND } from '../actions/index';

const initialState = {
  user: null,
  found: false
};

export default function registerUser(state = initialState, action) {
  switch (action.type) {
    case FOUND_PARENT:
      return {
        ...state,
        user: action.payload,
        found: true
      };
    case PARENT_NOT_FOUND:
      return {
        ...state,
        user: action.payload,
        found: false
      };
    default:
      return { ...state };
  }
}
