import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import SignUpPage from './pages/SignUpPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/sign-up" component={SignUpPage}/>
        </Switch>
      </div>  
    </Router>
  );
}

export default App;
