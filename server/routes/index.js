const router = require("express").Router()
//import models from /db
const db = require('../db');
const { User, Subscription } = db;
//routes go here
router.get('/users', async (req, res, next)=> {
    try {
      res.send(await User.findAll());
    }
    catch(err){
      next(err);
    }
  });

router.get('/users/:id', async (req, res, next)=> {
    try {
      res.send(await User.findByPk(req.params.id));
    }
    catch(err){
      next(err);
    }
  });

router.post('/users', async (req, res, next)=> {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  }
    catch(err){
      next(err);
    }
});

router.get('/subscriptions', async (req, res, next)=> {
    try {
        res.send(await Subscription.findAll());
    }
    catch(err){
      next(err);
    }
  });

router.get('/subscriptions/:id', async (req, res, next)=> {
    try {
        res.send(await Subscription.findByPk(req.params.id));
    }
    catch(err){
      next(err);
    }
  });

router.post('/subscriptions', async(req, res, next)=> {
    try {
      const subscription = await Subscription.create(req.body);
      res.status(201).send(subscription);
    }
    catch(ex){
      next(ex);
    }
});

router.put('/subscriptions/:id', async(req, res, next)=> {
  try {
    const subscription = await Subscription.findByPk(req.params.id);
    await subscription.update(req.body);
    res.send(subscription);
  }
  catch(ex){
    next(ex);
}
});

router.delete('/subscriptions/:id', async(req, res, next)=> {
  try {
    await Subscription.destroy( { where: { id: req.params.id}});
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
}
});

module.exports = router
