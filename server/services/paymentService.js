require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const priceId = process.env.STRIPE_PRODUCT;
const { addDataRedis } = require('./redisService');
const { v4: uuidv4 } = require('uuid');

const generateUniqueSessionId = () => {
    return 'sess_' + uuidv4();
};

const createCheckout = async(userData) => {
    const {email, password, newUser} = userData;
    try {
        const sessionId = generateUniqueSessionId();
        await addDataRedis(sessionId, {email, password, newUser});

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            success_url: `${process.env.DOMAIN}/es/#success`,
            cancel_url: `${process.env.DOMAIN}/es/#failed`,
            metadata: { session_id: sessionId, type:'signup' }
        });
        return session.url;
    }
    catch (error) {
        return;
    }   
}

const renewCheckout = async(data) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            success_url: `${process.env.DOMAIN}/es/profile/#success`,
            cancel_url: `${process.env.DOMAIN}/es/profile/#failed`,
            metadata: {renew: JSON.stringify(data), type:'renew'}
        });
        return session.url;
    }
    catch (error) {
        return;
    }   
}

module.exports = { 
    createCheckout,
    renewCheckout
};