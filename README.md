# booking-microfrontend 
with functionality


This project contains a Base App (host) and 4 Micro Frontends (Food, Events, Cab, Hotel) using Webpack Module Federation with Redux.

## Ports
- base-app: http://localhost:3000
- mfe-food: http://localhost:3001
- mfe-events: http://localhost:3002
- mfe-cab: http://localhost:3003
- mfe-hotel: http://localhost:3004

## Quick Start

Open five terminals and run the following commands:

### MFEs first
```bash
cd mfe-food
npm install
npm start

cd ../mfe-events
npm install
npm start

cd ../mfe-cab
npm install
npm start

cd ../mfe-hotel
npm install
npm start
```

### Base App last
```bash
cd ../base-app
npm install
npm start
```

> **Important:** Start MFEs first so Base App can resolve remoteEntry.js files.

## Features

- **Role-based login:** `admin` can modify inventory, `user` can only add/remove items.
- **Shared Redux store:** Base App provides the store; MFEs access/update it via `useSelector` / `useDispatch` or imported action creators.
- **Dynamic Module Loading:** Categories (Food, Events, Cab, Hotel) are loaded dynamically from MFEs.
- **Cart Summary:** Base App shows a popup with all items across categories.

## Adding a new category / MFE

1. Create a new folder `mfe-<category>` with standard React app structure.
2. Create `App.jsx` and List component for the category.
3. Expose the main component via Module Federation (`./<Category>App`).
4. Update `base-app/webpack.config.js` remotes and HomePage lazy import.

## Admin Inventory UI

- Admin can add/edit/delete items in Base App.
- MFEs automatically reflect inventory changes from the shared Redux store.

## Redux Action Creators

- Base App exposes action creators (e.g., `addToCart`) via Module Federation.
- MFEs import them instead of dispatching string actions.
- Example:
```javascript
import { addToCart } from 'base_app/redux/cartActions';
dispatch(addToCart('food', { id: 1, qty: 1 }));
```

## Troubleshooting

- If you see `Cannot find remote entry`, check that MFEs are running.
- Redux state undefined → ensure MFEs are rendered inside `<Provider>`.
- Ports 3000–3004 must be free and accessible.

## Notes

- Each MFE only manages its own category.
- Base App handles login, navigation, cart, and admin inventory.
- Adding new category → just create new MFE and expose via Module Federation.


📋 Core Functionalities to Implement
1. Base Application (Host App)
File: src/App.jsx

javascript
// Main layout with navigation and content area
// Manages global state and routing
// Displays cart icon and summary modal
Key Components:

Navigation Panel: Left sidebar with 4 category links

Content Panel: Right area to display microfrontends

Cart/Star Icon: Fixed position icon showing total selections

Summary Modal: Popup showing all selected items across categories

2. Data Communication System
Approach: Redux + Local Storage

javascript
// src/store/store.js - Global state management
{
  user: { username: 'John' },
  selections: {
    food: [{ id: 1, name: 'Pizza', quantity: 2 }],
    cab: [{ id: 1, name: 'Sedan', quantity: 1 }],
    hotel: [{ id: 1, name: 'Deluxe Room', quantity: 3 }],
    events: [{ id: 1, name: 'Concert', quantity: 2 }]
  },
  summary: {
    totalItems: 8,
    categoryCounts: { food: 2, cab: 1, hotel: 3, events: 2 }
  }
}
3. Shared Data Structure (Agree on this first!)
javascript
// shared/dataSchema.js
const SELECTION_SCHEMA = {
  id: 'string|number',
  name: 'string',
  price: 'number', // optional
  quantity: 'number',
  category: 'food|cab|hotel|events',
  metadata: 'object' // additional category-specific data
}

const SUMMARY_SCHEMA = {
  username: 'string',
  totalItems: 'number',
  categoryCounts: {
    food: 'number',
    cab: 'number', 
    hotel: 'number',
    events: 'number'
  },
  selections: 'array[SELECTION_SCHEMA]'
}
4. Microfrontend Functionalities
Food Microfrontend (Port 3001)
javascript
// Features:
- Display food items list (mock data/API)
- Each item: Name, Image, Price, +/- buttons
- Add/remove items to cart
- Local state + sync with base app store
Cab Microfrontend (Port 3003)
javascript
// Features:
- Display cab types (Sedan, SUV, Luxury)
- Each cab: Type, Price per km, Capacity, +/- buttons
- Real-time availability check (mock)
Hotel Microfrontend (Port 3004)
javascript
// Features:
- Display hotel rooms (Standard, Deluxe, Suite)
- Each room: Type, Price/night, Amenities, +/- buttons
- Date selection (optional)
Events Microfrontend (Port 3002)
javascript
// Features:
- Display events (Concerts, Sports, Theater)
- Each event: Name, Date, Venue, Price, +/- buttons
- Capacity limits
5. Navigation & Routing
javascript
// Base App Routing
/ → Home/Dashboard
/food → Food Microfrontend
/cab → Cab Microfrontend  
/hotel → Hotel Microfrontend
/events → Events Microfrontend

// Query param handling: example.com?username=John
6. Cart & Summary System
Cart Icon Component:

Shows total item count badge

On click: Opens summary modal

Persistent across navigation

Summary Modal:

javascript
// Displays:
- Username (from URL params)
- Category-wise item counts
- List of all selected items
- Total calculations
- Checkout/clear options
