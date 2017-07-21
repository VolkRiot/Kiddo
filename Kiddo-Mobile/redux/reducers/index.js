import { combineReducers } from 'redux';
import RegisterReducer from './register';
import KidReducer from './kidReducer';

const rootReducer = combineReducers({
  user: RegisterReducer,
  kidOwner: KidReducer
});

export default rootReducer;
