# 📸 How to Add/Update Package Images

## Overview
This guide explains how to add and update package images in your travel booking platform.

## Method 1: Using the Admin Panel (Recommended)

### Step 1: Login to Admin Panel
1. **Go to**: https://travelqbx.in/admin
2. **Click "Sign in"** in the top right
3. **Login with admin credentials**:
   - Email: `admin@travelbooking.com`
   - Password: `admin123`

### Step 2: Navigate to Manage Packages
1. After logging in, you'll see the **Admin Dashboard**
2. Click on **"Manage Packages"** in the sidebar or navigation menu

### Step 3: Add or Edit a Package
#### For New Packages:
1. Click the **"Add New Package"** button
2. Fill in all required fields
3. In the **"Images"** field, add multiple image URLs (one per line or separated by commas)
4. Click **"Save"**

#### For Existing Packages:
1. Find the package you want to update in the list
2. Click the **"Edit"** button (pencil icon)
3. Update the **"Images"** field with your image URLs
4. Click **"Save Changes"**

### Image URL Format:
Add one URL per line or separate them with commas. The system will automatically parse them into an array.

```text
https://images.unsplash.com/photo-123456789
https://images.unsplash.com/photo-987654321
https://images.unsplash.com/photo-456789123
```

Or use commas:
```text
https://images.unsplash.com/photo-123456789,https://images.unsplash.com/photo-987654321,https://images.unsplash.com/photo-456789123
```

## Method 2: Directly in Database (Advanced)

### Using MongoDB Atlas:
1. **Login to MongoDB Atlas**: https://cloud.mongodb.com
2. Navigate to your cluster → Browse Collections
3. Select the **`packages`** collection
4. Click **Edit** on a package document
5. Find the `images` field
6. Update it as a JSON array:
```json
[
  "https://images.unsplash.com/photo-123456789",
  "https://images.unsplash.com/photo-987654321",
  "https://images.unsplash.com/photo-456789123",
  "https://images.unsplash.com/photo-789456123"
]
```
7. Click **Update** to save

## Image Requirements

### Best Practices:
- **Resolution**: At least 800x600 pixels (larger is better)
- **Aspect Ratio**: 16:9 (landscape) works best for display
- **Format**: JPG or PNG
- **Size**: Keep under 2MB per image for faster loading
- **Quantity**: Add 3-5 images per package for best visual appeal

### Recommended Image Sources:
- **Unsplash**: https://unsplash.com - Free, high-quality, royalty-free photos
- **Pexels**: https://pexels.com - Free stock photos and videos
- **Your Own Hosting**: Upload to cloud storage (AWS S3, Cloudinary, Imgur, etc.)

#### Getting Unsplash URLs:
1. Go to https://unsplash.com
2. Search for your destination (e.g., "Ladakh")
3. Click on an image you like
4. Click "Download free" 
5. Copy the image URL or use Unsplash API format:
   - `https://images.unsplash.com/photo-[PHOTO-ID]?w=800&q=80`

## How Multiple Images Work

When you add multiple images to a package:

1. **Package Cards** (Homepage/Packages page): Show the first image
2. **Package Details Page**: 
   - Shows all images in a gallery
   - First image displayed large at the top
   - Thumbnail gallery below showing all images
   - Click any thumbnail to change the main image
   - Smooth hover effects and transitions

## Image Gallery Features

The PackageDetails page automatically handles multiple images:
- **Main Display**: Large hero image (first in array)
- **Thumbnail Gallery**: All images displayed as clickable thumbnails
- **Hover Effects**: Smooth transitions
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Full-screen View**: Click to see images in full size

## Adding Images to Seed Data

If you want to add images to the initial seed data (for new installations):

1. **Open**: `backend/data/indianPackages.js`

2. **Update a package's images array**:
```javascript
{
  title: "Ladakh Adventure",
  images: [
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    "https://images.unsplash.com/photo-1518528152763-84a59b4c3e32?w=800",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    "https://images.unsplash.com/photo-1476913743073-7974c1c562db?w=800"
  ],
  // ... rest of package data
}
```

3. **Reseed the database**:
```bash
cd backend
npm run seed
```

## Troubleshooting

### Images Not Loading:
1. **Check URL Accessibility**: Open the image URL directly in a browser to verify it works
2. **CORS Issues**: Some hosting services may have CORS restrictions
3. **Check Console**: Open browser Developer Tools (F12) to see error messages
4. **SSL/HTTPS**: Ensure URLs use HTTPS on production site

### Image Display Issues:
1. **Too Large**: Images may take time to load if too large
2. **Wrong Format**: Only JPG, PNG, GIF, and WebP are supported by browsers
3. **Broken URLs**: Make sure URLs don't have extra spaces or characters

### Admin Panel Issues:
1. **Can't Login**: 
   - Verify you're using the correct admin credentials
   - Try logging in from: https://travelqbx.in/admin
2. **Changes Not Saving**:
   - Check for validation errors in the form
   - Ensure all required fields are filled
   - Refresh and try again

## Quick Reference

### Login Credentials:
- **Admin Email**: `admin@travelbooking.com`
- **Admin Password**: `admin123`
- **Admin Panel**: https://travelqbx.in/admin
- **Manage Packages**: https://travelqbx.in/admin/packages

### External Links:
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Unsplash**: https://unsplash.com
- **Pexels**: https://pexels.com

## Future Enhancements (Coming Soon)

Want to upload images directly instead of using URLs?

We plan to add:
1. File upload functionality in admin panel
2. Integration with Cloudinary or AWS S3
3. Image optimization and compression
4. Automatic thumbnail generation
5. Image cropping and editing tools

For now, use image URLs from trusted sources like Unsplash or host your own images on cloud storage.
