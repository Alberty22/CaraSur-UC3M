require('dotenv').config();
const { encrypt } = require('../utils/securityUtils');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const priceId = 'price_1Pnq4jRqf3jpQcoe8uoTSSDR';
const { addDataRedis } = require('./redisService');
const { v4: uuidv4 } = require('uuid');

const generateUniqueSessionId = () => {
    return 'sess_' + uuidv4();
};

const createCheckout = async(userData) => {
    const {email, password, newUser} = userData
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
            success_url: 'http://localhost:5000/es/#success',
            cancel_url: 'http://localhost:5000/es/#failed',
            metadata: { session_id: sessionId }
        })
        return session.url
    }
    catch (error) {
        console.log(error)
        return
    }
    
}

module.exports = { createCheckout };