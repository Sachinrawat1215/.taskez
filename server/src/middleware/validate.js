const jwt = require('jsonwebtoken');
const authSchema = require('../Schema/authSchema');
// const cookieParser = require('cookie-parser');

// app.use(cookieParser());

const validate = async (request, response, next) => {
    try {
        const tokenObj = request.headers.cookie;
        // console.log(tokenObj);
        if (tokenObj === undefined) {
            // return undefined;
            // 
            response.sendStatus(500);
            return;
        }

        const token = tokenObj.substr(10, tokenObj.length);

        const verifyToken = jwt.verify(token, 'secret123');
        // console.log(verifyToken);
        const rootUser = await authSchema.findOne({ _id: verifyToken._id, 'tokens.token': token });

        if (!rootUser) {
            response.sendStatus(500);
            throw new Error('user not found');
        }
        // console.log(rootUser);

        request.token = token;
        request.rootUser = rootUser;
        request.userId = rootUser._id;

        next();
    } catch (error) {
        console.log("failed to run validate", error);
    }
};

module.exports = validate;