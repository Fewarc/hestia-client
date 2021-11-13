import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LoginPage';
import OffersPage from './pages/OffersPage';
import AgenciesPage from './pages/AgenciesPage';
import BlogPage from './pages/BlogPage';
import Alerts from './components/Alerts';
import AccountPage from './pages/AccountPage';
import OffersCreationPage from './pages/OfferCreationPage';

const App: React.FC = () => {
  return (
    <Router>
      <Helmet>
        <title>Hestia</title>
      </Helmet>
      <Navbar />
      <Alerts />
      <Switch>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/sign-up" component={SignUpPage}/>
        <Route path="/log-in" component={LogInPage}/>
        <Route path="/offers" component={OffersPage}/>
        <Route path="/agencies" component={AgenciesPage}/>
        <Route path="/blog" component={BlogPage}/>
        <Route path="/account" component={AccountPage}/>
        <Route path="/new-offer" component={OffersCreationPage}/>
      </Switch>
    </Router>
  );
}

export default App;