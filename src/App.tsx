import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route path="/" component={LandingPage}/>
        </Switch>
      </div>  
    </Router>
  );
}

export default App;
