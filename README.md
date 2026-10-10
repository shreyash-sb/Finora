<div align="center">

  <img src="frontend/public/media/images/logo.svg" alt="Zerodha" width="180" />

  # Zerodha Clone

  **A modern full-stack trading platform inspired by Zerodha & Kite.**

  [![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://react.dev/)
  [![Node](https://img.shields.io/badge/Node-Express-green.svg?logo=nodedotjs)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen.svg?logo=mongodb)](https://www.mongodb.com/)
  [![MUI](https://img.shields.io/badge/UI-Material--UI-007FFF.svg?logo=mui)](https://mui.com/)
  [![Bootstrap](https://img.shields.io/badge/CSS-Bootstrap_5-purple.svg?logo=bootstrap)](https://getbootstrap.com/)
  [![Jest](https://img.shields.io/badge/Tests-Jest-red.svg?logo=jest)](https://jestjs.io/)
  [![AWS](https://img.shields.io/badge/Deploy-AWS-orange.svg?logo=amazonwebservices)](https://aws.amazon.com/)

</div>

---

## ⚡ Quick Start

> Make sure MongoDB is running on `mongodb://127.0.0.1:27017`

```powershell
# 1. Backend API (Port 3002)
cd backend
npm start

# 2. Frontend Landing Site (Port 3000)
cd frontend
npm start

# 3. Kite Trading Dashboard (Port 3001)
cd dashboard
$env:PORT=3001; npm start
```

---

## 📁 Project Structure

* **`backend/`** — Express REST API with MongoDB models (`/allHoldings`, `/allPositions`, `/allOrders`, `/newOrder`, `/signup`, `/login`).
* **`frontend/`** — Zerodha marketing landing site built with React & Bootstrap 5.
* **`dashboard/`** — Kite trading dashboard built with React, Material UI, and Chart.js.

---

## ✨ Key Features

* **Landing Pages** — Home, About, Products, Pricing, and Support pages.
* **User Authentication** — Onboarding Signup & Login connected to MongoDB.
* **Live Watchlist** — Real-time stock prices, fluctuations, and Doughnut charts.
* **Buy & Sell Orders** — Interactive order popup to execute market trades.
* **Portfolio & Holdings** — Real-time profit & loss (P&L) tracking and bar analytics.
* **Order History** — Log of all placed trades with status and timestamps.

---

## 🧪 Testing

```powershell
# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test -- --watchAll=false

# Run dashboard tests
cd dashboard && npm test -- --watchAll=false
```

---

## ☁️ AWS Deployment

* **Frontend & Dashboard:** `npm run build` &rarr; Host static files on **AWS S3 + CloudFront**.
* **Backend:** Deploy Express app to **AWS EC2 / App Runner** with load balancer health probe at `GET /health`.
* **Database:** Connect to managed **MongoDB Atlas**.
