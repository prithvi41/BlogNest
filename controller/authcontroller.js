const http_status_code = require('../config/httpstatuscode')
const userModel = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('../config/jwtgenerator');

// login a user and generate JWT
async function loginUser(req, res) {
    try {
        const data = req.body;
        if(!data.username || !data.password) {
            return res.status(http_status_code.BAD_REQUEST).send("missing required fields");
        }
        const userDetails = await userModel.getUserByName(data.username);
        if(userDetails.rows.length === 0) {
            return res.status(http_status_code.UNAUTHORIZED).send("user not registered");
        }
        const passwordMatch = await bcrypt.compare(data.password, userDetails.rows[0].password);
        if(!passwordMatch) {
            return res.status(http_status_code.BAD_REQUEST).send("wrong password");
        }
        const token = await jwt.jwtGenerator(data.username, userDetails.rows[0].id);
        return res.status(http_status_code.OK).send({Token : token });
    }
    catch(err) {
        console.log(err);
        return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
    }
}


// register user
async function registerUser(req, res) {
    try {
        const data = req.body;
        if(!data.email || !data.username || !data.password) {
            return res.status(http_status_code.BAD_REQUEST).send("Missing required fields");
        }
        try {
            validate(data.email, data.password);
        }
        catch(err) {
            return res.status(http_status_code.BAD_REQUEST).send(err.message);
        }
        const userExist = await userModel.getUserByName(data.username);
        if(userExist && userExist.rows.length > 0) {
            return res.status(http_status_code.BAD_REQUEST).send("user already exist");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPasssword = await bcrypt.hash(data.password, salt);
        data.password = hashedPasssword;
        const result = await userModel.createUser(data);
        return res.status(http_status_code.CREATED).send("User registered successfully");
    }
    catch(err) {
        console.log(err);
        return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("Unexpected server error");
    }
}

// validation on email and password
function validate(email, password) {
    if(password.length < 8) {
        throw new Error("min length of password 8 is required");
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        throw new Error("Invalid email format");
    }
}

module.exports = { registerUser, loginUser }; 