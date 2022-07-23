const authdb = require('../Schema/authSchema');

const registerUser = async (request, response) => {
    try {
        const checkEmail = await authdb.find({ email: request.body.email });
        if (checkEmail.length !== 0) {
            response.status(200).json({ status: false, message: 'already registered' });
        } else {
            const data = new authdb(request.body);
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
        if(checkEmail.length === 0){
            response.status(200).json({ status: false, message: 'email not registered' });
        }
    } catch (error) {
        response.status(500).json({ error });
    }
};

module.exports = { registerUser, loginUser };