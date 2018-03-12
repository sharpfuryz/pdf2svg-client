import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { configureStore, history, sagaMiddleware } from './store/configureStore';
import LayoutContainer from './containers/AppContainer'
import Routes from './Routes'
import itemsSaga from './sagas'

const store = configureStore();
sagaMiddleware.run(itemsSaga);

render(
  <AppContainer>
    <LayoutContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    </LayoutContainer>
  </AppContainer>,
  document.getElementById('root')
);

// Handle print screen
// Todo: Capture mac button
window.onkeyup = function(e){
  if(e.keyCode == 44){
    console.log('Print screen event fired')
  }
}

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
