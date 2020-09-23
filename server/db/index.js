const faker = require('faker')
//import your db
const db = require('./db')
//import your models
const User = require('./models/Users')
const Subscription = require('./models/Subscriptions')
//state your model associations (hasOne etc)
User.belongsTo(Subscription)
Subscription.hasMany(User)

const syncAndSeed = async()=> {
    await db.sync({ force: true });
    const _subscriptions = [];
    _subscriptions.push(Subscription.create({ name: 'Free', monthlyRate: 0 }))
    _subscriptions.push(Subscription.create({ name: 'Standard', features: ['System access', 'No ads'], monthlyRate: 10 }))
    _subscriptions.push(Subscription.create({ name: 'Premium', features: ['System access', 'No ads', 'Additional functionality'], monthlyRate: 25 }))
    const subscriptions = await Promise.all(_subscriptions);
    const _users = [];
    while(_users.length < 50){
      _users.push(User.create({ 
          firstName: faker.name.firstName(), 
          lastName: faker.name.lastName(), 
          password: faker.internet.password(),
          email: faker.internet.email(), 
          dateOfBirth: faker.date.past(),
          state: faker.address.state(),
          subscriptionId: faker.random.arrayElement(subscriptions).id, 
           }));
    }
    const users = await Promise.all(_users);
  };
//export your db and Models (so they all can be imported from a single central location)
module.exports = {
    db,
    User,
    Subscription,
    syncAndSeed
}