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

const getUserData = async (email) => {
    try {
        const res = await axios.get(`${URL}/api/user/${email}`);
        return res.data;
    } catch (error) {
        console.log(`Failed to get user reason ${error}`);
    }
}

const saveCardData = async (data) => {
    try {
        const res = await axios.post(`${URL}/api/card`, data);
        return res.data;
    } catch (error) {
        console.log(`Failed to save card data reason ${error}`);
    }
}

const getAllCards = async () => {
    try {
        const res = await axios.get(`${URL}/api/cards`);
        return res.data;
    } catch (error) {
        console.log(`Failed to save card data reason ${error}`);
    }
}

const updateCard = async (data) => {
    try {
        console.log(data);
        const res = await axios.post(`${URL}/api/updatecard`, data);
        return res.data;
    } catch (error) {
        console.log(`Failed to save card data reason ${error}`);
    }
}

export { registerUser, loginUser, getUserData, saveCardData, getAllCards, updateCard };