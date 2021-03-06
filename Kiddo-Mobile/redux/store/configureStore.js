import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import createHistory from 'history/createBrowserHistory';
// import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import * as Actions from '../actions';

// export const history = createHistory();

export const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk)
    )
  );

// Open question
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
