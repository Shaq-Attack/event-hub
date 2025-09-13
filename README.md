# EventHub 🎪

A professional, modern event booking platform built with React + TypeScript + Vite, showcasing KendoReact components.

## ✨ Features

- **Beautiful UI**: Modern design with gradient backgrounds and glass-morphism effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Professional Components**: Built using KendoReact free components for enterprise-grade UI
- **Event Management**: Browse, filter, and book events with ease
- **Admin Dashboard**: Complete management interface for events and bookings
- **Booking System**: Multi-step booking process with confirmation dialogs
- **Real-time Updates**: Dynamic progress bars and availability indicators

## 🎨 Pages

### 1. Home Page
- Hero section with call-to-action
- Featured events grid with cards
- Statistics showcase
- Responsive layout with smooth animations

### 2. Browse Events Page
- Advanced filtering by category, location, and date
- Beautiful event cards with all details
- Real-time search results
- Pagination and sorting

### 3. Event Details Page
- Comprehensive event information
- Tabbed interface (Overview, Lineup, Venue Info)
- Multi-step booking wizard
- Progress indicators and availability status
- Success notifications

### 4. My Bookings Page
- Personal booking management
- Status tracking (Confirmed, Pending, Cancelled)
- Cancellation functionality with confirmation dialogs
- Responsive booking cards

### 5. Admin Dashboard
- Overview with key metrics and statistics
- Event management with progress indicators
- Booking management and customer details
- Analytics with category and revenue breakdowns
- Add new events functionality

## 🛠️ KendoReact Components Used

1. **AppBar** - Navigation header
2. **Button** - Interactive elements throughout
3. **Badge** - Status indicators and categories
4. **DropDownList** - Filter selections
5. **DatePicker** - Date selection for filters and booking
6. **TabStrip** - Event details organization
7. **Dialog** - Confirmation modals and forms
8. **Input/NumericTextBox** - Form inputs
9. **Notification** - Success/error messages
10. **ProgressBar** - Sales progress and loading indicators
11. **TileLayout** - Responsive grid layouts (customized)

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start development server:**
   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   └── Layout.tsx      # Page layout wrapper
├── pages/              # Route-based pages
│   ├── Home.tsx        # Landing page
│   ├── BrowseEvents.tsx # Event browsing
│   ├── EventDetails.tsx # Individual event
│   ├── MyBookings.tsx  # User bookings
│   └── AdminDashboard.tsx # Admin interface
├── data/               # Mock data
│   ├── events.ts       # Event data and types
│   └── bookings.ts     # Booking data and types
├── App.tsx             # Main app with routing
├── App.css             # Global styles
└── main.tsx           # App entry point
```

## 🎯 Key Features Demonstrated

- **Professional Design**: Modern UI with consistent theming
- **Component Architecture**: Well-structured React components
- **TypeScript Integration**: Full type safety throughout
- **Responsive Design**: Mobile-first approach
- **State Management**: Local state with React hooks
- **Form Handling**: Multi-step forms with validation
- **Modal Interactions**: Confirmations and detail views
- **Data Visualization**: Progress bars and statistics
- **Accessibility**: Semantic HTML and ARIA labels

## 🌟 Design Highlights

- **Glass Morphism**: Translucent backgrounds with backdrop blur
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: Hover effects and transitions
- **Professional Color Scheme**: Consistent brand colors
- **Card-based Layout**: Modern card design patterns
- **Typography**: Clear hierarchy and readability

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px-1199px (Adapted grids)
- **Mobile**: <768px (Stacked layout)

## 🔧 Technologies

- **React 19+** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **KendoReact** - Professional UI components
- **React Router** - Client-side routing
- **CSS3** - Modern styling with flexbox/grid

## 🎨 Styling Architecture

- **CSS Custom Properties** - Consistent theming
- **Flexbox & Grid** - Modern layout techniques
- **Media Queries** - Responsive design
- **Backdrop Filter** - Glass morphism effects
- **CSS Transitions** - Smooth animations

## 📊 Mock Data

The app includes comprehensive mock data:
- **8 Events** across different categories
- **5 Sample Bookings** with various statuses
- **Multiple Categories** (Music, Tech, Sports, etc.)
- **Various Locations** across major US cities

---

Built with ❤️ using React + TypeScript + KendoReact
