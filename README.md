# StageWize - Visual Lead Management CRM

<div align="center">
  <h1>🎯 StageWize</h1>
  <p><strong>Visual Lead Pipeline Management for Solo Operators & Sales Teams</strong></p>
  <p>A modern, client-side CRM with kanban-style lead management built with Next.js 14</p>
</div>

## ✨ Features

### 🧠 Core Functionality
- **Visual Kanban Board**: Drag-and-drop leads across 5 stages (New → Contacted → Follow-Up → Won/Lost)
- **Lead Management**: Full CRUD operations for lead data
- **Local Storage**: All data persisted in browser localStorage (no backend required)
- **CSV Export**: Export complete lead database to CSV format
- **Real-time Updates**: Instant UI updates with toast notifications

### 🎭 Interactive Demo Mode
- **Sample Leads**: Pre-loaded with realistic leads across all pipeline stages
- **Drag & Drop**: Move demo leads between stages to experience the workflow
- **Limited Creation**: Add 1 personal lead to test full functionality
- **Visual Feedback**: Demo leads clearly marked and non-editable
- **Data Resets**: Fresh demo experience on every page refresh

### 🎨 Design & UX
- **StageWize Branding**: Dark theme with electric blue & yellow accents
- **Responsive Design**: Mobile-first with horizontal scroll on small screens
- **Glitch Effects**: Subtle cyberpunk-inspired animations and textures
- **Modern UI**: Clean cards with hover effects and status indicators

### 📱 Mobile Support
- **Touch-Friendly**: Optimized drag-and-drop for mobile devices
- **Floating Action Button**: Quick lead creation on mobile
- **Horizontal Scroll**: Easy column navigation on small screens

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

Open [http://localhost:3000](http://localhost:3000) to see StageWize in action!

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
  layout.tsx          # Root layout with Toaster
  page.tsx           # Main dashboard page
  globals.css        # Global styles & brand theme
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
```

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

## 💾 Data Storage

StageWize stores all data locally in your browser using `localStorage`. This means:
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

## 🎪 MVP Limitations

This is an MVP focused on core functionality:
- **Demo mode active** - 1 user lead maximum, demo data resets
- **No user authentication** - single-user local storage
- **No backend integration** - purely client-side
- **No data sync** - device-specific storage
- **No team collaboration** - designed for individual use
- **No advanced reporting** - basic lead counting only

## 🔮 Future Enhancements

### Potential Upgrades
- 🔐 **User Authentication**: Multi-user support
- 🌐 **Backend Integration**: API-based data storage
- 📈 **Analytics Dashboard**: Lead conversion metrics
- 🔄 **Data Sync**: Cross-device synchronization
- 👥 **Team Features**: Collaboration and assignment
- 📧 **Email Integration**: Direct email sending
- 🎨 **White-Label Mode**: Custom branding options
- 📱 **PWA Support**: Offline-first mobile app

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

Perfect for:
- 💼 **Freelancers & Consultants** - Track client opportunities
- 🏢 **Small Businesses** - Manage sales pipeline visually  
- 🚀 **Startups** - Lightweight CRM for early-stage sales
- 📊 **Sales Teams** - Visual lead progression tracking

---

<div align="center">
  <p>Built with ❤️ using Next.js 14 & TypeScript</p>
  <p><strong>StageWize</strong> - Where leads flow like visual magic ✨</p>
</div> 