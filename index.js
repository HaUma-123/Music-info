const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5000;

app.get('/musicinfo', async (req, res) => {
  const query = req.query.term || '';

  if (!query) {
    return res.status(400).json({ error: 'Term parameter is required' });
  }

  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=1&entity=song`);
    if (response.data.resultCount === 0) {
      return res.status(404).json({ error: 'No song found' });
    }

    return res.json(response.data.results[0]);
  } catch (err) {
    const errorMessage = err.response?.data?.error?.message || err.message || 'Unknown error occurred';
    return res.status(500).json({
      error: 'An error occurred: ' + errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
