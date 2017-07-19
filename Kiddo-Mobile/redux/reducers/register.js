import { FOUND_PARENT, PARENT_NOT_FOUND, RESET_SEARCH_BOX } from '../actions/index';

const initialState = {
  user: null,
  found: false,
  searchSubmitted: false
};

export default function registerUser(state = initialState, action) {
  switch (action.type) {
    case FOUND_PARENT:
      return {
        ...state,
        ...action.payload,
        user: action.payload,
        found: true,
        searchSubmitted: true
      };
    case PARENT_NOT_FOUND:
      return {
        ...state,
        user: null,
        found: false,
        searchSubmitted: true
      };
    case RESET_SEARCH_BOX:
      return {
        ...state,
        user: null,
        searchSubmitted: false
      };
    default:
      return { ...state };
  }
}
