const express = require('express');
const userRouter = express.Router();
const auth = require('../config/auth');
const isAdmin = auth.isAdmin;

const appController = require('../controllers/usercontroller');




userRouter.post('/createuser', async (req, res) => {
  
    result = await appController.createUser(req);
    res.status(result.code).send(result);
});

userRouter.post('/loginuser', async (req, res) => {
  
    result = await appController.sendsecret(req);
    res.status(result.code).send(result);
});

userRouter.post('/verifyuser', async (req, res) => {
   
    result = await appController.verifysecret(req);
    res.status(result.code).send(result);
});


//only admin can view all sellers, buyers and other admins
userRouter.get('/viewusers', isAdmin, async (req, res) => {
      result = await appController.viewallusers();
    res.status(result.code).send(result);
});

module.exports = userRouter;