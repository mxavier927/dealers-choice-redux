const express = require("express")
//initialize app
const app = express()
//require morgan|volleyball, path packages
const path = require('path')
const morgan = require('morgan')
//require db from /db
const db = require('./db')
const { syncAndSeed } = db
//use morgan|volleyball
app.use(morgan('dev'))
//use express.json()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//use express.static() MAKE SURE THE PATH TO YOUR PUBLIC FOLDER IS RIGHT!
app.get('/public', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.use(express.static(path.join(__dirname, 'public')))
//require in your routes and use them on your api path
const router = require('./routes')
app.use('/api', router)
//404 handler
app.use((req, res, next) => {
    if (path.extname(req.path).length > 0) {
      res.status(404).end()
    } else {
      next()
    }
})
//500 handler
app.use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})
//set PORT
const PORT = process.env.PORT || 3000;
//listen
const init = async () => {
    try {
      await syncAndSeed()
      app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (err) {
      console.log(`There was an error starting up!`, err);
    }
  }

init();