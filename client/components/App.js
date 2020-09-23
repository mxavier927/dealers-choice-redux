import React from "react"
//import any sub-components
import { HashRouter as Router, Link, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers, fetchSubscriptions } from "./Store";
import Subscriptions from "./Subscriptions"
import CreateSubscription from "./CreateSubscription"
import Subscription from "./Subscription"
import EditSubscription from "./EditSubscription"

class _App extends React.Component {
	//constructor to initialize state
	constructor() {
		super()
	}
	//any lifecycle methods
	async componentDidMount() {
		await Promise.all([
			this.props.fetchUsers(),
			this.props.fetchSubscriptions()
		  ]);
		console.log(this.props.users)
		console.log(this.props.subscriptions)
	}
	//any custom methods
	//render
	render() {
		return (
			<Router>
				<div>
					<h1>Subscription Plan and User Analysis</h1>
					<Subscriptions />
					<Route path='/' exact component={ Subscription } />
					<Route path='/subscriptions' exact component={ Subscription } />
					<Route path='/subscriptions/create' exact component={ CreateSubscription } />
					<Route path='/subscriptions/:id' exact component={ Subscription } />
					<Route path='/subscriptions/:id/edit' exact component={ EditSubscription } />
				</div>
			</Router>
		)
	}	
}

const mapStateToProps = state => {
	return {
	  users: state.users,
	  subscriptions: state.subscriptions
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers: () => dispatch(fetchUsers()),
		fetchSubscriptions: () => dispatch(fetchSubscriptions())
	}
}

const App = connect(
	mapStateToProps,
	mapDispatchToProps	
)(_App)

export default App