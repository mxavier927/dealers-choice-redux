import React from "react"
import { connect } from 'react-redux';
import { createSubscription } from './Store'

class _CreateSubscription extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            monthlyRate: 0
          };
          this.handleChange = this.handleChange.bind(this)
          this.save = this.save.bind(this);
    }
    handleChange(ev) {
      if (ev.target.name === 'name') {
        this.setState({ name : ev.target.value})
      } else if (ev.target.name === 'monthlyRate') {
        this.setState({ monthlyRate : ev.target.value})
      }
    }
    save(ev){
        ev.preventDefault();
        this.props.createSubscription({ name: this.state.name, monthlyRate: this.state.monthlyRate, history: this.props.history });
      }
    render() {
        const { save, handleChange, state } = this
        const { name, monthlyRate } = state
		return (
				<div>
					<form onSubmit={ save }>
                      <label htmlFor='name'>Subscription Plan Name</label>
                     <input name= 'name' type= 'text' value={ name } onChange={handleChange}/>
                     <label htmlFor='monthlyRate'>Monthly Subscription Rate</label>
                     <input name= 'monthlyRate' type= 'number' value={ monthlyRate } onChange={handleChange}/>
                     <button type= 'submit' disabled={ !name }>Create</button>
                    </form>
				</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createSubscription: (subscription) => dispatch(createSubscription(subscription)),
	}
}

const CreateSubscription = connect(
    null,
    mapDispatchToProps
)(_CreateSubscription)

export default CreateSubscription