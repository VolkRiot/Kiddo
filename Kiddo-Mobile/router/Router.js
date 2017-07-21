import { createRouter } from '@expo/ex-navigation';
import RegisterApp from '../containers/registerApp';

// TODO:(Insert Basic Component here);

const Router = createRouter(() => ({
  home: () => RegisterApp,
}));

export default Router;
