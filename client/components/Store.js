import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
const faker = require('faker')

const FETCH_USERS = 'FETCH_USERS'
const CREATE_USER = 'CREATE_USER'

const _fetchUsers = (users)=> {
    return {
      type: FETCH_USERS,
      users
    };
  };
  
const fetchUsers = ()=> {
    return async(dispatch)=> {
      const response = await axios.get('/api/users');
      dispatch(_fetchUsers(response.data));
    };
};

const _createUser = (user)=> {
  return {
    type: CREATE_USER,
    user
  };
};

const createUser = (id)=> {
  return async(dispatch)=> {
    const newUser = { 
      firstName: faker.name.firstName(), 
      lastName: faker.name.lastName(), 
      password: faker.internet.password(),
      email: faker.internet.email(), 
      dateOfBirth: faker.date.past(),
      state: faker.address.state(),
      subscriptionId: id, 
    };
    const response = await axios.post('/api/users', newUser);
    dispatch(_createUser(response.data));
  };
};

const usersReducer = (state = [], action)=> {
    switch (action.type) {
        case FETCH_USERS:
            state = action.users
            return state
        case CREATE_USER:
          state = [...state, action.user]
            return state
        default:
            return state;
    }
};

const FETCH_SUBSCRIPTIONS = 'FETCH_SUBSCRIPTIONS'
const CREATE_SUBSCRIPTION = 'CREATE_SUBSCRIPTION'
const UPDATE_SUBSCRIPTION = 'UPDATE_SUBSCRIPTION'
const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION'

const _fetchSubscriptions = (subscriptions)=> {
    return {
      type: FETCH_SUBSCRIPTIONS,
      subscriptions
    };
  };
  
const fetchSubscriptions = ()=> {
    return async(dispatch)=> {
      const response = await axios.get('/api/subscriptions');
      dispatch(_fetchSubscriptions(response.data));
    };
};

const _createSubscription = (subscription)=> {
  return {
    type: CREATE_SUBSCRIPTION,
    subscription
  };
};

const createSubscription = ({ name, monthlyRate, history })=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/subscriptions', { name, monthlyRate });
    dispatch(_createSubscription(response.data));
    history.push('/subscriptions');
  };
};

const _updateSubscription = (subscription)=> {
  return {
    type: UPDATE_SUBSCRIPTION,
    subscription
  };
};

const updateSubscription = ({ id, name, features, monthlyRate, history })=> {
  return async(dispatch)=> {
    const response = await axios.put(`/api/subscriptions/${id}`, { name, features, monthlyRate });
    dispatch(_updateSubscription(response.data));
    history.push('/subscriptions');
  };
};

const _deleteSubscription = (subscription)=> {
  return {
    type: DELETE_SUBSCRIPTION,
    subscription
  };
};

const deleteSubscription = ({ id, history })=> {
  return async(dispatch)=> {
    const response = await axios.delete(`/api/subscriptions/${id}`);
    dispatch(_deleteSubscription(response.data));
    history.push('/subscriptions');
  };
};

const subscriptionsReducer = (state = [], action)=> {
    switch (action.type) {
        case FETCH_SUBSCRIPTIONS:
            state = action.subscriptions
            return state
        case CREATE_SUBSCRIPTION:
            state = [...state, action.subscription]
            return state
        case UPDATE_SUBSCRIPTION:
            state = state.map(subscription => subscription.id === action.subscription.id ? action.subscription : subscription)
            return state
        case DELETE_SUBSCRIPTION:
            state = state.filter(subscription => subscription.id !== action.id)
            return state
        default:
            return state;
    }
};

const reducer = combineReducers({
    users: usersReducer,
    subscriptions: subscriptionsReducer
  })

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { fetchUsers, fetchSubscriptions, createSubscription, updateSubscription, deleteSubscription,
        createUser };