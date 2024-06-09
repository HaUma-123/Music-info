const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/fact', async (req, res) => {
    try {
        const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        const factData = response.data;
        res.json({
            fact: factData.text,
            source: factData.source
        });
    } catch (error) {
        console.error('Error fetching fact data:', error);
        res.status(500).send('Error fetching fact data');
    }
});

app.listen(port, () => {
    console.log(`Fact API server is running at http://localhost:${port}`);
});
