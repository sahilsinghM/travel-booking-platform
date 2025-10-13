# Railway Deployment Guide for Indian Travel Backend

## 🚀 Quick Deployment Steps

### 1. Prepare for Deployment
- ✅ Backend code is ready
- ✅ MongoDB Atlas is connected
- ✅ Environment variables configured

### 2. Deploy to Railway

#### Option A: Deploy from GitHub (Recommended)
1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose**: `sahilsinghM/travel-booking-platform`
6. **Select**: `backend` folder as root directory
7. **Railway will auto-detect** Node.js

#### Option B: Deploy with Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy from backend directory
cd backend
railway deploy
```

### 3. Configure Environment Variables

In Railway dashboard, add these environment variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key-for-production
JWT_EXPIRE=24h
```

### 4. Update Frontend API URL

After deployment, update your frontend to use the Railway URL:
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-app.railway.app/api`

## 🔧 Alternative: Render Deployment

### 1. Deploy to Render
1. **Go to**: https://render.com
2. **Sign up** with GitHub
3. **Click "New +"** → **"Web Service"**
4. **Connect** your GitHub repo
5. **Configure**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2. Environment Variables
Add the same environment variables as above.

## 📋 Pre-Deployment Checklist

- [ ] Backend code is working locally
- [ ] MongoDB Atlas is connected
- [ ] Environment variables are ready
- [ ] GitHub repository is updated
- [ ] Frontend API service is ready to update

## 🎯 Post-Deployment Steps

1. **Test API endpoints** on deployed URL
2. **Update frontend** to use production API
3. **Test full flow**: register → login → browse → book
4. **Set up custom domain** (optional)

## 🔗 Useful URLs

- **Railway**: https://railway.app
- **Render**: https://render.com
- **Your GitHub**: https://github.com/sahilsinghM/travel-booking-platform
