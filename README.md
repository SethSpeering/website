# TinyTeam - E-Commerce Site

A modern, responsive e-commerce website for lawn mowers built with React and Vite.

## Features

- 🛒 **Shopping Cart**: Full cart functionality with add, remove, and quantity updates
- � **Google Sign-In**: Secure authentication with Google OAuth
- 📅 **Smart Scheduling**: Book appointments and sync with Google Calendar
- 🔍 **Category Filtering**: Filter products by type (Electric, Gas, Robotic, Manual)
- 💾 **Persistent Cart**: Cart data saved to localStorage
- 📱 **Responsive Design**: Works great on desktop, tablet, and mobile
- ⭐ **Product Reviews**: Display ratings for each product
- 💰 **Dynamic Pricing**: Automatic tax and shipping calculations
- 🎨 **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

- **React 18** - UI framework
- **React Router** - Client-side routing
- **Firebase** - Authentication and backend services
- **Google Calendar API** - Appointment scheduling
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features

## Getting Started

### Prerequisites

Before running this project, you need to set up Firebase and Google Calendar API. See the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:3000`

## Project Structure

```
website/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── GoogleSignIn.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Cart.jsx
│   │   └── Schedule.jsx
│   ├── context/          # React Context for state management
│   │   ├── CartContext.jsx
│   │   └── AuthContext.jsx
│   ├── config/           # Configuration files
│   │   └── firebase.js
│   ├── data/             # Product data
│   │   └── products.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── styles.css        # Global styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── SETUP_GUIDE.md        # Firebase & Google Calendar setup guide
└── package.json          # Dependencies
```

## Features in Detail

### Google Authentication
- Secure sign-in with Google OAuth
- User profile display in header
- Persistent authentication state
- Access to Google Calendar for scheduling

### Smart Scheduling
- Book appointments for:
  - Product deliveries
  - Product demonstrations
  - Lawn care consultations
  - Maintenance training
- Automatic sync with Google Calendar
- Email confirmations
- Customizable appointment notes
- Multiple time slot options

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Persistent storage using localStorage
- Real-time cart count in header
- Automatic subtotal, tax, and shipping calculations
- Free shipping on orders over $500

### Product Catalog
- 8 different lawn mower products
- Multiple categories: Electric, Gas, Robotic, Manual
- Detailed product information including features and ratings
- High-quality product images
- Stock availability indicators

### User Experience
- Smooth transitions and hover effects
- Responsive grid layout
- Easy navigation
- Clear call-to-action buttons
- Professional color scheme

## Customization

### Adding Products
Edit `src/data/products.js` to add or modify products:

```javascript
{
  id: 9,
  name: "Your Mower Name",
  price: 999.99,
  category: "Electric",
  image: "image-url",
  description: "Product description",
  features: ["Feature 1", "Feature 2"],
  inStock: true,
  rating: 4.5
}
```

### Styling
Modify `src/styles.css` to customize colors, fonts, and layout.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Author

Built with ❤️ for lawn care enthusiasts
