import axios from 'axios';
const URL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const registerUser = async (data) => {
    try {
        const res = await axios.post(`${URL}/api/signup`, data);
        return res.data;
    } catch (error) {
        console.log(`Failed to register user reason ${error}`);
    }
};

const loginUser = async (data) => {
    try {
        const res = await axios.post(`${URL}/api/login`, data);
        return res.data;
    } catch (error) {
        console.log(`Failed to register user reason ${error}`);
    }
};

export { registerUser, loginUser };