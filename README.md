# TwoHearts - Premium Real-Time Chat Platform

![TwoHearts](https://img.shields.io/badge/TwoHearts-v1.0.0-blueviolet?style=flat-square)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0+-13aa52?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🎯 Overview

TwoHearts is a modern, production-ready chat platform designed specifically for two users (Tanish and Rose). It combines the elegance of Discord with premium romantic features, creating a truly unique communication experience.

## 🌟 Features

### Core Features
- ✅ Secure JWT authentication
- ✅ Real-time messaging with Socket.IO
- ✅ User profiles with avatars and banners
- ✅ Online/Idle/DND/Offline status
- ✅ Message reactions and replies
- ✅ Message editing and deletion
- ✅ Message pinning
- ✅ Typing indicators
- ✅ Read receipts
- ✅ Infinite message history
- ✅ File uploads (images, videos, documents)
- ✅ GIF and sticker support
- ✅ Voice messages
- ✅ Message search

### Communication Features
- 🎙️ Voice calls
- 📹 Video calls
- 🖥️ Screen sharing
- 💬 Direct messages
- 📱 Mobile responsive

### Premium System (Nitro)
- 💎 Custom animated profile banners
- 🎨 Animated avatars
- 📺 HD streaming
- 🎭 Custom profile themes
- 📦 Larger file upload limits (500MB)
- 🏅 Exclusive badges
- ✨ Special profile effects
- 🎪 Animated name effects

### Special Couple Features
- 💕 Shared memory timeline
- 📅 Relationship counter
- 🎂 Anniversary tracker
- 📸 Shared photo album
- 📝 Shared notes
- ✅ Shared to-do list
- 🎵 Shared playlists
- 👫 Couple badges
- 💏 Matching profile themes
- 💌 Love letter feature
- ❓ Daily question feature
- 🎁 Virtual gift sending
- ❤️ Custom heart reactions
- 🏆 Couple achievements

### Emoji System
- 🎉 Hundreds of animated emojis
- 📤 Custom emoji uploader
- 🏷️ Emoji categories
- ⭐ Favorite emojis
- 🔥 Trending emojis
- ❤️ Animated heart emojis
- 💕 Animated love emojis
- ⛏️ Minecraft emojis
- 🐱 Cat emojis
- 🌹 Rose emojis
- 🌙 Moon emojis
- 🌸 Cherry blossom emojis

### UI/UX
- 🌙 Beautiful dark theme
- ☀️ Beautiful light theme
- 🌟 Glassmorphism effects
- ✨ Smooth animations
- 🎆 Particle effects
- 🎨 Animated backgrounds
- 💖 Floating hearts
- 🌸 Cherry blossom particles
- 🌕 Moonlit theme
- 📱 Fully responsive design

### Gaming Features
- 🎮 Minecraft activity status
- 🕹️ Game sharing
- 👥 Friend activity feed
- 🏆 Achievement showcase
- 🎯 Gaming profile cards

### Notifications
- 🔔 Push notifications
- 🔊 Sound notifications
- 🎵 Custom notification sounds
- @️⃣ Mention notifications
- 📞 Call notifications

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Socket.IO Client** - Real-time communication
- **Zustand** - State management
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Hot Toast** - Notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload

## 📋 Project Structure

```
twohearts/
├── server/
│   ├── models/
│   │   ├── User.ts
│   │   ├── Message.ts
│   │   ├── Relationship.ts
│   │   └── VoiceCall.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── message.ts
│   │   └── relationship.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── sockets/
│   │   └── handlers.ts
│   └── index.ts
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Message.tsx
│   │   ├── MessageInput.tsx
│   │   └── Loader.tsx
│   ├── pages/
│   │   ├── ChatPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── NitroPage.tsx
│   ├── store/
│   │   ├── auth.ts
│   │   └── chat.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── .env.example
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB 6.0+ running locally or cloud connection
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/turnedlamp-a11y/Discord.git
   cd Discord
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env` file**
   ```
   PORT=3001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/twohearts
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   VITE_API_URL=http://localhost:3001
   VITE_SOCKET_URL=http://localhost:3001
   ```

5. **Start MongoDB**
   ```bash
   # Using Docker (recommended)
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or if MongoDB is installed locally
   mongod
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

   This will start both the backend (port 3001) and frontend (port 5173) concurrently.

### Access the Application

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001/api`
- Socket.IO: `ws://localhost:3001`

## 📱 Usage

### Creating an Account

1. Visit `http://localhost:5173/signup`
2. Fill in email, username, and password
3. Click "Sign Up"
4. You'll be redirected to the chat page

### Logging In

1. Visit `http://localhost:5173/login`
2. Enter your email and password
3. Click "Login"

### Sending Messages

1. Navigate to the chat page
2. Type a message in the input field
3. Press Enter or click the send button
4. Messages appear in real-time for both users

### Profile Management

1. Click "Profile" in the navbar
2. Update your bio, status message, and appearance settings
3. Click "Save Changes"

### Accessing Premium Features

1. Click "Nitro" in the navbar
2. Choose your subscription plan
3. Click "Subscribe" to activate premium features

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/auth/me` - Get current user (requires auth)

### Users
- `GET /api/users/:userId` - Get user profile
- `PATCH /api/users/:userId` - Update user profile
- `PATCH /api/users/:userId/status` - Update user status

### Messages
- `GET /api/messages/:recipientId` - Get chat history
- `POST /api/messages` - Send message
- `PATCH /api/messages/:messageId` - Edit message
- `DELETE /api/messages/:messageId` - Delete message
- `POST /api/messages/:messageId/reactions` - Add reaction
- `PATCH /api/messages/:messageId/read` - Mark as read

### Relationships
- `GET /api/relationship` - Get relationship data
- `POST /api/relationship/memories` - Add memory
- `POST /api/relationship/anniversaries` - Add anniversary
- `PATCH /api/relationship/notes` - Update shared notes

## 🔌 WebSocket Events

### Connection
- `user:online` - User comes online
- `user:status` - User status changes

### Messaging
- `message:send` - Send message
- `message:receive` - Receive message
- `message:typing` - User is typing
- `message:stop-typing` - User stopped typing
- `message:read` - Message read
- `message:edit` - Message edited
- `message:edited` - Receive edited message

### Calls
- `call:initiate` - Initiate call
- `call:incoming` - Incoming call
- `call:accept` - Accept call
- `call:accepted` - Call accepted
- `call:reject` - Reject call
- `call:rejected` - Call rejected

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Rate limiting ready
- Secure headers
- Protected API endpoints
- Socket.IO authentication

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3001 5173

CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Database Schema

### User Schema
```typescript
{
  username: string (unique)
  email: string (unique)
  password: string (hashed)
  avatar: string (URL)
  banner: string (URL)
  status: 'online' | 'idle' | 'dnd' | 'offline'
  statusMessage: string (max 128 chars)
  bio: string (max 256 chars)
  lastSeen: Date
  nitroSubscription: {
    active: boolean
    expiresAt: Date
    tier: 'standard' | 'premium'
  }
  preferences: {
    theme: 'dark' | 'light'
    notifications: boolean
    soundEnabled: boolean
  }
  createdAt: Date
  updatedAt: Date
}
```

### Message Schema
```typescript
{
  senderId: ObjectId (ref: User)
  recipientId: ObjectId (ref: User)
  content: string
  fileUrl: string
  fileType: 'text' | 'image' | 'video' | 'audio' | 'file' | 'gif'
  reactions: [
    {
      emoji: string
      userId: ObjectId
      createdAt: Date
    }
  ]
  replyTo: ObjectId (ref: Message)
  edited: boolean
  editedAt: Date
  pinned: boolean
  pinnedAt: Date
  read: boolean
  readAt: Date
  createdAt: Date
  updatedAt: Date
}
```

### Relationship Schema
```typescript
{
  userId1: ObjectId (ref: User)
  userId2: ObjectId (ref: User)
  startDate: Date
  memories: [
    {
      title: string
      description: string
      date: Date
      imageUrl: string
      createdAt: Date
    }
  ]
  anniversaries: [
    {
      type: 'first_meeting' | 'first_date' | 'anniversary' | 'custom'
      date: Date
      title: string
      description: string
    }
  ]
  sharedAlbum: [string]
  sharedNotes: string
  sharedTodos: [
    {
      id: string
      text: string
      completed: boolean
      createdAt: Date
    }
  ]
  customBadges: [string]
  achievements: [string]
  createdAt: Date
  updatedAt: Date
}
```

## 🎨 Color Palette

- Primary: `#9d4edd` (Purple)
- Secondary: `#c77dff` (Light Purple)
- Accent: `#e0aaff` (Lavender)
- Dark: `#10002b` (Dark Purple)
- Darker: `#06001b` (Almost Black)
- Rose: `#e91e63` (Pink)
- Moonlight: `#a8d8ff` (Light Blue)

## 📊 Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Lazy loading messages
- Efficient re-renders with Zustand
- Socket.IO room optimization
- MongoDB indexing
- Gzip compression

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify firewall settings

### Socket.IO Connection Issues
- Check VITE_SOCKET_URL
- Ensure backend is running on correct port
- Clear browser cache
- Check CORS settings

### Port Already in Use
```bash
# Find and kill process on port 3001
kill -9 $(lsof -t -i:3001)

# Or change port in .env
PORT=3002
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [Socket.IO Documentation](https://socket.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For support, email support@twohearts.dev or open an issue on GitHub.

## 🙏 Acknowledgments

- Inspired by Discord's design and functionality
- Built with love for Tanish and Rose
- Thanks to all open-source contributors

## 🚦 Roadmap

- [ ] Video call implementation with WebRTC
- [ ] Advanced emoji system
- [ ] Message search with filters
- [ ] Theme customization
- [ ] Mobile app (React Native)
- [ ] Bot system
- [ ] Moderation tools
- [ ] Analytics dashboard
- [ ] AI-powered features
- [ ] Integration with other services

---

**Made with 💕 for TwoHearts**
