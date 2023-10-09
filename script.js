import express from 'express';
import axios from 'axios';
import ejs from 'ejs';
import path from 'path';

const app = express();
const port = 5010;

app.set('view engine', 'ejs');

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

// ... Existing server.js code ...

app.get('/generate-jokes', async (req, res) => {
  const { url } = req.query;

  try {
    const response = await axios.get(url);
    const jokes = response.data.jokes; // Assuming the API response has a 'jokes' field
    res.json({ jokes });
  } catch (error) {
    console.error('Error fetching jokes:', error.message);
    res.status(500).json({ error: 'Failed to fetch jokes' });
  }
});

// ... Rest of the server.js code ...


app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
