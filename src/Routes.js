import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navigation';

import Home from './Components/Home';
import PrivateRoutes from './Components/PrivateRoute';
import Signin from './Signin';
import Profile from './user/Profile';
import Signup from './user/Signup';

class Routes extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<PrivateRoutes path="/user/edit/:userId" />
					<Route path="/user/:userId" component={Profile} />
					<Route path="/signup" component={Signup} />
					<Route path="/signin" component={Signin} />
				</Switch>
			</div>
		);
	}
}

export default Routes;