const jwt = require('jsonwebtoken');
const config = require('../config');
const { 
    user, 
    wallet, 
    userWallet, 
    developer, 
    balance, 
    admin,
    preference 
} = require('../../models');

module.exports = {
    
    authenticateUserToken (request, response, next) {
        try {
            const bearerHeader = request.headers.authorization;
            if ( bearerHeader ) {
                const token = bearerHeader.split(' ')[1];
                jwt.verify(token, config.SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 },  (err, decoded) => {
                    if (decoded) {
                        user.findOne({
                            where: {
                                id: decoded.id
                            },
                            attributes: [
                                'id', 
                                'firstname', 
                                'lastname',
                                'email',
                                'phone'
                            ]
                        }).then(function (userData) {
                            request.authUser = userData;
                            next();
                        });
                    } else if (err.message === 'jwt expired') {
                        return response.status(403).send({
                            error: true,
                            message: "Access token expired!"
                        });
                    } else {
                        return response.status(403).send({
                            error: true,
                            message: "Unauthorized!"
                        });
                    }
                });
            }   else {
                return response.status(403).send({
                    message: "No token provided!"
                });
            };
        } catch (error) { 
            return response.status(400).send({
                status: 'error',
                message: 'An Error Occured, try again later'
            })
        }
    }, 
}



