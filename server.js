import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
const distPath = path.join(__dirname, 'dist');
console.log('Serving static files from:', distPath);
app.use(express.static(distPath));

// ... (rest of the server code remains the same)

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  console.log('Attempting to serve:', indexPath);
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Current directory:', __dirname);
  console.log('Contents of current directory:', fs.readdirSync(__dirname));
  console.log('Contents of dist directory:', fs.readdirSync(path.join(__dirname, 'dist')));
});