require('dotenv').config();

const { updloadUserFirebase } = require('../../utils/firebase/firebasePostUtils');
const { updatePayDate } = require('../../utils/firebase/firebaseUpdateUtils')
const { sendUsersToAll } = require('../sse/usersHandler');
const { sendWelcomeEmail } = require('../../utils/emailsUtils');
const { getDataByIdRedis, deleteDataByIdRedis } = require('../../services/redisService');

const { auth } = require('../../services/firebaseAdmin');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.confirmCheckout = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    const payload = req.body;

    let event;

    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_CHECKOUT);
    try {
        
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            handleCheckoutSessionCompleted(checkoutSessionCompleted);

            break;
        default:
            break;
    }

  res.send();
}

const handleCheckoutSessionCompleted = async (session) => {
    const metadata = session.metadata || {};
    if (metadata.type === 'signup') {
            const sessionId = session.metadata.session_id;
            const data = await getDataByIdRedis(sessionId)
            await deleteDataByIdRedis(sessionId)
            
            if (!data) {
                console.error('No data found for sessionId:', sessionId);
                return res.status(404).json({ received: false });
            }

            const { email, password, newUser } = data;
            
            const userRecord = await auth.createUser({
                email: email,
                password: password,
                })

            const status = await updloadUserFirebase("users", email, newUser);
    
            if(!status) {
            return res.status(404).json({ error: 'Error uploading data' })
            }

            sendUsersToAll('get');

            sendWelcomeEmail(email);
    } 
    else if (metadata.type === 'renew') {
        const data = session.metadata.renew;
            
        if (!data) {
            console.error('No data found for sessionId:', sessionId);
            return res.status(404).json({ received: false });
        }
        
        const { email, pay, expirationDate } = JSON.parse(data);
        await updatePayDate(email, {pay: pay, expirationDate: expirationDate});
      
    }
  }