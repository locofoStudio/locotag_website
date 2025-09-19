#!/bin/bash

# Locotag Website Startup Script

echo "🚀 Starting Locotag Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're in the correct directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating example..."
    cat > .env << EOF
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
EOF
    echo "✏️  Please edit .env with your email credentials before starting the server."
    echo "   See SETUP_DIRECT_EMAIL.md for detailed instructions."
    exit 1
fi

# Start the server
echo "🌐 Starting server..."
echo "📧 Forms will send emails to hello@locotag.io"
echo "🔗 Website will be available at: http://localhost:3000"
echo ""

npm start
