#!/bin/bash
# AyurSetu - Complete Setup & Run Script

echo "🏥 AyurSetu - Hospital Management Platform"
echo "=========================================="
echo ""

echo "📁 Installing frontend dependencies..."
npm install

echo ""
echo "📁 Installing backend dependencies..."
cd backend && npm install && cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development servers, run in two terminals:"
echo "   1) Backend : cd backend && npm start"
echo "   2) Frontend: npm run dev"
echo ""
echo "🌐 Default URLs:"
echo "   - Frontend Landing Page: http://localhost:3000/"
echo "   - Sign In:               http://localhost:3000/signin"
echo "   - Dashboard:             http://localhost:3000/dashboard"
echo ""
echo "📋 Project Documentation:"
echo "   - QUICK_START.md         (Start here!)"
echo "   - DOCUMENTATION.md       (Complete feature guide)"
echo "   - ADVANCED_FEATURES.md   (Customization & enhancement)"
echo ""
echo "🎨 Key Features:"
echo "   ✨ Professional landing page with animations"
echo "   🔐 Beautiful sign-in & sign-up pages"
echo "   📊 Role-based dashboards (patient & doctor)"
echo "   📱 Fully responsive design"
echo "   🎬 Smooth animations & transitions"
echo ""
echo "Happy Coding! 🚀"
