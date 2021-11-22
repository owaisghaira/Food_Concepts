import React from 'react';
import Naviation from './navigation';
import { LayoutProvider } from './providers/layout-provider';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux';
import './App.css';
//import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <LayoutProvider>
            <Naviation />
          </LayoutProvider>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
