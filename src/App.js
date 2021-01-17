import React, {Component} from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import theme from './Components/theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Routes from './Routes';

class App extends Component {
  render(){
  return(
    <div className="App">
    <Router>
    <MuiThemeProvider theme={theme}>
					<Routes />
		</MuiThemeProvider>
    </Router>
    </div>
  );
}
}


export default App;
