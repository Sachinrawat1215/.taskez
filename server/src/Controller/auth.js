const express = require('express');
const app = express();
const authdb = require('../Schema/authSchema');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

const registerUser = async (request, response) => {
    try {
        const checkEmail = await authdb.find({ email: request.body.email });
        if (checkEmail.length !== 0) {
            response.status(200).json({ status: false, message: 'already registered' });
        } else {
            const name = request.body.name;
            const image = request.body.image;
            const email = request.body.email;
            let password = request.body.password;
            password = await bcrypt.hash(password, 10)

            const data = await new authdb({ name, image, email, password });
            data.save();

            response.status(200).json({ status: true, message: 'email registered' });
        }
    } catch (error) {
        response.status(500).json({ error });
    }
};

const loginUser = async (request, response) => {
    try {
        const checkEmail = await authdb.find({ email: request.body.email });
        const checkPassword = await bcrypt.compare(request.body.password, checkEmail[0].password);

        if (checkEmail.length === 0) {
            response.status(200).json({ status: false, message: 'email not registered' });
        } else {
            if (checkPassword) {
                // Genuine Case
                let token = jwt.sign({ _id: checkEmail[0]._id, email: checkEmail[0].email }, 'secret123');
               checkEmail[0].tokens = checkEmail[0].tokens.concat({ token: token });
                await checkEmail[0].save();

                response.cookie("authtoken", token, {
                    expires: new Date(Date.now() + 2592000000),
                    httpOnly: true,
                });

                response.status(200).json({ status: true, message: 'password matched' });
            } else {
                response.status(200).json({ status: false, message: 'password not matched' });
            }
        }

    } catch (error) {
        response.status(500).json({ error });
    }
};

module.exports = { registerUser, loginUser };