const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
const PORT = process.env.PORT;
app.get('/api/symbols', (req, res) => {
  res.json(["INR", "USD", "EUR", "GBP", "JPY", "AUD"]);
});

// https://v6.exchangerate-api.com/v6/3c52ffb8a615a548a61c530e/latest/USD


app.get('/api/rate', async (req, res) => {
    const { from, to } = req.query;
  
    if (!from || !to) {
      return res.status(400).json({ error: 'Missing query parameters' });
    }
  
    try {
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${from}`;
      const response = await axios.get(url);
      const rate = response.data.conversion_rates[to];
  
      if (!rate) {
        throw new Error(`Invalid 'to' currency: ${to}`);
      }
  
      res.json({
        rate,
        from,
        to,
        asOf: response.data.time_last_update_utc.split(' ')[0]
      });
    } catch (error) {
      console.error('Error fetching:', error.message);
      res.status(502).json({ error: 'Failed to fetch exchange raate' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
