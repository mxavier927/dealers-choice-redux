import React from "react"
import { connect } from 'react-redux';
import { updateSubscription, deleteSubscription } from './Store'

class _EditSubscription extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            features: [],
            newFeature: '',
            monthlyRate: 0
          };
          this.handleChange = this.handleChange.bind(this)
          this.save = this.save.bind(this);
          this.addFeature = this.addFeature.bind(this);
          this.deleteSubscription = this.deleteSubscription.bind(this)
    }
    componentDidMount(){
        const subscription = this.props.subscriptions.find(s => s.id === this.props.match.params.id*1);
        if(subscription){
          this.setState({ 
              name: subscription.name, features: subscription.features, monthlyRate: subscription.monthlyRate
             });
        }
    }
    handleChange(ev) {
      if (ev.target.name === 'name') {
        this.setState({ name : ev.target.value})
      } else if (ev.target.name === 'monthlyRate') {
        this.setState({ monthlyRate : ev.target.value})
      } else if (ev.target.name === 'newFeature') {
        this.setState({ newFeature : ev.target.value})
      }
    }
    save(ev){
        ev.preventDefault();
        this.props.updateSubscription({ id: this.props.match.params.id*1, name: this.state.name, features: this.state.features, monthlyRate: this.state.monthlyRate, history: this.props.history });
      }
    addFeature(ev) {
        ev.preventDefault();
        this.setState({ features : this.state.features.push(this.state.newFeature) })
        console.log(this.state.features)
        this.props.updateSubscription({ id: this.props.match.params.id*1, name: this.state.name, features: this.state.features, monthlyRate: this.state.monthlyRate, history: this.props.history });
    }
    deleteSubscription() {
        this.props.deleteSubscription({ id: this.props.match.params.id*1, history: this.props.history })
    }
    render() {
        const { save, handleChange, addFeature, deleteSubscription, state } = this
        const { name, newFeature, monthlyRate } = state
        const subscription = this.props.subscriptions.find(s => s.id === this.props.match.params.id*1);
		return (
				<div>
                    <button onClick= {deleteSubscription}>Delete Subscription Plan</button>
					<form onSubmit={ save }>
                        <label htmlFor='name'>Subscription Plan Name:</label>
                        <input name= 'name' type= 'text' value={ name } onChange={handleChange}/>
                        <button type= 'submit'>Update</button>
                    </form>
                    <form onSubmit={ save }>
                        <label htmlFor='monthlyRate'>Monthly Subscription Rate:</label>
                        <input name= 'monthlyRate' type= 'number' value={ monthlyRate} onChange={handleChange}/>
                        <button type= 'submit'>Update</button>
                    </form>
                    <p>Plan Features:</p>
                    <ul>
                    {subscription.features.map(feature => 
                    <li key= {feature}>{feature}</li>)}
                    <li>
                        <form onSubmit={ addFeature }>
                            <label htmlFor='newFeature'>New Feature:</label>
                            <input name= 'newFeature' value={ newFeature } onChange={handleChange}/>
                            <button type= 'submit'>Add</button>
                        </form>
                    </li>
                    </ul>
				</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
        users: state.users,
        subscriptions: state.subscriptions,
	}
}

const mapDispatchToProps = dispatch => {
	return {
        updateSubscription: (subscription) => dispatch(updateSubscription(subscription)),
        deleteSubscription: ({ id, history }) => dispatch(deleteSubscription({ id, history })),
	}
}

const EditSubscription = connect(
    mapStateToProps,
    mapDispatchToProps
)(_EditSubscription)

export default EditSubscription