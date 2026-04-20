# CI/CD Demo App

A Node.js + Express app with a complete CI/CD pipeline using GitHub Actions and Render.com — deployed automatically on every push to main.

## Pipeline flow

```
git push → GitHub Actions → Run tests → Deploy to Render → Live URL
```

## Project structure

```
cicd-demo/
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD pipeline
├── src/
│   ├── index.js             # Express app
│   └── index.test.js        # Jest tests
├── package.json
├── .gitignore
└── README.md
```

## Local setup

```bash
# Install dependencies
npm install

# Run locally
npm start

# Run in dev mode (auto-restart on changes)
npm run dev

# Run tests
npm test
```

Visit http://localhost:3000

## API endpoints

| Endpoint     | Description                    |
|--------------|-------------------------------|
| `GET /`      | Homepage (HTML)               |
| `GET /health`| Health check (JSON)           |
| `GET /api/info` | App info (JSON)            |

## Setting up the pipeline

### Step 1 — Render.com
1. Sign up at render.com (free)
2. New → Web Service → connect your GitHub repo
3. Build command: `npm install`
4. Start command: `node src/index.js`
5. Copy your **Service ID** from the service URL
6. Go to Account Settings → API Keys → create one

### Step 2 — GitHub Secrets
In your GitHub repo → Settings → Secrets and variables → Actions → New repository secret:

| Secret name         | Value                        |
|---------------------|------------------------------|
| `RENDER_API_KEY`    | Your Render API key          |
| `RENDER_SERVICE_ID` | Your Render service ID       |

### Step 3 — Push and watch it go
```bash
git add .
git commit -m "initial commit"
git push origin main
```

Go to GitHub → Actions tab to watch the pipeline run.

## Tech stack

- **Runtime**: Node.js 20
- **Framework**: Express
- **Testing**: Jest + Supertest
- **CI/CD**: GitHub Actions
- **Hosting**: Render.com (free tier)
