import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
const PORT =  process.env.PORT || 10000;

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Get all products
app.get('/products', async (req, res) => {
  console.log('Received request for /products');
  try {
    const products = await Product.find();
    console.log('Products found:', products);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: err.message });
  }
});

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './client/build')));

// Handle any other requests that aren't handled by the API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
