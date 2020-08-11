import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './List/List';
import Form from './Edit/Form';

import './App.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/new" component={Form} />
        <Route path="/edit/:id" render={({ match }) => <Form id={match.params.id} />} />
      </Switch>
    </Router>
  );
}

export default App;
