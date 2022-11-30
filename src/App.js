import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import Welcome from './Welcome';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          {this.props.auth0.isAuthenticated ?
          <Routes>
            <Route 
              exact path="/" element={<BestBooks/>}>
              
            
            </Route>
            <Route 
            exact path="/about"
            element={<About />}>
            </Route>
            <Route 
            exact path="/profile"
            element={<Profile />}>
            </Route>
          </Routes>
          : <Welcome/>}
          <Footer />
        </Router>
          
      </>
    )
  }
}

export default withAuth0(App);
