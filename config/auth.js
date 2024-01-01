const jwt = require('jsonwebtoken');
const adminSchema = require('../models/user');


//middleware for seller secured routes and seller claims
exports.isSeller = function (req, res, next) {
    // Check for JWT token
    let token = req.headers.authorization;
    let parts = "";
    // Split the authorizationHeader string by space
    if (token)
        parts = token.split(' ');

    // Check if the parts array has two elements and the first element is 'Bearer'
    if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1]; // Extract the token (the second part)
        console.log('JWT Token:', token);
    } else {
        console.log('Invalid Authorization Header');
    }
    if (token) {
        // Verify the JWT token
        jwt.verify(token, 'your-secret-key', (err, decoded) => {
            if (err) {
                console.log(" error" + err);
                return res.status(401).json({ code: 401, status: false, message: 'JWT authentication failed' });
            } else {
                // JWT token is valid, you can access the decoded user information
                // Use Mongoose's findById with Promises
                adminSchema.findById(decoded.userId)
                    .then(user => {
                        if (!user) {
                            // User not found, handle this case accordingly
                            return res.status(404).json({ error: 'User not found' });
                        }
                        if (user.role !== "seller") {
                            return res.status(404).json({ error: 'User is not a seller and hence not authorised to perform action' });
                        }
                        // User found, store the user data in req.user
                        req.user = user;

                        // Continue with your middleware or route handler logic
                        // ...
                        next();
                    })
                    .catch(err => {
                        // Handle any errors that occur during the query
                        console.error(err);
                        return res.status(500).json({ error: 'Internal server error' });
                    });
            }
        });
    } else {
        return res.status(404).send({ code: 404, status: false, message: "user is not authorised, redirect to login page" });
    }
}


//middleware for admin secured routes and admin claims
exports.isAdmin = function (req, res, next) {
    // Check for JWT token
    let token = req.headers.authorization;
    let parts = "";
    // Split the authorizationHeader string by space
    if (token)
        parts = token.split(' ');

    // Check if the parts array has two elements and the first element is 'Bearer'
    if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1]; // Extract the token (the second part)
        console.log('JWT Token:', token);
    } else {
        console.log('Invalid Authorization Header');
    }
    if (token) {
        // Verify the JWT token
        jwt.verify(token, 'your-secret-key', (err, decoded) => {
            if (err) {
                console.log(" error" + err);
                return res.status(401).json({ code: 401, status: false, message: 'JWT authentication failed' });
            } else {
                // JWT token is valid, you can access the decoded user information
                // Use Mongoose's findById with Promises
                adminSchema.findById(decoded.userId)
                    .then(user => {
                        if (!user) {
                            // User not found, handle this case accordingly
                            return res.status(404).json({ error: 'User not found' });
                        }
                        if (user.role !== "admin") {
                            return res.status(404).json({ error: 'User is not an admin and hence not authorised to perform action' });
                        }
                        // User found, store the user data in req.user
                        req.user = user;

                        // Continue with your middleware or route handler logic
                        // ...
                        next();
                    })
                    .catch(err => {
                        // Handle any errors that occur during the query
                        console.error(err);
                        return res.status(500).json({ error: 'Internal server error' });
                    });
            }
        });
    } else {
        return res.status(404).send({ code: 404, status: false, message: "user is not authorised, redirect to login page" });
    }
}


//middleware for buyer secured routes and buyer claims
exports.isBuyer = function (req, res, next) {
    // Check for JWT token
    let token = req.headers.authorization;
    let parts = "";
    // Split the authorizationHeader string by space
    if (token)
        parts = token.split(' ');

    // Check if the parts array has two elements and the first element is 'Bearer'
    if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1]; // Extract the token (the second part)
        console.log('JWT Token:', token);
    } else {
        console.log('Invalid Authorization Header');
    }
    if (token) {
        // Verify the JWT token
        jwt.verify(token, 'your-secret-key', (err, decoded) => {
            if (err) {
                console.log(" error" + err);
                return res.status(401).json({ code: 401, status: false, message: 'JWT authentication failed' });
            } else {
                // JWT token is valid, you can access the decoded user information
                // Use Mongoose's findById with Promises
                adminSchema.findById(decoded.userId)
                    .then(user => {
                        if (!user) {
                            // User not found, handle this case accordingly
                            return res.status(404).json({ error: 'User not found' });
                        }
                        if (user.role !== "buyer") {
                            return res.status(404).json({ error: 'User is not a buyer and hence not authorised to perform action' });
                        }
                        // User found, store the user data in req.user
                        req.user = user;

                        // Continue with your middleware or route handler logic
                        // ...
                        next();
                    })
                    .catch(err => {
                        // Handle any errors that occur during the query
                        console.error(err);
                        return res.status(500).json({ error: 'Internal server error' });
                    });
            }
        });
    } else {
        return res.status(404).send({ code: 404, status: false, message: "user is not authorised, redirect to login page" });
    }
}









//middleware for admin or buyer secured routes and claims
exports.isAdminORBuyer = function (req, res, next) {
    // Check for JWT token
    let token = req.headers.authorization;
    let parts = "";
    // Split the authorizationHeader string by space
    if (token)
        parts = token.split(' ');

    // Check if the parts array has two elements and the first element is 'Bearer'
    if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1]; // Extract the token (the second part)
        console.log('JWT Token:', token);
    } else {
        console.log('Invalid Authorization Header');
    }
    if (token) {
        // Verify the JWT token
        jwt.verify(token, 'your-secret-key', (err, decoded) => {
            if (err) {
                console.log(" error" + err);
                return res.status(401).json({ code: 401, status: false, message: 'JWT authentication failed' });
            } else {
                // JWT token is valid, you can access the decoded user information
                // Use Mongoose's findById with Promises
                adminSchema.findById(decoded.userId)
                    .then(user => {
                        if (!user) {
                            // User not found, handle this case accordingly
                            return res.status(404).json({ error: 'User not found' });
                        }
                        if (user.role == "seller") {
                            return res.status(404).json({ error: 'User is nor a buyer  neither admin and hence not authorised to perform action' });
                        }
                        // User found, store the user data in req.user
                        req.user = user;

                        // Continue with your middleware or route handler logic
                        // ...
                        next();
                    })
                    .catch(err => {
                        // Handle any errors that occur during the query
                        console.error(err);
                        return res.status(500).json({ error: 'Internal server error' });
                    });
            }
        });
    } else {
        return res.status(404).send({ code: 404, status: false, message: "user is not authorised, redirect to login page" });
    }
}
