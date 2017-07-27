import { SAVE_KID_USER } from '../actions/index';

const initialState = {
  kidOwner: null
};

export default function registerKidOwner(state = initialState, action) {
  switch (action.type) {
    case SAVE_KID_USER:
      return {
        ...state,
        kidOwner: action.payload
      };
    default:
      return { ...state };
  }
}
