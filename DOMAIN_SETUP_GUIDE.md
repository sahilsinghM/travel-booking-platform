# 🌐 Domain Connection Guide

## Overview
This guide will help you connect your GoDaddy domain to your Vercel-deployed travel booking platform.

## Prerequisites
- ✅ GoDaddy domain purchased
- ✅ Vercel account with deployed frontend
- ✅ Backend deployed on Railway/Render

## Step 1: Vercel Domain Configuration

### 1.1 Access Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find your `travel-booking-platform` project
3. Click on the project name

### 1.2 Add Custom Domain
1. Navigate to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `mytravelsite.com`)
4. Click **Add**

### 1.3 Get DNS Configuration
Vercel will display DNS records you need to configure:
- **A Record**: `@` → `76.76.21.21`
- **CNAME Record**: `www` → `cname.vercel-dns.com`

## Step 2: GoDaddy DNS Configuration

### 2.1 Access DNS Management
1. Go to [godaddy.com](https://godaddy.com)
2. Login to your account
3. Navigate to **My Products** → **DNS**
4. Find your domain and click **DNS**

### 2.2 Update DNS Records
1. **Delete existing records** for `@` and `www` (if any)
2. **Add A Record**:
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`
   - TTL: `600`
3. **Add CNAME Record**:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `600`
4. Click **Save**

### 2.3 Wait for Propagation
- DNS changes can take 24-48 hours to propagate
- You can check status at [whatsmydns.net](https://whatsmydns.net)

## Step 3: Update Backend CORS

### 3.1 Run the CORS Update Script
Once your domain is working, run:
```bash
cd /home/sahil/mycode/travel
./update-cors-domain.sh yourdomain.com
```

### 3.2 Deploy Backend Changes
```bash
git add .
git commit -m "Add custom domain to CORS"
git push origin main
```

## Step 4: Verification

### 4.1 Test Domain Access
1. Visit `https://yourdomain.com`
2. Verify the site loads correctly
3. Test all functionality (search, packages, booking)

### 4.2 Check SSL Certificate
- Vercel automatically provisions SSL certificates
- Look for the lock icon in your browser

## Troubleshooting

### Common Issues

**Domain not resolving:**
- Wait longer for DNS propagation
- Check DNS records are correct
- Verify TTL is set to 600 seconds

**CORS errors:**
- Ensure backend CORS is updated
- Check backend is redeployed
- Verify domain is in allowedOrigins array

**SSL issues:**
- Wait for Vercel to provision certificate
- Check domain is properly configured in Vercel

### Support Resources
- [Vercel Domain Documentation](https://vercel.com/docs/concepts/projects/domains)
- [GoDaddy DNS Help](https://www.godaddy.com/help/manage-dns-records-680)
- [DNS Propagation Checker](https://whatsmydns.net)

## Next Steps After Domain Setup

1. **Update Frontend API URL** (if needed)
2. **Test Performance** with custom domain
3. **Set up Analytics** (Google Analytics, etc.)
4. **Configure Email** (if using custom domain emails)

---

**Need Help?** If you encounter any issues, check the troubleshooting section or contact support.
