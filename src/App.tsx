import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from "jwt-decode";

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
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import { userLogIn } from './actions/UserActions';
import BlogCreationPage from './pages/BlogCreationPage';
import BlogPost from './components/BlogPost';
import OfferDetailsPage from './pages/OfferDetailsPage';
import AgencyDetailsPage from './pages/AgencyDetailsPage';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  
  if (token) {
    const { user } = jwt_decode(token) as any;
    dispatch(userLogIn(user));
  }

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
        <Route path="/post/:postId" component={BlogPost}/>
        <Route path="/account" component={AccountPage}/>
        <Route path="/new-offer" component={OffersCreationPage}/>
        <Route path="/new-post" component={BlogCreationPage}/>
        <Route path="/offer/:offerId" component={OfferDetailsPage}/>
        <Route path="/agency/:agencyId" component={AgencyDetailsPage}/>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;