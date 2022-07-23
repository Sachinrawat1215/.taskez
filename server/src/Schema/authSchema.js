const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ]
});

// authSchema.methods.generateAuthToken = async function () {
//     try {
//         console.log("token");
//         let token = jwt.sign({ _id: this._id, email: this.email }, 'secret123');
//         this.tokens = this.tokens.concat({token: token});
//         await this.save();
//         return token;
//     } catch (error) {
//         console.log('Failed to generate token', error);
//     }
// };

const authdb = mongoose.model('authdb', authSchema);

module.exports = authdb;