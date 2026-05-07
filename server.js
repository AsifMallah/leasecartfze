import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve the single HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Order Submission API
app.post("/api/order", (req, res) => {
  const order = req.body;
  
  console.log("\n>>> NEW ORDER RECEIVED <<<");
  console.log(`CUSTOMER: ${order.fullName}`);
  console.log(`EMAIL: ${order.email}`);
  console.log(`ADDRESS: ${order.address}`);
  console.log(`ITEMS: ${order.items.length}`);
  console.log(`TOTAL: $${order.total}`);
  console.log("---------------------------\n");

  res.json({ 
    success: true, 
    message: "Order received. Support will contact you shortly." 
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
