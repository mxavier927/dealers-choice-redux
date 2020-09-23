const Sequelize = require("sequelize") 
//for things like Sequelize.STRING
const { STRING, DATE, BOOLEAN } = Sequelize
//import your db
const db = require('../db')
//define your model
const User = db.define('user', {
    firstName: {
        type: STRING,
        validate: {
            notEmpty: true
          }
        },
    lastName: {
        type: STRING,
        validate: {
            notEmpty: true
            }
        },
    password: {
        type: STRING,
        validate: {
            notEmpty: true
            }
        },
    email: {
        type: STRING,
        validate: {
            notEmpty: true
            }
        },    
    dateOfBirth: {
        type: DATE,
        validate: {
            notEmpty: true
          }
        },
    state: {
        type: STRING,
        validate: {
            notEmpty: true
          }
        },
    active: {
        type: BOOLEAN,
        defaultValue: true
        }
  })
//define any class or instance methods

//export your model
module.exports = User