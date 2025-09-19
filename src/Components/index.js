import React from 'react'
import {Link} from 'react-router-dom'
export default function HomePage () {
    return (
	<div>
		<Link to='/Signup'><div>Signup</div></Link>
		<Link to='/Login'><div>Login</div></Link>
	</div>
	)
}