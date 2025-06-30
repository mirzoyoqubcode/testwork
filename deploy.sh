#!/bin/bash

# Business Analytics Dashboard Deployment Script

echo "🚀 Building Business Analytics Dashboard..."

# Build the project
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Build files are in the 'dist' directory"
    echo ""
    echo "🌐 Deployment Options:"
    echo "1. Vercel: vercel --prod"
    echo "2. Netlify: netlify deploy --prod --dir=dist"
    echo "3. GitHub Pages: Push to gh-pages branch"
    echo "4. Firebase: firebase deploy"
    echo "5. Manual: Upload 'dist' folder to your hosting provider"
    echo ""
    echo "🔗 Local Preview: npm run preview"
else
    echo "❌ Build failed!"
    exit 1
fi 