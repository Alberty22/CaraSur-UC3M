const { renewCheckout } = require('../../services/paymentService')

exports.renewUser = async (req, res) => {
    try {
        const data = req.body
        
        const url = await renewCheckout(data);
        if(!url) {
            return res.status(404).json({ error: 'Error at checkout' });
        }
        
        res.status(201).json({ success: true, message: url });
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }