import { combineReducers } from 'redux';
import RegisterReducer from './register';

const rootReducer = combineReducers({
  user: RegisterReducer
});

export default rootReducer;
