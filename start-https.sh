#!/bin/bash
echo "🔒 Starting Locotag with HTTPS (Secure Forms)..."
echo ""

# Stop any existing servers
pkill -f "node server.js" 2>/dev/null
pkill -f "node https-server.js" 2>/dev/null

echo "Installing Node.js dependencies..."
npm install

echo ""
echo "Starting the Locotag HTTPS server..."
echo "⚠️  Note: You may see a browser security warning about the self-signed certificate."
echo "   Click 'Advanced' → 'Proceed to localhost' to continue."
echo ""

npm run start:https
