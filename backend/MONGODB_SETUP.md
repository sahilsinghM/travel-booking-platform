# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Cloud Database)

### Steps:
1. Go to https://www.mongodb.com/atlas
2. Sign up for free account
3. Create a new cluster (choose FREE tier)
4. Create database user
5. Get connection string
6. Update `.env` file with your connection string

### Connection String Format:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-booking?retryWrites=true&w=majority
```

### Benefits:
- ✅ No local installation (0 MB)
- ✅ Free tier (512MB storage)
- ✅ Automatic backups
- ✅ Production-ready
- ✅ Easy team collaboration

---

## Option 2: Local MongoDB Installation

### Install MongoDB:
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Size: ~200-300 MB

### Update .env:
```
MONGODB_URI=mongodb://localhost:27017/travel-booking
```

---

## Option 3: Docker MongoDB

### Install Docker (if not installed):
```bash
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

### Run MongoDB Container:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Size: ~200 MB (MongoDB image)

---

## Quick Start (Recommended)

1. **Use MongoDB Atlas** (cloud database)
2. **Create free account** at mongodb.com/atlas
3. **Get connection string** from Atlas dashboard
4. **Update .env file** with your connection string
5. **Run the backend**: `npm run dev`

This way you don't need to install anything locally!
