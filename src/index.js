const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>CI/CD Demo App</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          color: #1a1a1a;
        }
        .card {
          background: #fff;
          border-radius: 12px;
          padding: 2.5rem 3rem;
          max-width: 480px;
          width: 90%;
          border: 1px solid #e5e5e5;
        }
        .badge {
          display: inline-block;
          background: #dcfce7;
          color: #166534;
          font-size: 12px;
          font-weight: 500;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 1.5rem;
        }
        h1 { font-size: 22px; font-weight: 600; margin-bottom: 0.5rem; }
        p  { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 1.25rem; }
        .meta { border-top: 1px solid #f0f0f0; padding-top: 1.25rem; margin-top: 0.5rem; }
        .meta-row { display: flex; justify-content: space-between; font-size: 13px; padding: 5px 0; }
        .meta-label { color: #888; }
        .meta-value { color: #1a1a1a; font-weight: 500; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">Deployed via CI/CD</div>
        <h1>CI/CD Demo App</h1>
        <p>This app is automatically deployed on every push to the main branch using GitHub Actions and Render.com.</p>
        <div class="meta">
          <div class="meta-row">
            <span class="meta-label">Environment</span>
            <span class="meta-value">${process.env.NODE_ENV || 'development'}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Node version</span>
            <span class="meta-value">${process.version}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Deployed at</span>
            <span class="meta-value">${new Date().toUTCString()}</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'cicd-demo',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    node: process.version,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
