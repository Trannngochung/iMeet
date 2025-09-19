import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../Components/index';
import Signup from '../Components/Signup';
import Login from '../Components/Login';

const RouterDOM = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/"><HomePage /></Route>
				<Route exact path="/signup"><Signup /></Route>
				<Route exact path="/login"><Login /></Route>
			</Switch>
		</Router>
	);
}
export default RouterDOM;