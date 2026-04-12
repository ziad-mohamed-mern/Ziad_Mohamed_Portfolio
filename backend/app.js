const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Routes
const userRoutes = require("./routes/user.routes.js");
const skillRoutes = require("./routes/skill.routes.js");
const aboutRoutes = require("./routes/about.routes.js");
const productRoutes = require("./routes/product.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const analyticsRoutes = require("./routes/analytics.routes.js");

// Swagger
const swaggerSpec = require("./swagger");

const app = express();

// 1. Manual CORS Middleware (More robust than the 'cors' package for some environments)
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://ziad-mohamed-alsayed.vercel.app",
    "https://intern-intelligence-portfolio-eosin.vercel.app",
    "https://intern-intelligence-portfolio-ntav.vercel.app"
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin) || !origin) {
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With, Cache-Control, Pragma');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Handle Preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// 2. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Configuration
app.get("/api-docs.json", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(swaggerSpec);
});

app.get("/api-docs", (req, res) => {
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>InternIntelligence API Docs</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.10.5/swagger-ui.css"></head><body><div id="swagger-ui"></div><script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.10.5/swagger-ui-bundle.js"></script><script>window.onload = function() { SwaggerUIBundle({ url: "/api-docs.json", dom_id: '#swagger-ui', deepLinking: true, presets: [ SwaggerUIBundle.presets.apis ], layout: "BaseLayout" }); };</script></body></html>`;
    res.send(html);
});

// API Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/skill', skillRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// 404 Not Found Handler (Helpful for debugging)
app.use((req, res) => {
    console.log(`404 - Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});

module.exports = app;
