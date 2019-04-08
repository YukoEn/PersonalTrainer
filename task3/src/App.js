import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navigator from './Components/Navigator';
import Login from './Components/Login';
import { firebaseAuth } from './config';
import CustomerList from './Components/CustomerList';
import TrainingList from './Components/TrainingList';
import CalendarView from './Components/CalendarView';


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, isAuthenticated: false };
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.setState({ user: user, isAuthenticated: true });
      }
      else {
        this.setState({ user: null, isAuthenticated: false });
      }
    });
  }

  render() {
    const Home = () => (
      <div className="bgimg">
        <div className="text-pos">
          <h1>Perseverance Is Key to Success</h1>
        </div>
      </div>
    )

    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigator isAuthenticated={this.state.isAuthenticated} />
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/customers" component={CustomerList} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/trainings" component={TrainingList} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/calendar" component={CalendarView} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;