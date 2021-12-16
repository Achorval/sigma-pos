const AuthenticationMiddlewares = require('../core/middlewares/AuthenticationMiddlewares');
const UserController = require('../controllers/UserController');
const ControllerPolicy = require('../core/policies/ControllerPolicy');

module.exports = (app) => {
  app.post('/api/login', 
    ControllerPolicy.login, 
    UserController.login);
  
  app.get('/api/user', 
    AuthenticationMiddlewares.authenticateUserToken, 
    UserController.userDetails);
    
  app.get('/api/customers', 
    AuthenticationMiddlewares.authenticateUserToken, 
    UserController.fetchCustomers);

  app.get('/api/verify/customer/:id', 
    AuthenticationMiddlewares.authenticateUserToken, 
    UserController.verifyCustomer);
   
  app.post('/api/process/payment', 
    AuthenticationMiddlewares.authenticateUserToken, 
    ControllerPolicy.paymentPolicy,
    UserController.processPayment); 

  app.get('/api/transactions', 
    AuthenticationMiddlewares.authenticateUserToken, 
    UserController.fetchTransactions); 

};

