const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



// Function to hash a password
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // Generate a salt with a cost factor of 12
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }

            // Hash the password using the generated salt
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

// Function to compare a plain password with a hashed password
const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};

// Export the functions for use in other files
module.exports = {
    hashPassword,
    comparePassword
};


