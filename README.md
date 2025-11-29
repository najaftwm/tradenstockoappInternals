# TradeNStocko Trading Application

A modern, production-ready trading application built with React, Vite, and TailwindCSS.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Production Build](#production-build)
- [Code Standards](#code-standards)
- [Architecture](#architecture)

## ✨ Features

- **Real-time Trading**: Live market data via WebSocket connections
- **Multi-Exchange Support**: MCX, NSE, Crypto, Forex, and Commodities
- **Advanced Order Management**: Market orders, limit orders, stop loss, and take profit
- **Portfolio Tracking**: Real-time P&L calculations and portfolio management
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Code splitting, lazy loading, and optimized builds
- **Error Handling**: Comprehensive error boundary and error tracking
- **Production Ready**: Proper logging, security measures, and build optimizations

## 🛠 Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 4.5
- **Styling**: Tailwind CSS 3.3
- **Routing**: React Router DOM 6.30
- **State Management**: Zustand 5.0
- **HTTP Client**: Axios 1.13
- **Charts**: Lightweight Charts 5.0
- **Icons**: Lucide React 0.294
- **Notifications**: React Hot Toast 2.6
- **Legacy Support**: Vite Plugin Legacy for older browsers

## 📁 Project Structure

```
appinternals/
├── src/
│   ├── assets/          # Static assets (images, logos)
│   ├── components/      # Reusable React components
│   │   ├── ErrorBoundary.jsx
│   │   ├── ChartModal.jsx
│   │   ├── Charts.jsx
│   │   ├── MarketWatch.jsx
│   │   └── OrderModal.jsx
│   ├── config/          # Configuration files
│   │   └── index.js     # Centralized app configuration
│   ├── constants/       # Application constants
│   │   ├── api.constants.js
│   │   ├── app.constants.js
│   │   ├── websocket.constants.js
│   │   └── index.js
│   ├── contexts/        # React contexts
│   │   └── MarketDataContext.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuth.jsx
│   │   ├── useUserDataRefresh.js
│   │   └── useWebSocket.js
│   ├── pages/           # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── MarketWatch.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderTrade.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Profile.jsx
│   │   ├── Registration.jsx
│   │   ├── Tools.jsx
│   │   ├── Welcome.jsx
│   │   ├── OnboardingStep1.jsx
│   │   ├── OnboardingStep2.jsx
│   │   └── SplashScreen.jsx
│   ├── services/        # API and WebSocket services
│   │   ├── api.js
│   │   └── websocketService.js
│   ├── utils/           # Utility functions
│   │   ├── deviceUtils.js
│   │   ├── errorHandler.js
│   │   ├── kycUtils.js
│   │   ├── logger.js
│   │   ├── security.js
│   │   ├── userDataStorage.js
│   │   └── validation.js
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Public static files
├── .gitignore          # Git ignore rules
├── env.example.txt     # Environment variables example
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── vercel.json         # Vercel deployment config
└── vite.config.js      # Vite configuration

```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 14.x
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd appinternals
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Copy env.example.txt to .env and configure
cp env.example.txt .env
```

4. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=https://www.api.tradenstocko.com/api/
VITE_API_TIMEOUT=10000

# WebSocket Configuration
VITE_WS_MCX_NSE_URL=wss://ws.tradewingss.com/api/webapiwebsoc
VITE_WS_FX_URL=wss://www.fxsoc.tradenstocko.com:8001/ws
VITE_WS_MAX_RECONNECT_ATTEMPTS=10
VITE_WS_RECONNECT_DELAY=1000

# Server Configuration
VITE_DEV_SERVER_PORT=3001
VITE_DEV_SERVER_HOST=0.0.0.0

# Production Settings
VITE_DROP_CONSOLE=false
VITE_ENABLE_SOURCE_MAPS=false

# Feature Flags
VITE_ENABLE_LOGGING=true
VITE_LOG_LEVEL=info

# Default Values
VITE_DEFAULT_REF_ID=4355
VITE_DEVICE_IP_FALLBACK=127.0.0.1

# Cache Configuration
VITE_MARKET_DATA_CACHE_TTL=30000
```

See `env.example.txt` for all available options.

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build for production with console logs removed
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run clean` - Clean build artifacts

### Development Guidelines

1. **Code Style**: Follow ESLint rules configured in the project
2. **Component Structure**: Use functional components with hooks
3. **State Management**: Use Zustand for global state, Context API for specific features
4. **Error Handling**: Always use try-catch blocks and proper error boundaries
5. **Logging**: Use the logger utility instead of console.log
6. **Constants**: Store magic numbers and strings in constants files

## 🏗 Production Build

Build the application for production:

```bash
npm run build:prod
```

The optimized build will be in the `dist/` directory.

### Build Optimizations

- **Code Splitting**: Automatic chunk splitting for vendors and routes
- **Tree Shaking**: Removes unused code
- **Minification**: Terser for JavaScript, cssnano for CSS
- **Legacy Support**: Polyfills for older browsers
- **Asset Optimization**: Images and fonts optimized
- **Lazy Loading**: Routes are lazy-loaded for better performance

## 📝 Code Standards

### Import Order

1. React and external libraries
2. Internal components
3. Hooks
4. Utils and helpers
5. Constants and config
6. Styles

### File Naming

- Components: PascalCase (e.g., `UserProfile.jsx`)
- Utilities: camelCase (e.g., `formatDate.js`)
- Constants: camelCase with .constants suffix (e.g., `api.constants.js`)

### Component Structure

```javascript
// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Component
function MyComponent({ prop1, prop2 }) {
  // Hooks
  // Event handlers
  // Effects
  // Render
}

// PropTypes
MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

// Default export
export default MyComponent;
```

## 🏛 Architecture

### State Management

- **Global State**: Zustand for user authentication and app-level state
- **Context API**: For feature-specific state (e.g., MarketDataContext)
- **Local State**: React useState for component-level state

### API Layer

- Centralized API service in `src/services/api.js`
- Axios interceptors for request/response handling
- Automatic error logging and handling
- Retry logic for failed requests

### WebSocket Management

- Singleton WebSocket service for real-time data
- Automatic reconnection with exponential backoff
- Subscription-based architecture
- Market data caching for performance

### Error Handling

- React Error Boundary for component errors
- Centralized error handler utility
- User-friendly error messages
- Comprehensive logging

### Security

- Input sanitization
- XSS protection
- CORS configuration
- Secure WebSocket connections
- Environment variable validation

## 📄 License

Proprietary - All rights reserved

## 🤝 Contributing

Please follow the code standards and submit pull requests for review.

---

Built with ❤️ by the TradeNStocko Team
