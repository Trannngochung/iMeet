import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import Dashboard from '../Components/Dashboard';
import Callback from '../Components/Callback';
import Logout from '../Components/Logout';

const RouterDOM = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/"><Redirect to="/login" /></Route>
				<Route exact path="/signup"><Signup /></Route>
				<Route exact path="/login"><Login /></Route>
				<Route exact path="/dashboard"><Dashboard /></Route>
				<Route exact path="/callback"><Callback /></Route>
				<Route exact path="/logout"><Logout /></Route>
			</Switch>
		</Router>
	);
}
export default RouterDOM;