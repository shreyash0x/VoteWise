import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(helmet()); // Security
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
};
app.use(cors(corsOptions)); // CORS
app.use(compression()); // Performance
app.use(express.json()); // Parse JSON bodies

// Structured logging middleware suitable for cloud environments (like Google Cloud)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logEntry = {
      method: req.method,
      route: req.originalUrl,
      status: res.statusCode,
      duration: duration,
      timestamp: new Date().toISOString(),
      userAgent: req.get('user-agent') || 'unknown'
    };
    // In a real cloud environment, you might log this to a file or stream
    console.log(JSON.stringify(logEntry));
  });
  next();
});

// API endpoint for testing valid flows and invalid input
app.post('/api/evaluate', (req, res) => {
  const { input } = req.body;

  if (input === undefined || input === null) {
    return res.status(400).json({ error: 'Input is required' });
  }

  if (typeof input !== 'string') {
    return res.status(400).json({ error: 'Input must be a string' });
  }

  if (input.length === 0) {
    return res.status(400).json({ error: 'Input cannot be empty' });
  }

  if (input.length > 1000) {
    return res.status(400).json({ error: 'Input is too large' });
  }

  res.status(200).json({ success: true, message: 'Valid input', data: input });
});

app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Security: Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Serve static frontend files if in production (assuming Vite builds to dist)
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res, next) => {
  // Prevent catching API routes and static asset requests that weren't found
  if (req.path.startsWith('/api/') || req.path.startsWith('/assets/')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Global error handling middleware
app.use((err, req, res, _next) => {
  const logEntry = {
    level: 'ERROR',
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString()
  };
  console.error(JSON.stringify(logEntry));
  res.status(500).json({ error: 'Internal Server Error' });
});

// Ensure usage of process.env.PORT, defaulting to 8080 for Cloud Run
const PORT = process.env.PORT || 8080;

// Export app for testing purposes, but only listen if run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(JSON.stringify({
      level: 'INFO',
      message: `Server is listening on port ${PORT}`,
      port: PORT,
      env: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    }));
  });
}

export default app;
