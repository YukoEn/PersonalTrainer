import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import CustomerList from './Components/CustomerList';
import TrainingList from './Components/TrainingList';


const Home = () => (
  <div className="bgimg">
    <div className="text-pos">
      <h1>Perseverance Is Key to Success</h1>
    </div>
  </div>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/customers" component={CustomerList} />
      <Route path="/trainings" component={TrainingList} />
      <Route render={() => <h1>Page not found</h1>} />
    </Switch>
  </main>
)

const Header = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light  bg-light">
      <Link className="navbar-brand" to="/">Personal Training Database</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/customers">Customer List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/trainings">Training List</Link>
        </li>
      </ul>
    </nav>
  </div>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App;