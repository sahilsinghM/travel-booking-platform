# MongoDB Atlas Setup Guide

## 🚀 Quick Setup Steps

### 1. Create Account
- Go to: https://www.mongodb.com/atlas
- Click "Try Free" 
- Sign up with your email

### 2. Create Cluster
- Select "M0 Sandbox" (FREE tier)
- Region: Asia Pacific - Mumbai (closest to India)
- Cluster Name: `travel-booking-cluster`
- Click "Create Cluster"

### 3. Create Database User
- Username: `travel-admin`
- Password: Generate strong password (SAVE THIS!)
- Click "Add User"

### 4. Whitelist IP
- Click "Add IP Address"
- Choose "Allow Access from Anywhere" (0.0.0.0/0)
- Click "Confirm"

### 5. Get Connection String
- Click "Connect" on your cluster
- Choose "Connect your application"
- Driver: Node.js
- Copy the connection string

### 6. Update .env File
Replace the connection string in `/home/sahil/mycode/travel/backend/.env`:

```bash
# Replace this line:
MONGODB_URI=mongodb+srv://travel-admin:YOUR_PASSWORD@travel-booking-cluster.xxxxx.mongodb.net/travel-booking?retryWrites=true&w=majority

# With your actual connection string from Atlas
```

### 7. Test Connection
```bash
cd /home/sahil/mycode/travel/backend
npm run dev
```

You should see:
```
🚀 Server running in development mode on port 5000
MongoDB Connected: travel-booking-cluster-shard-00-00.xxxxx.mongodb.net
```

## 📋 What You'll Get

✅ **Free Forever**: 512MB storage  
✅ **No Installation**: Cloud database  
✅ **Automatic Backups**: Daily backups  
✅ **Production Ready**: Same database for dev/prod  
✅ **Team Collaboration**: Easy to share  

## 🔧 Troubleshooting

**If connection fails:**
1. Check password is correct
2. Verify IP is whitelisted
3. Ensure cluster is running
4. Check connection string format

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```
