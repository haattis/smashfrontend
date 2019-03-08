import { Route, Switch, Redirect } from 'react-router-dom';
import './styles/App.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Test from './components/Test';
import Profile from './containers/Profile';
import Navbar from './components/Navbar';
import Admin from './containers/Admin';
import Matches from './containers/Matches';
import RegisterMatches from './containers/RegisterMatches';
import Leaderboard from './containers/Leaderboard';
import { postCurrent } from './actions/auth';

class App extends React.Component {
  componentWillMount() {
    this.props.postCurrent();
  }


  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <Navbar />
          <div className="mainContainer">
            <Switch>
              <PrivateRoute authed={this.props.user} exact path="/" component={RegisterMatches} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/matches" component={Matches} />
              <Route exact path="/registermatch" component={RegisterMatches} />
              <PrivateRoute exact path="/profile" authed={this.props.user} component={Profile} />
              <PrivateRoute exact path="/admin" admin={this.props.user} component={Admin} />
              <Route path="/profile/:id" component={Profile} />

            </Switch>
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
};

function PrivateRoute({
  component: Component, authed, admin, ...rest
}) {
  return (
    <Route
      {...rest}
      render={
        props => (admin ? (admin.isAdmin ? <Component {...props} />
          : <Redirect to={{ pathname: '/' }} />)
          : (authed
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/leaderboard' }} />))}
    />
  );
}


const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  postCurrent: () => dispatch(postCurrent()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
