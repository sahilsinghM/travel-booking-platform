# 📸 How to Add/Update Package Images

## Overview
This guide explains how to add and update package images in your travel booking platform.

## Method 1: Using the Admin Panel (Recommended)

### For Adding New Packages:
1. **Login to Admin Panel**: https://travelqbx.in/admin
   - Email: `admin@test.com`
   - Password: `admin123`

2. **Go to Manage Packages**: Click "Manage Packages" in the sidebar

3. **Add New Package**: Click "Add New Package" button

4. **Upload Multiple Images**:
   - Find the "Images" field
   - Add multiple image URLs (one per line or separated by commas)
   - Images can be:
     - URLs from Unsplash, Pexels, etc.
     - URLs from your own hosting
     - Base64 encoded images

### Example Image URLs:
```
https://images.unsplash.com/photo-123456789
https://images.unsplash.com/photo-987654321
https://images.unsplash.com/photo-456789123
```

### For Editing Existing Packages:
1. **Go to Manage Packages**
2. **Click Edit** (pencil icon) on the package you want to update
3. **Update the Images field** with new URLs
4. **Save Changes**

## Method 2: Directly in Database (Advanced)

### Using MongoDB Atlas:
1. **Login to MongoDB Atlas**: https://cloud.mongodb.com
2. **Navigate to Collections** → `packages` collection
3. **Click Edit** on a package document
4. **Update the `images` array**:
```json
{
  "images": [
    "https://images.unsplash.com/photo-123456789",
    "https://images.unsplash.com/photo-987654321",
    "https://images.unsplash.com/photo-456789123",
    "https://images.unsplash.com/photo-789456123"
  ]
}
```
5. **Save** the changes

## Image Requirements

### Best Practices:
- **Resolution**: At least 800x600 pixels
- **Aspect Ratio**: 16:9 (landscape) works best
- **Format**: JPG or PNG
- **Size**: Keep under 2MB per image
- **Quantity**: Add 3-5 images per package

### Image Sources:
- **Unsplash**: https://unsplash.com (free, high-quality)
- **Pexels**: https://pexels.com (free stock photos)
- **Your Own Hosting**: Upload to cloud storage (AWS S3, Cloudinary, etc.)

## Adding Images to Seed Data

If you want to add images to the initial seed data:

1. **Open**: `backend/data/indianPackages.js`

2. **Update a package**:
```javascript
{
  title: "Ladakh Adventure",
  images: [
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    "https://images.unsplash.com/photo-1518528152763-84a59b4c3e32?w=800",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    "https://images.unsplash.com/photo-1476913743073-7974c1c562db?w=800",
    "https://images.unsplash.com/photo-1519900855354-e42445b35109?w=800"
  ],
  // ... rest of package data
}
```

3. **Reseed the database**:
```bash
cd backend
npm run seed
```

## Image Gallery in Package Details

The PackageDetails page already supports multiple images:
- **Main Image**: Large display (first image)
- **Thumbnail Gallery**: Shows all images
- **Hover Effect**: Smooth transitions
- **Responsive**: Works on all devices

## Troubleshooting

### Images Not Loading:
1. Check if the URLs are accessible
2. Verify CORS settings if using custom hosting
3. Check browser console for errors

### Want to Upload Directly?
Currently, the system uses image URLs. To enable file uploads:
1. Add file upload to admin panel (requires backend changes)
2. Use services like Cloudinary or AWS S3
3. Store uploaded image URLs in database

### Image Optimization:
- Use services like Cloudinary for automatic optimization
- Compress images before adding URLs
- Use CDN for faster loading

## Quick Access:
- **Admin Panel**: https://travelqbx.in/admin
- **Manage Packages**: https://travelqbx.in/admin/packages
- **MongoDB Atlas**: https://cloud.mongodb.com
