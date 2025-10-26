#!/bin/bash

# Domain connection test script
# Usage: ./test-domain.sh yourdomain.com

if [ $# -eq 0 ]; then
    echo "Usage: $0 <your-domain.com>"
    echo "Example: $0 mytravelsite.com"
    exit 1
fi

DOMAIN=$1
echo "🌐 Testing domain connection for: $DOMAIN"
echo ""

# Test HTTP
echo "📡 Testing HTTP connection..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$DOMAIN" --connect-timeout 10)
if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
    echo "✅ HTTP: Working (Status: $HTTP_STATUS)"
else
    echo "❌ HTTP: Not working (Status: $HTTP_STATUS)"
fi

# Test HTTPS
echo "📡 Testing HTTPS connection..."
HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" --connect-timeout 10)
if [ "$HTTPS_STATUS" = "200" ] || [ "$HTTPS_STATUS" = "301" ] || [ "$HTTPS_STATUS" = "302" ]; then
    echo "✅ HTTPS: Working (Status: $HTTPS_STATUS)"
else
    echo "❌ HTTPS: Not working (Status: $HTTPS_STATUS)"
fi

# Test www subdomain
echo "📡 Testing www subdomain..."
WWW_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://www.$DOMAIN" --connect-timeout 10)
if [ "$WWW_STATUS" = "200" ] || [ "$WWW_STATUS" = "301" ] || [ "$WWW_STATUS" = "302" ]; then
    echo "✅ WWW: Working (Status: $WWW_STATUS)"
else
    echo "❌ WWW: Not working (Status: $WWW_STATUS)"
fi

echo ""
echo "🔍 DNS Propagation Check:"
echo "Visit: https://whatsmydns.net/#A/$DOMAIN"
echo "Visit: https://whatsmydns.net/#CNAME/www.$DOMAIN"
echo ""
echo "📝 Next steps:"
echo "1. If all tests pass, run: ./update-cors-domain.sh $DOMAIN"
echo "2. Commit and push changes"
echo "3. Test your custom domain!"
