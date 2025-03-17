const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (CSS, JS, images)
app.use(express.static('.'));
app.use(express.static(path.join(__dirname, 'public/views')));

// Define routes to serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'about.html'));
});

app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'portfolio.html'));
});

app.get('/team', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'team.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view', 'contact.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
