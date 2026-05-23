import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use(express.static(__dirname));

// Serve Main HTML File
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Order Submission API
app.post('/api/order', (req, res) => {

    const order = req.body;

    console.log('\n===================================');
    console.log('>>> NEW ORDER RECEIVED <<<');
    console.log('===================================');

    console.log(`CUSTOMER NAME : ${order.fullName}`);
    console.log(`EMAIL         : ${order.email}`);
    console.log(`PHONE         : ${order.phone}`);
    console.log(`ADDRESS       : ${order.address}`);
    console.log(`EMIRATES      : ${order.emirates || 'N/A'}`);
    console.log(`NOTES         : ${order.notes || 'N/A'}`);

    console.log('-----------------------------------');

    // Cart Items
    if (order.items && order.items.length > 0) {

        console.log('ORDER ITEMS:');

        order.items.forEach((item, index) => {
            console.log(
                `${index + 1}. ${item.name} | Qty: ${item.quantity} | Price: ${item.price} AED`
            );
        });

    } else {

        console.log('NO ITEMS FOUND');

    }

    console.log('-----------------------------------');

    // Total
    console.log(`TOTAL : ${order.total} AED`);

    console.log('===================================\n');

    // Success Response
    res.json({
        success: true,
        message: 'Order received successfully.'
    });

});

// Start Server
app.listen(PORT, '0.0.0.0', () => {

    console.log(`
========================================
LEASE CART FZE SERVER RUNNING
========================================
LOCAL:  http://localhost:${PORT}
STATUS: ACTIVE
========================================
`);

});
