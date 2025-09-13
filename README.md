# Finance Buddy 💰

A comprehensive full-stack financial literacy platform built with Next.js, featuring interactive lessons, quizzes, and progress tracking to help users master essential financial concepts.

## 🌟 Features

- **Interactive Learning**: 5 comprehensive finance lessons covering budgeting, investing, credit, taxes, and digital payments
- **Progress Tracking**: Monitor learning journey with detailed analytics and completion statistics
- **Interactive Quizzes**: Test knowledge with 2 MCQ questions per lesson
- **Payment Simulation**: Mock payment system for premium content access
- **QR Code Sharing**: Share the platform easily with generated QR codes
- **Responsive Design**: Beautiful, mobile-first UI with blue/green finance theme
- **Expert Resources**: Curated resources from RBI, SEBI, NPCI, and other trusted institutions

## 🏗️ Architecture

### Frontend
- **Next.js 13** with TypeScript for robust development
- **Tailwind CSS** for modern, responsive styling
- **Axios** for API communication
- **React QR Code** for sharing functionality
- **Lucide React** for consistent iconography

### Backend (API Routes)
- **Next.js API Routes** for serverless backend functionality
- **JSON File Storage** for lesson content, quizzes, and progress data
- **RESTful API Design** with proper error handling

## 📚 Lesson Content

1. **Budgeting 101** (Free)
   - 50/30/20 rule and budgeting fundamentals
   - Resources: RBI Guide, Investopedia

2. **Saving & Investing Basics** (₹99)
   - Emergency funds, SIP, mutual funds, and investment strategies
   - Resources: SEBI, NSE Academy

3. **Credit & Loans** (₹199)
   - Credit scores, loan types, and debt management
   - Resources: CIBIL, Investopedia

4. **Taxes Made Simple** (₹149)
   - Indian tax system, ITR filing, and tax-saving strategies
   - Resources: Income Tax Department, ClearTax

5. **Digital Payments & UPI** (Free)
   - UPI, digital wallets, and payment security
   - Resources: NPCI, RBI

## 🚀 API Endpoints

### Lessons
- `GET /api/lessons` - Fetch all lessons
- `GET /api/lessons/[id]` - Fetch specific lesson

### Quizzes
- `GET /api/quizzes/[lessonId]` - Fetch quizzes for a lesson

### Progress
- `GET /api/progress` - Fetch user progress
- `POST /api/progress` - Update lesson completion

### Purchase
- `POST /api/purchase` - Simulate lesson purchase

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git for version control

### Local Development
```bash
# Clone the repository
git clone https://github.com/GauravGhatte/FinanceBuddy.git
cd FinanceBuddy

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Environment Variables
```env
# MongoDB Connection (for production)
MONGODB_URI=mongodb://localhost:27017/financebuddy

# JWT Secret for Authentication
JWT_SECRET=your-jwt-secret-key

# Payment Gateway Keys (Razorpay)
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Environment
NODE_ENV=development
```

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Push code to GitHub repository
2. Connect repository to [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

```bash
# Build for production
npm run build

# Start production server locally
npm start
```

### Backend Deployment (Render/Railway)
For production with MongoDB:
1. Create account on [Render](https://render.com) or [Railway](https://railway.app)
2. Create MongoDB instance (MongoDB Atlas recommended)
3. Deploy backend service with environment variables
4. Update frontend API endpoints to production URLs

### Database Migration (Production)
```bash
# For production deployment with MongoDB
# 1. Set up MongoDB Atlas cluster
# 2. Create database collections:
#    - lessons
#    - quizzes  
#    - progress
#    - users (for authentication)
# 3. Import initial data from JSON files
```

## 📱 Pages & Features

### Home Page
- Hero section with platform overview
- Feature highlights and statistics
- QR code sharing functionality
- Call-to-action sections

### Lessons Page
- Grid layout of all available lessons
- Progress indicators and completion status
- Purchase options for premium content
- Free vs. paid lesson differentiation

### Lesson Detail Page
- Full lesson content with proper formatting
- Resource links to external references
- Progress tracking and quiz navigation
- Responsive reading experience

### Quiz Page
- Interactive multiple-choice questions
- Progress tracking with visual indicators
- Immediate feedback and scoring
- Detailed results with answer review

### Progress Page
- Comprehensive learning analytics
- Visual progress indicators
- Achievement tracking
- Lesson completion statistics

### Purchase Page
- Simulated payment interface
- Lesson preview and pricing
- Security badges and guarantees
- Instant access after purchase

## 🎨 Design System

### Color Palette
- Primary: Blue (#0ea5e9) to Green (#10b981) gradients
- Success: Green (#22c55e)
- Warning: Orange (#f97316)
- Error: Red (#ef4444)
- Neutral: Gray scale for text and backgrounds

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold weights with proper hierarchy
- Body: Regular weight with 1.5 line height
- Small text: Muted colors for secondary information

### Components
- Rounded corners (0.75rem radius)
- Soft shadows for depth
- Hover animations and transitions
- Mobile-first responsive breakpoints
- Card-based layouts with consistent spacing

## 🔒 Security Features

- Input validation and sanitization
- Secure API routes with proper error handling
- XSS prevention in content rendering
- CORS configuration for API access
- Environment variable protection

## 🧪 Testing & Quality

### Code Quality
- TypeScript for type safety
- ESLint configuration
- Consistent coding standards
- Component-based architecture

### Performance
- Next.js automatic optimizations
- Image optimization and lazy loading
- Efficient bundle splitting
- Fast page transitions

## 📊 Analytics & Monitoring

### User Progress Tracking
- Lesson completion rates
- Quiz performance analytics
- Learning journey visualization
- Achievement unlocking system

### Performance Metrics
- Page load times
- API response times
- User engagement metrics
- Conversion tracking

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **RBI** - Reserve Bank of India for financial education resources
- **SEBI** - Securities and Exchange Board of India for investment guidelines
- **NPCI** - National Payments Corporation of India for UPI information
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon system
- **Next.js Team** - For the amazing React framework

## 📞 Support

For support, email support@financebuddy.app or create an issue in the GitHub repository.

---

**Made with ❤️ for financial literacy in India**

Visit the live application: [https://finance-buddy.vercel.app](https://finance-buddy.vercel.app)
