import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={LandingPage}/>
        </Switch>
      </div>  
    </Router>
  );
}

export default App;
