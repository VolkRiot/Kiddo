import { combineReducers } from 'redux';
import RegisterReducer from './register';

const rootReducer = combineReducers({
  register: RegisterReducer
});

export default rootReducer;
