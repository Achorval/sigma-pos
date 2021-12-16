const { Op } = require('sequelize');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../core/config');
const { uniqueNumber } = require("../core/utils/Functions");
const { 
    user,
    customer,
    transaction
} = require('../models');

const hashPassword = (password) => {
    return passwordHash.generate(password); 
}

const compareHashPassword = (password, hashedPassword) => {
    return passwordHash.verify(password, hashedPassword); 
}

const jwtSignUser = (id) => {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign({id: id}, config.SECRET_KEY, { expiresIn: ONE_WEEK });
}

module.exports = {
    //= ====================================
    //  AUTHENTICATION CONTROLLER
    //--------------------------------------  
    async login (request, response) {
        try {
            const { 
                username,
                password
            } = request.body;
            
            const payload = {
                [Op.or]: [{
                    email: {
                        [Op.substring]: username.toLowerCase()}
                    },
                    {
                    phone: {
                        [Op.substring]: username}
                    }
                ]
            };

            const userLogin = await user.findOne({
                where: payload
            });

            const userJSON = userLogin.toJSON();

            if(userLogin === null) {
                return response.status(401).send({
                    status: 'error',
                    message: 'Incorrect login details.'
                });
            };

            if(userJSON.blocked === true) {
                return response.status(403).send({
                    status: 'error',
                    message: 'Account is deactivated, contact support!'
                });
            };

            if(!compareHashPassword(password, userJSON.password)) {
                return response.status(401).send({
                    status: 'error',
                    message: 'Incorrect login details.'
                });
            };

            return response.send({
                data: {
                    token: jwtSignUser(userJSON.id),
                    user: userJSON,
                },
                status: 'success',
                message: 'Login authentication was successful!'
            });

        } catch (error) { 
            response.status(400).send({
                status: 'error',
                message: 'An Error Occured, try again later'
            });
        }
    },

    //= ====================================
    //  USER CONTROLLER
    //--------------------------------------  
    async userDetails (request, response) {
        try {
            if (request.authUser) {
                return response.status(200).send({
                    status: 'success',
                    data: request.authUser
                });
            }
        } catch (error) {
            return response.status(400).send({
                status: 'error',
                message: 'An Error Occured, try again later'
            });
        }
    },

    async fetchCustomers (request, response) {
        try {
            if (request.authUser) {
                await customer.findAll({  
                    attributes: [
                        'id',
                        'firstname', 
                        'lastname', 
                        'email',
                        'phone'
                    ]
                }).then(function (data) {
                    response.status(200).send({
                        data: data,
                        status: 'success',
                        message: 'Customers have been retrived successfuly!'
                    })
                });
            }   
        } catch (error) { 
            response.status(400).send({
                status: 'error',
                message: 'An Error Occured try, again later.'
            })
        }
    },

    async verifyCustomer (request, response) {
        try {
            if (request.authUser) {
                await customer.findOne({
                    where: {
                        id: request.params.id
                    },
                    attributes: [
                        'firstname',
                        'lastname',
                        'email',
                        'phone'
                    ]
                })
                .then((data) => {
                    response.status(200).send({
                        data: data,
                        status: 'success',
                        message: 'Customer has been verified successfully!'
                    });
                })
            }
        } catch (error) { console.log(error);
            return response.status(400).send({
                status: 'error',
                message: 'An Error Occured, try again later'
            });
        }
    },

    async processPayment (request, response) {
        try {
            if (request.authUser) {
                const customerData = await customer.findOne({
                    where: {
                        id: request.body.customer,
                        pin: request.body.pin
                    }
                });

                if (!customerData) {
                    return response.status(401).send({
                        status: 'error',
                        message: 'Incorrect transaction Pin!'
                    });
                }

                let reference = await uniqueNumber();

                await transaction.create({
                    userId: request.authUser.id,
                    customerId: request.body.customer,
                    reference: reference,
                    amount: request.body.amount,
                    type: 'credit',
                    description: `You processed a payment of ${request.body.amount}`,
                    status: 'success'
                })
                return response.status(200).send({
                    status: 'success',
                    message: 'Transaction has been processed successfully!'
                });
            }
        } catch (error) { console.log(error);
            return response.status(400).send({
                status: 'error',
                message: 'An Error Occured, try again later!'
            });
        }
    },

    async fetchTransactions (request, response) {
        try {
            if (request.authUser) {
                await transaction.findAll({  
                    attributes: [
                        'id',
                        'reference', 
                        'amount', 
                        'type',
                        'description',
                        'status',
                        'createdAt'
                    ],
                    include: [
                    {
                        model: customer,
                        attributes: [
                            'firstname',
                            'lastname'
                        ],
                        required: true
                    }]
                }).then(function (data) {
                    response.status(200).send({
                        data: data,
                        status: 'success',
                        message: 'Transactions retrived successfuly!'
                    })
                });
            }   
        } catch (error) { console.log(error);
            response.status(400).send({
                status: 'error',
                message: 'An Error Occured try, again later.'
            })
        }
    }
}



