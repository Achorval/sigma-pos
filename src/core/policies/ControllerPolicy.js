const Joi = require('joi')

module.exports = {
    register (request, response, next) {
        const schema = {
            firstname: Joi.string(),
            lastname: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string(),
            phone: Joi.string(),
            referral: Joi.string().allow(''),
        }
        const {error, value} = Joi.validate(request.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'firstname':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Firstname is required'
                    })
                    break
                case 'lastname':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Lastname is required'
                    })
                    break     
                case 'email':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Email is required'
                    })
                    break   
                case 'password':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Password is required'
                    })
                    break
                case 'phone':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Phone is required'
                    })
                    break 
                default:    
                    return response.status(400).send({
                        message: 'Invalid User registration information'
                    })
            }
        }   else {
            next()
        }
    },

    login (request, response, next) {
        const schema = {
            username: Joi.string(),
            password: Joi.string()
        }
        const {error, value} = Joi.validate(request.body, schema)

        if (error) {
            switch (error.details[0].context.key) {  
                case 'username':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Username or email is required'
                    })
                    break
                case 'password':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Password is required'
                    })
                    break
                default:    
                    return response.status(400).send({
                        message: 'Invalid user information, try again later!'
                    })
            }
        }   else {
            next()
        }
    },

    forgotPassword (request, response, next) {
        const schema = {
            email: Joi.string().email()
        }
        const {error, value} = Joi.validate(request.body, schema)

        if (error) {
            switch (error.details[0].context.key) {  
                case 'email':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Email is required'
                    })
                    break
                default:    
                    return response.status(400).send({
                        message: 'Invalid user information, try again later!'
                    })
            }
        }   else {
            next()
        }
    },

    forgotPasswordReset (request, response, next) {
        const schema = {
            token: Joi.string(),
            password: Joi.string(),
            confirmPassword: Joi.string()
        }
        const {error, value} = Joi.validate(request.body, schema)

        if (error) {
            switch (error.details[0].context.key) {  
                case 'token':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Token is required'
                    })
                    break
                case 'password':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Password is required'
                    })
                    break
                case 'confirmPassword':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Confirm Password is required'
                    })
                    break
                default:    
                    return response.status(400).send({
                        message: 'An Error Occured, try again later!'
                    })
            }
        }   else {
            next()
        }
    },

    paymentPolicy (request, response, next) {
        const schema = {
            amount: Joi.number(),
            pin: Joi.number(),
            customer: Joi.string()
        }
        const {error, value} = Joi.validate(request.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'amount':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Amount is required'
                    })
                    break 
                case 'pin':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Pin is required'
                    })
                    break
                case 'customer':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Customer is required'
                    })
                    break
                default:    
                    return response.status(400).send({
                        error: 'Invalid data information!'
                    })
            }
        }   else {
            next()
        }
    },

    buyAirtime (request, response, next) {
        const schema = {
            network: Joi.string(),
            phone: Joi.string(),
            amount: Joi.number()
        }
        const {error, value} = Joi.validate(request.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'network':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Network Provider is required'
                    })
                    break
                case 'phone':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Phone Number is required'
                    })
                    break      
                case 'amount':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Amount is required'
                    })
                    break
                default:   
                    return response.status(400).send({
                        message: '12An Error Occured, try again later!'
                    })
            }
        }   else {
            next()
        }
    },

    buyData (request, response, next) {
        const schema = {
            network: Joi.string(),
            plan: Joi.string(),
            phone: Joi.string()
        }
        const {error, value} = Joi.validate(request.body, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'network':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Network Provider is required'
                    })
                    break
                case 'plan':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Plan is required'
                    })
                    break      
                case 'phone':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Phone Number is required'
                    })
                    break 
                default:    
                    return response.status(400).send({
                        message: 'An Error Occured, try again later!'
                    })
            }
        }   else {
            next()
        }
    },
    
    productPolicy (request, response, next) {
        const schema = {
            category: Joi.string(),
            name: Joi.string(),
            code: Joi.strict(),
            description: Joi.string(),
            unitInStock: Joi.number(),
            unitPrice: Joi.number(),
            discount: Joi.number()
        }
        const {error, value} = Joi.validate(request.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'category':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Category is required'
                    })
                    break
                case 'name':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Name is required'
                    })
                    break
                case 'code':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Code Category is required'
                    });
                    break
                case 'description':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Description is required'
                    })
                    break     
                case 'unitInStock':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Unit In Stock is required'
                    })
                    break
                case 'unitPrice':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Unit Price is required'
                    });
                    break 
                case 'discount':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Discount is required'
                    });
                    break 
                default:
                    return response.status(400).send({
                        status: 'error',
                        message: 'Invalid data information!'
                    }); 
            }
        }   else {
            next()
        }
    }, 

    smartCardPolicy (request, response, next) {
        const schema = {
            smartCard: Joi.string(),
            cable: Joi.string()
        }
        const {error, value} = Joi.validate(request.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'smartCard':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Smart Card Number is required'
                    })
                    break 
                case 'cable':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Cable biller is required'
                    })
                    break
                default:    
                    return response.status(400).send({
                        error: 'Invalid data information!'
                    })
            }
        }   else {
            next()
        }
    },

    validateMeterPolicy (request, response, next) {
        const schema = {
            meterNumber: Joi.number(),
            disco: Joi.string(),
            vendType: Joi.string()
        }
        const {error, value} = Joi.validate(request.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'meterNumber':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Meter Number is required'
                    })
                    break 
                case 'disco':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Disco Name is required'
                    })
                    break
                case 'vendType':
                    return response.status(400).send({
                        status: 'error',
                        message: 'vend Type is required'
                    })
                    break
                default:    
                    return response.status(400).send({
                        error: 'Invalid data information!'
                    })
            }
        }   else {
            next()
        }
    },

    buyElectricityPolicy (request, response, next) {
        const schema = {
            walletId: Joi.string(),
            meterNumber: Joi.string(),
            disco: Joi.string(),
            amount: Joi.string(),
            phone: Joi.string(),
            vendType: Joi.string(),
            billerId: Joi.number().allow('')
        }
        const {error, value} = Joi.validate(request.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'walletId':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Wallet is required'
                    })
                    break 
                case 'meterNumber':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Meter Number is required'
                    })
                    break 
                case 'disco':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Disco Name is required'
                    })
                    break   
                case 'amount':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Amount is required'
                    })  
                    break    
                case 'phone':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Phone Number is required'
                    }) 
                    break
                case 'vendType':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Vend Type is required'
                    }) 
                    break
                default:  
                    return response.status(400).send({
                        message: 'Invalid data information!'
                    })
            }
        }   else {
            next()
        }
    },

    updateProfile (request, response, next) {
        const schema = {
            firstname: Joi.string(), 
            lastname: Joi.string()
        }
        
        const {error, value} = Joi.validate({
            firstname: request.body.firstname,
            lastname: request.body.lastname
          }, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'firstname':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Firstname is required'
                    })
                    break
                case 'lastname':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Lastname is required'
                    })
                    break  
                default: 
                    return response.status(400).send({
                        message: 'An Error Occured, try again later!'
                    })
            }
        }   else {
            next()
        }
    },

    changePassword (request, response, next) {
        const schema = {
            currentPassword: Joi.string(),
            newPassword: Joi.string()
        }
        const {error, value} = Joi.validate(request.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'currentPassword':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Current Password is required'
                    })
                    break
                case 'newPassword':
                    return response.status(400).send({
                        status: 'error',
                        message: 'New Password is required'
                    })
                    break
                default:    
                    return response.status(400).send({
                        message: 'An Error Occured, try again later!'
                    })
            }
        }   else {
            next()
        }
    },

    bankDetailPolicy (request, response, next) {
        const schema = {
            id: Joi.number(),
            bankName: Joi.string(),
            bankCode: Joi.string(),
            accountNumber: Joi.number(),
            accountName: Joi.string()
        }
        const {error, value} = Joi.validate(request.body, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'bankName':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Bank Name is required'
                    })
                    break
                case 'bankCode':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Bank Code Number is required'
                    })
                    break 
                case 'accountNumber':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Account Number is required'
                    })
                    break 
                case 'accountName':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Account Name is required'
                    })
                    break  
                default:    
                    return response.status(400).send({
                        message: 'An Error Occured, try again later!'
                    })
            }
        }   else {
            next()
        }
    },

    verifyAddressPolicy (request, response, next) {
        const schema = {
            coin: Joi.string(),
            address: Joi.string()
        }
        const {error, value} = Joi.validate({
            coin: request.body.coin,
            address: request.body.address
        }, schema);

        if (error) { 
            switch (error.details[0].context.key) {
                case 'coin':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Coin is required'
                    })
                    break 
                case 'address':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Address is required'
                    })
                    break  
                default:    
                    return response.status(400).send({
                        message: 'An Error Occured, try again later!'
                    })
            }
        }   else {
            next()
        }
    },

    sendCoinPolicy (request, response, next) {
        const schema = {
            amount: Joi.number(),
            coin: Joi.string(),
            address: Joi.string()
        }
        const {error, value} = Joi.validate({
            amount: request.body.amount,
            coin: request.body.coin,
            address: request.body.address
        }, schema);

        if (error) { 
            switch (error.details[0].context.key) {
                case 'amount':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Amount is required'
                    })
                    break
                case 'coin':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Coin is required'
                    })
                    break 
                case 'address':
                    return response.status(400).send({
                        status: 'error',
                        message: 'Address is required'
                    })
                    break  
                default:    
                    return response.status(400).send({
                        message: 'An Error Occured, try again later!'
                    })
            }
        }   else {
            next()
        }
    },
}

