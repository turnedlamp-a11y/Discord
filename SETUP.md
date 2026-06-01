# TwoHearts Development Setup Guide

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/turnedlamp-a11y/Discord.git
cd Discord
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/twohearts
JWT_SECRET=dev-secret-key-change-in-production
NODE_ENV=development
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

### 3. Start MongoDB
```bash
# Docker (recommended)
docker run -d -p 27017:27017 --name twohearts-mongo mongo:latest

# Or local installation
mongod
```

### 4. Run Development Server
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Available Scripts

```bash
# Development
npm run dev              # Start both client and server
npm run dev:client      # Start only frontend (Vite)
npm run dev:server      # Start only backend (Node)

# Production
npm run build           # Build for production
npm run preview         # Preview production build
npm start              # Start production server

# Utilities
npm run type-check     # TypeScript checking
npm run lint           # ESLint checking
```

## Folder Structure

```
.
├── server/             # Express backend
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth & validation
│   ├── sockets/       # WebSocket handlers
│   └── index.ts       # Server entry point
├── src/               # React frontend
│   ├── components/    # Reusable components
│   ├── pages/         # Route pages
│   ├── store/         # Zustand state
│   └── App.tsx        # Main app component
├── index.html         # Entry HTML
├── package.json       # Dependencies
└── tsconfig.json      # TypeScript config
```

## User Roles

TwoHearts is designed for:
- **Tanish** - User 1
- **Rose** - User 2

Both users have equal access to all features.

## Testing Workflow

1. **Open two browser windows/tabs**
   - Window 1: http://localhost:5173
   - Window 2: http://localhost:5173 (incognito)

2. **Create accounts**
   - Sign up as Tanish
   - Sign up as Rose

3. **Test features**
   - Send messages in real-time
   - Update profiles
   - Try status changes
   - Test Nitro subscription

## Troubleshooting

### Port 3001 Already in Use
```bash
# macOS/Linux
lsof -i :3001
kill -9 <PID>

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongosh  # or mongo

# Restart MongoDB
docker restart twohearts-mongo
```

### Dependencies Installation Failed
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | Database URL | mongodb://localhost:27017/twohearts |
| `JWT_SECRET` | Auth secret | your-secret-key |
| `JWT_EXPIRE` | Token expiry | 7d |
| `VITE_API_URL` | API endpoint | http://localhost:3001 |
| `VITE_SOCKET_URL` | WebSocket URL | http://localhost:3001 |

## Next Steps

1. ✅ Backend is set up and running
2. ✅ Frontend is configured
3. ✅ Database models are ready
4. ✅ Socket.IO is configured
5. 🔄 To add more features:
   - Create new pages in `src/pages/`
   - Add API routes in `server/routes/`
   - Create models in `server/models/`
   - Add socket handlers in `server/sockets/`

## Production Deployment

### Build
```bash
npm run build
```

### Environment Variables for Production
```
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-secret-key
VITE_API_URL=https://yourdomain.com
VITE_SOCKET_URL=https://yourdomain.com
```

### Deploy with Docker
```bash
docker build -t twohearts .
docker run -p 3001:3001 -e MONGODB_URI=... twohearts
```

## Support

For issues:
1. Check `.env` configuration
2. Ensure MongoDB is running
3. Check browser console for errors
4. Check server logs
5. Open GitHub issue
