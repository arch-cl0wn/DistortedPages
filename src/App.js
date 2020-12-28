import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Test from './homepage';

class App extends Component {
  render(){
  return(
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={Test} />
      </Switch>
    </Router>
    </div>
  );
}
}


export default App;
