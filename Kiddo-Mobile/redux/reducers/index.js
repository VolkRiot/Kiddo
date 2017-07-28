import { combineReducers } from 'redux';
import RegisterReducer from './register';
import KidReducer from './kidReducer';
import LocationReducer from './locationReducer';

const rootReducer = combineReducers({
  user: RegisterReducer,
  kidOwner: KidReducer,
  location: LocationReducer
});

export default rootReducer;
