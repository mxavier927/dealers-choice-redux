const Sequelize = require("sequelize") 
//for things like Sequelize.STRING
const { STRING, INTEGER, ARRAY } = Sequelize
//import your db
const db = require('../db')
//define your model
const Subscription = db.define('subscription', {
    name: {
        type: STRING,
        validate: {
            notEmpty: true
          }
        },
    features: {
        type: ARRAY(STRING),
        defaultValue: ['System access']
    },
    monthlyRate: {
        type: INTEGER,
        validate: {
            notEmpty: true
            }
        },    
  })
//define any class or instance methods

//export your model
module.exports = Subscription