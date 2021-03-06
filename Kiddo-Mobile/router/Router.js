import { createRouter } from '@expo/ex-navigation';
import RegisterApp from '../containers/registerApp';
import MainProfile from '../containers/MainProfile';

export default createRouter(() => ({
  register: () => RegisterApp,
  main: () => MainProfile
}));
