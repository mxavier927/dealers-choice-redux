import React from "react"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from './Store'

const _Subscription = (props) => {
    const { users, subscriptions, id } = props
    const subscription = subscriptions.find(s => s.id === id)
    const subUsers = users.filter(u => u.subscriptionId === id)
    return (
        <div>
                <h3>Selected Subscription Plan: {id > 0 ? subscription.name : 'All'}</h3>
                {id > 0 ? <h3><Link to= {`/subscriptions/${subscription.id}/edit`}>Edit Plan</Link></h3> : null}
                {id > 0 ? 
                    <div>
                        <h3>Plan Features:</h3>
                        <ul>
                            {subscription.features.map(f => <li key= {f}>{f}</li>)}
                        </ul>
                    </div>
                    :
                    null
                    }
                {id > 0 ? <h3>Monthly Subscription Rate: ${subscription.monthlyRate}</h3> : null}
                <h3>Monthly Subscription Revenue: ${id > 0 ? subUsers.length * subscription.monthlyRate : 
                    subscriptions.reduce(((acc, cur) => acc + users.filter(u => u.subscriptionId === cur.id).length * cur.monthlyRate ), 0)
                    }</h3>
                <h3>Users: {id > 0 ? subUsers.length : users.length}</h3>
                {id > 0 ? <button onClick= {() => props.createUser(subscription.id)}>Create New User</button> : null }
                <ul>
                {id > 0 ? subUsers.map(u => <li key= {u.id}>{u.firstName + ' ' + u.lastName}</li>) : users.map(u => <li key= {u.id}>{u.firstName + ' ' + u.lastName}</li>)}
                </ul>    
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
	return {
        users: state.users,
        subscriptions: state.subscriptions,
        id: ownProps.match.params.id*1
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createUser: (id) => dispatch(createUser(id)),
	}
}

const Subscription = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Subscription)

export default Subscription