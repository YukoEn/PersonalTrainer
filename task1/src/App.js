import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navigator from './Components/Navigator';
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

const App = () => (
  <div className="App">
    <BrowserRouter>
      <div>
        <Navigator />
        <Main />
      </div>
    </BrowserRouter>
  </div>
)

export default App;