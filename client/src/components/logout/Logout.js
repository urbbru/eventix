import * as React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../actions/users'
import {Redirect} from 'react-router-dom'

class Logout extends React.Component {
	componentWillMount() {
        this.props.logout()
	}

	render() {
		if (!this.props.authenticated) return (
			<Redirect to="/" />
		)

		return (
			<div>
				<h1>Logging out...</h1>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	authenticated: state.currentUser !== null
})

export default connect(mapStateToProps, {logout})(Logout)