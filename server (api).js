const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/process-payment', (req, res) => {
    const { paymentData } = req.body;
    // Simulate transaction approval
    const response = {
        status: "APPROVED",
        transactionId: "TXN_" + Math.random().toString(36).substr(2, 9),
        message: "Transaction approved successfully",
        timestamp: new Date().toISOString()
    };
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});