import React from "react"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Subscriptions = (props) => {
    const { subscriptions } = props
    return (
        <div>
            <h2>Choose Subscription Plan:</h2>
            <ul className= 'Subscriptions'>
            <li>
                <Link to= '/'>All</Link>
            </li>
            {
            subscriptions.map(subscription => 
                <li key = {subscription.id}>
                    <Link to= {`/subscriptions/${subscription.id}`}>{subscription.name}</Link>
                </li>)
            }
            <li>
                <Link to= '/subscriptions/create'>Create New</Link>
            </li>
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
	return {
      subscriptions: state.subscriptions
	}
}

const Subscriptions = connect(
    mapStateToProps
)(_Subscriptions)

export default Subscriptions