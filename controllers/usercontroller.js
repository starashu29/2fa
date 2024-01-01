let userController = new Object();
const userDal = require('../dal/userDal');
const appHelper = require('../helpers/appHelper');


userController.createUser = async (req) => {
    try {
        
        let payload = req.body;
        let validateuser = await userDal.getusername(payload);
        if (validateuser.status) {
            return appHelper.apiResponse(400, false, 'Account already exists with same username');
        }
        let saveUser = await userDal.createUser(payload);
        if (!saveUser.status) {
            return appHelper.apiResponse(500, false, saveUser.message);
        }
       
        return appHelper.apiResponse(200, true, 'user created', payload)
    } catch (error) {
        console.log('Failed', error);
        return appHelper.apiResponse(500, false, error.message ? error.message : error);
    }
};


userController.sendsecret = async (req) => {
    try {
        
        let payload = req.body;
        let passeduser = await userDal.userpass(payload);
        if (!passeduser.status) {
            return appHelper.apiResponse(400, false, passeduser.message);
        }
       
        return appHelper.apiResponse(200, true, passeduser.message, passeduser.data)
    } catch (error) {
        console.log('Failed', error);
        return appHelper.apiResponse(500, false, error.message ? error.message : error);
    }
};


userController.verifysecret = async (req) => {
    try {
        
        let payload = req.body;
        let userverified = await userDal.verify(payload);
        if (!userverified.status) {
            return appHelper.apiResponse(400, false, userverified.message);
        }
       
        return appHelper.apiResponse(200, true, userverified.message, userverified.data)
    } catch (error) {
        console.log('Failed', error);
        return appHelper.apiResponse(500, false, error.message ? error.message : error);
    }
};


userController.viewallusers = async () => {
    try {
        
      
        let users = await userDal.viewallusers();
        if (!users.status) {
            return appHelper.apiResponse(400, false, users.message);
        }
       
        return appHelper.apiResponse(200, true, users.message, users.data)
    } catch (error) {
        console.log('Failed', error);
        return appHelper.apiResponse(500, false, error.message ? error.message : error);
    }
};

module.exports = userController;