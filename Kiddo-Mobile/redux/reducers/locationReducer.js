import { SET_LOCATION } from '../actions/index';

const initialState = {
  location: null
};

export default function locationGetter(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.location
      };
    default:
      return { ...state };
  }
}
