#!/bin/bash

# Script to update CORS configuration with custom domain
# Usage: ./update-cors-domain.sh yourdomain.com

if [ $# -eq 0 ]; then
    echo "Usage: $0 <your-domain.com>"
    echo "Example: $0 mytravelsite.com"
    exit 1
fi

DOMAIN=$1
BACKEND_FILE="backend/server.js"

echo "Adding domain $DOMAIN to CORS configuration..."

# Check if domain already exists in allowedOrigins
if grep -q "https://$DOMAIN" "$BACKEND_FILE"; then
    echo "Domain $DOMAIN is already in CORS configuration."
    exit 0
fi

# Add domain to allowedOrigins array
sed -i "/const allowedOrigins = \[/a\\  'https://$DOMAIN'," "$BACKEND_FILE"

echo "✅ Added https://$DOMAIN to CORS allowed origins"
echo "📝 Don't forget to:"
echo "   1. Commit and push changes: git add . && git commit -m 'Add custom domain to CORS' && git push"
echo "   2. Redeploy backend to Railway/Render"
echo "   3. Test your custom domain!"
