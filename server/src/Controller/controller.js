const authSchema = require('../Schema/authSchema');
const cardSchema = require('../Schema/cardSchema');

const getUserData = async (request, response) => {
    try {
        const user = await authSchema.findOne({ email: request.params.email });
        if (!user) {
            response.sendStatus(500);
            throw new Error('user not found');
        }
        response.status(200).send({ name: user.name, image: user.image, email: user.email });
    } catch (error) {
        response.status(500).send(error);
    }
}

const saveCardData = async (request, response) => {
    try {
        const cardData = await request.body;
        const data = await new cardSchema(cardData);
        await data.save();
        response.status(200).send({status: true, message: 'Card data saved successfully'});
    } catch (error) {
        response.status(500).send(error);
    }
};

const getAllCards = async (request, response) => {
    try {
        const data = await cardSchema.find({});
        response.status(200).send(data);
    } catch (error) {
        response.status(500).send(error);
    }
};

const updateCard = async (request, response) => {
    try {
        const id = request.body.id;
        const status = request.body.status;
        const data = await cardSchema.findByIdAndUpdate(id, {status: status});
        await data.save();
        response.status(200).send({status: true, message: 'Card data updated successfully'});
    } catch (error) {
        response.status(500).send(error);
    }
};

module.exports = { getUserData, saveCardData, getAllCards, updateCard };