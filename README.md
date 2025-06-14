# StageWize - Visual Lead Management SaaS CRM

<div align="center">
  <h1>🎯 StageWize</h1>
  <p><strong>Visual Lead CRM for Closer Teams</strong></p>
  <p>Drag, drop, and close deals faster—with zero bloat.</p>
</div>

## 🚀 Live Pages

- **[Landing Page](/)** - Hero, features, and conversion-focused homepage
- **[Interactive Demo](/demo)** - Full kanban experience with sample data
- **[Pricing](/pricing)** - 4-tier pricing structure from free demo to enterprise

## ✨ Features

### 🧠 Core Functionality
- **Visual Kanban Board**: Drag-and-drop leads across 5 stages (New → Contacted → Follow-Up → Won/Lost)
- **Lead Management**: Full CRUD operations for lead data
- **Demo Mode**: Interactive experience with sample leads and 1-lead limit
- **CSV Export**: Export complete lead database to CSV format
- **Real-time Updates**: Instant UI updates with toast notifications

### 🎭 Demo Experience
- **Sample Leads**: Pre-loaded with realistic leads across all pipeline stages
- **Interactive Drag & Drop**: Move demo leads between stages to experience the workflow
- **Limited Creation**: Add 1 personal lead to test full functionality
- **Visual Feedback**: Demo leads clearly marked and non-editable
- **Data Resets**: Fresh demo experience on every page refresh
- **Dismissible Banner**: Clear demo mode notification with pricing link

### 🎨 Design & UX
- **StageWize Branding**: Dark theme with electric blue & yellow accents
- **Responsive Design**: Mobile-first with horizontal scroll on small screens
- **Modern UI**: Clean cards with hover effects and status indicators
- **Conversion Optimized**: Landing page designed for lead generation

### 📱 Mobile Support
- **Touch-Friendly**: Optimized drag-and-drop for mobile devices
- **Floating Action Button**: Quick lead creation on mobile
- **Horizontal Scroll**: Easy column navigation on small screens

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom brand colors
- **Drag & Drop**: `@dnd-kit` for smooth kanban interactions
- **State Management**: Zustand for global state
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Fonts**: Anton (headers) + Montserrat (body)

## 📁 Project Structure

```
/app
  page.tsx           # Landing page with hero, features, CTA
  layout.tsx         # Root layout with Toaster
  globals.css        # Global styles & brand theme
  /demo
    page.tsx         # Interactive demo with kanban board
  /pricing
    page.tsx         # 4-tier pricing table
/components
  Board.tsx          # Main kanban board with DnD
  Column.tsx         # Individual stage columns
  LeadCard.tsx       # Draggable lead cards
  LeadForm.tsx       # Add/edit lead modal form
  Header.tsx         # App header with branding
  Modal.tsx          # Reusable modal component
  DemoBanner.tsx     # Demo mode notification banner
/lib
  leads.ts           # localStorage utilities
/store
  useLeads.ts        # Zustand store for lead state
/types
  index.ts           # TypeScript definitions
/public
  logo.svg           # WozWize owl logo
```

## 💰 Pricing Tiers

| Plan | Features | Price |
|------|----------|-------|
| **Free Demo** | LocalStorage only, Max 1 lead, Auto-wipe on refresh | $0 |
| **StageWize Solo** | 1 user, Hosted cloud DB, Full features, CSV import/export | $19/mo or $190/yr |
| **StageWize Team** | Up to 5 users, Multi-user pipeline, Admin tools, WhatsApp + Email | $59/mo or $590/yr |
| **StageWize Agency** | White-label branding, Client staging, Dedicated DB, Priority support | $149/mo + $1500 setup |

## 🎯 Lead Pipeline Stages

1. **New** - Fresh leads just entered
2. **Contacted** - Initial contact made
3. **Follow-Up** - Ongoing conversations
4. **Won** - Successfully closed deals
5. **Lost** - Opportunities that didn't convert

## 🎭 Demo Experience

### Pre-loaded Sample Leads
- **Alex Rodriguez** (New) - Social media lead interested in automation
- **Sarah Johnson** (Contacted) - Enterprise prospect, follow-up scheduled
- **Michael Chen** (Follow-Up) - Proposal sent, awaiting CEO approval
- **Emma Thompson** (Won) - Contract signed, 12-month premium package
- **David Kim** (Lost) - Went with competitor, future opportunity

### Interactive Features
- **Drag & Drop**: Move any lead between pipeline stages
- **Visual Feedback**: Smooth animations and status updates
- **Add Your Lead**: Create 1 personal lead to test the full workflow
- **Edit Restrictions**: Demo leads are read-only, yours are fully editable
- **Dismissible Banner**: Clear demo mode indication with upgrade path

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd stagewize

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page!

### Page Routes
- `/` - Landing page with hero and features
- `/demo` - Interactive kanban demo
- `/pricing` - Pricing tiers and FAQ

## 💾 Data Storage

StageWize demo stores all data locally in your browser using `localStorage`. This means:
- ✅ **No backend required** - works completely offline
- ✅ **Instant performance** - no API calls or loading
- ✅ **Privacy-first** - your data never leaves your device
- ⚠️ **Device-specific** - data doesn't sync across browsers/devices
- ⚠️ **Demo resets** - demo data clears on page refresh

## 📊 Lead Data Fields

Each lead contains:
- **Name** (required)
- **Email** (required) 
- **Phone**
- **Company**
- **Lead Source** (dropdown)
- **Status** (pipeline stage)
- **Notes** (free text)
- **Created At** / **Updated At** (auto-generated)

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Customization

#### Brand Colors
Edit `tailwind.config.ts` to customize colors:
```typescript
colors: {
  'electric-blue': '#0080FF',    // Primary accent
  'electric-yellow': '#FFFF00',  // Secondary accent
  'dark-bg': '#0a0a0a',         // Background
  'card-bg': '#1a1a1a',         // Card background
}
```

#### Pipeline Stages
Modify stages in `components/Board.tsx`:
```typescript
const columns = [
  { id: 'New', title: 'New Leads' },
  // Add/modify stages here
]
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

### Static Export
```bash
npm run build
# Deploy the generated static files
```

## 🎪 SaaS Features

### Landing Page
- **Hero Section**: Clear value proposition with dual CTAs
- **Features Grid**: Visual showcase of core functionality
- **Social Proof**: "Who it's for" targeting specific personas
- **Conversion Optimized**: Multiple paths to demo and pricing

### Demo Mode
- **Interactive Experience**: Full kanban functionality with sample data
- **Lead Limits**: 1 user lead maximum to encourage upgrades
- **Data Reset**: Fresh experience on every page load
- **Upgrade Prompts**: Strategic messaging throughout the experience

### Pricing Strategy
- **Freemium Model**: Free demo to reduce friction
- **Clear Tiers**: Solo → Team → Agency progression
- **Value Stacking**: Features increase with price points
- **Enterprise Option**: Custom pricing for agencies

## 🔮 Roadmap

### Phase 1: MVP (Current)
- ✅ **Landing Page**: Hero, features, conversion optimization
- ✅ **Interactive Demo**: Full kanban with sample data
- ✅ **Pricing Page**: 4-tier structure with FAQ
- ✅ **Demo Restrictions**: 1-lead limit, data resets
- ✅ **Mobile Responsive**: Touch-friendly drag & drop

### Phase 2: Backend Integration
- 🔄 **User Authentication**: Sign up, login, password reset
- 🔄 **Cloud Database**: PostgreSQL with Prisma ORM
- 🔄 **Payment Processing**: Stripe integration
- 🔄 **Email System**: Transactional emails with Resend
- 🔄 **API Routes**: RESTful endpoints for all operations

### Phase 3: Advanced Features
- 📋 **Team Collaboration**: Multi-user workspaces
- 📊 **Analytics Dashboard**: Conversion metrics and reporting
- 🔔 **Notification System**: Email and WhatsApp reminders
- 🎨 **White-Label Mode**: Custom branding for agencies
- 📱 **PWA Support**: Offline-first mobile app

### Phase 4: Enterprise
- 🏢 **Multi-Tenant Architecture**: Isolated client environments
- 🔌 **API Access**: Webhooks and third-party integrations
- 📈 **Advanced Reporting**: Custom dashboards and exports
- 🛡️ **Enterprise Security**: SSO, audit logs, compliance
- 🎯 **Custom Onboarding**: Dedicated success management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 About StageWize

StageWize transforms traditional lead management from static spreadsheets into an engaging visual experience. Built for solo operators, consultants, and small sales teams who need powerful lead tracking without the complexity of enterprise CRM systems.

**Perfect for:**
- 💼 **Freelancers & Consultants** - Track client opportunities visually
- 🏢 **Small Businesses** - Manage sales pipeline without complexity  
- 🚀 **Startups** - Lightweight CRM for early-stage sales
- 📊 **Sales Teams** - Collaborative lead progression tracking
- 🏢 **Agencies** - White-label client relationship management

**Business Model:**
- **Freemium**: Interactive demo drives conversions
- **SaaS Tiers**: Solo ($19) → Team ($59) → Agency ($149)
- **Value Ladder**: Features and user limits scale with pricing
- **Enterprise Sales**: Custom solutions for larger organizations

---

<div align="center">
  <p>Built with ❤️ using Next.js 14 & TypeScript</p>
  <p><strong>StageWize</strong> - Where leads flow like visual magic ✨</p>
  <p>
    <a href="/">🏠 Home</a> • 
    <a href="/demo">🎭 Demo</a> • 
    <a href="/pricing">💰 Pricing</a>
  </p>
</div> 