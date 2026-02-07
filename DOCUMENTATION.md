# Nicotex Clone - Full-Stack E-Commerce Application

## 📋 Project Overview

A complete full-stack e-commerce platform for smoking rehabilitation products (Nicotex-like). Built with modern technologies and production-ready architecture.

**Tech Stack:**
- **Frontend:** Next.js 13 (App Router), React 18, SWR, Axios
- **Backend:** Node.js, Express, Mongoose (MongoDB)
- **Authentication:** JWT-based admin authentication
- **Shipping Integration:** Shiprocket API
- **Database:** MongoDB

---

## 🏗️ Project Structure

```
nicotex_clone/
├── frontend/                    # Next.js frontend application
│   ├── app/
│   │   ├── layout.jsx          # Root layout with header/footer
│   │   ├── globals.css         # Global styles
│   │   ├── page.jsx            # Home page
│   │   ├── products/
│   │   │   ├── page.jsx        # Product listing page
│   │   │   └── [id]/
│   │   │       └── page.jsx    # Product detail page
│   ├── .env.local.example      # Frontend env template
│   ├── package.json            # Frontend dependencies
│   └── README.md               # Frontend setup instructions
│
├── backend/                     # Express backend API
│   ├── src/
│   │   ├── index.js            # Server entry point
│   │   ├── app.js              # Express app initialization
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection
│   │   ├── models/
│   │   │   ├── AdminUser.js    # Admin user schema with password hashing
│   │   │   ├── Product.js      # Product schema (title, price, stock, etc.)
│   │   │   └── Order.js        # Order schema with items and shipment tracking
│   │   ├── routes/
│   │   │   ├── auth.js         # Admin login endpoint
│   │   │   ├── products.js     # Product listing/detail (GET)
│   │   │   └── orders.js       # Order creation with Shiprocket integration
│   │   ├── services/
│   │   │   └── shiprocket.js   # Shiprocket API integration wrapper
│   │   ├── middlewares/
│   │   │   └── auth.js         # JWT verification middleware
│   │   └── seed/
│   │       └── seed.js         # Sample data seeder (admin + products)
│   ├── .env.example            # Backend env template
│   ├── package.json            # Backend dependencies
│   └── README.md               # Backend setup instructions
│
├── .gitignore                  # Git ignore configuration
├── .env.example                # Root env template
├── package.json                # Root package with dev scripts
└── README.md                   # Project overview (this file)
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+
- **npm** 8+
- **MongoDB** (local or cloud URI)

### 1. Clone and Setup

```bash
cd nicotex_clone
npm install
```

### 2. Configure Environment

**Root level (`.env`):**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
MONGODB_URI=mongodb://localhost:27017/nicotex_clone
JWT_SECRET=your_jwt_secret_here
SHIPROCKET_API_KEY=your_shiprocket_api_key
SHIPROCKET_API_SECRET=your_shiprocket_api_secret
PORT=4000
FRONTEND_URL=http://localhost:3000
```

**Backend (`.env` in `backend/`):**
```bash
# Same variables as root, or reference root .env
```

**Frontend (`.env.local` in `frontend/`):**
```bash
cp frontend/.env.local.example frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Seed Sample Data

```bash
npm run seed
```

This creates:
- Admin user: `admin` / `admin123`
- 2 sample products (Nicotex Patch, Nicotex Gum)

### 4. Run Development Servers

**Option A: Run both concurrently from root**
```bash
npm run dev
```

**Option B: Run separately**
```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Runs on http://localhost:4000

# Terminal 2 - Frontend
cd frontend
npm run dev
# Runs on http://localhost:3000
```

---

## 📡 API Endpoints

### Authentication

**POST `/api/auth/login`**
- Login with admin credentials
- Returns JWT token
- **Request:**
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "...mongo_id...",
      "username": "admin",
      "name": "Admin User"
    }
  }
  ```

### Products

**GET `/api/products`**
- Fetch all active products
- **Response:**
  ```json
  [
    {
      "_id": "...",
      "title": "Nicotex Patch - 7mg",
      "description": "Helps reduce cravings.",
      "price": 499,
      "stock": 100,
      "images": [],
      "status": "active"
    }
  ]
  ```

**GET `/api/products/:id`**
- Fetch single product by ID

### Orders

**POST `/api/orders`**
- Create new order and shipment
- **Request:**
  ```json
  {
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "address": "123 Main St, City, Country"
    },
    "items": [
      {
        "productId": "...mongo_id...",
        "quantity": 2
      }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "_id": "...",
    "customer": {...},
    "items": [...],
    "subtotal": 998,
    "shippingCharge": 0,
    "total": 998,
    "status": "created",
    "shipment": {
      "shiprocketOrderId": "SR_...",
      "awb": "AWB_...",
      "status": "created"
    }
  }
  ```

**GET `/api/orders/:id`**
- Fetch order status and shipment tracking

---

## 🗄️ Database Models

### AdminUser
```javascript
{
  username: String (unique),
  password: String (hashed with bcrypt),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  title: String,
  description: String,
  images: [String],
  price: Number,
  stock: Number,
  status: "active" | "inactive",
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  items: [{
    product: ObjectId (ref: Product),
    title: String,
    price: Number,
    quantity: Number
  }],
  subtotal: Number,
  shippingCharge: Number,
  total: Number,
  status: String ("created", "shipped", "delivered", etc.),
  shipment: {
    shiprocketOrderId: String,
    awb: String,
    status: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Features

1. **Password Hashing:** Admin passwords hashed with bcrypt (10 salt rounds)
2. **JWT Authentication:** Stateless token-based auth with expiry
3. **Middleware Protection:** Auth middleware protects admin-only routes
4. **Input Validation:** Basic validation on order/customer data (expandable)
5. **CORS:** Enabled for cross-origin frontend requests

---

## 📦 Frontend Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with product intro |
| `/products` | List all active products |
| `/products/[id]` | Product detail with quantity selection |
| `/cart` | Cart management (stub) |
| `/checkout` | Order placement (stub) |
| `/orders/[id]` | Order confirmation & tracking (stub) |

---

## 🚢 Shiprocket Integration

The `backend/src/services/shiprocket.js` provides a wrapper for:
- **Auth:** `getAuthToken()` — Obtain API token
- **Order Creation:** `createShipment(order)` — Create shipment and get tracking AWB

**Setup:**
1. Get API credentials from [Shiprocket Dashboard](https://shiprocket.in)
2. Add to `.env`:
   ```
   SHIPROCKET_API_KEY=your_key
   SHIPROCKET_API_SECRET=your_secret
   ```
3. Implement actual HTTP calls in `shiprocket.js` using Shiprocket's API endpoints

**Current Implementation:** Stub response for testing without credentials. Replace with real API calls once credentials are set.

---

## 📊 Admin Dashboard (MIS) - Future Development

Recommended additions:
1. **Admin Dashboard Page** — KPI cards (total orders, revenue, products sold)
2. **Product Management UI** — CRUD forms with stock/price updates
3. **Order Management UI** — View orders, update shipment status
4. **Reports Module:**
   - Date-wise sales chart
   - Product-wise breakdown
   - Inventory report
   - CSV/Excel export

---

## 🛠️ Development Workflows

### Add a New Product (via seed or API endpoint)

```bash
# Use seed script
npm run seed

# Or manually POST to /api/products (with admin auth)
curl -X POST http://localhost:4000/api/products \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Product",
    "price": 599,
    "stock": 50
  }'
```

### Place an Order

```bash
curl -X POST http://localhost:4000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "9876543210",
      "address": "456 Oak St, City, Country"
    },
    "items": [
      {"productId": "<product_id>", "quantity": 1}
    ]
  }'
```

---

## 📝 Environment Configuration

### `.env.example` (Root)
```env
MONGODB_URI=mongodb://localhost:27017/nicotex_clone
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
SHIPROCKET_API_KEY=your_shiprocket_api_key
SHIPROCKET_API_SECRET=your_shiprocket_api_secret
PORT=4000
FRONTEND_URL=http://localhost:3000
```

### `.env.local.example` (Frontend)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 🧪 Testing & Validation

1. **Backend tests:** Add Jest/Mocha (currently scaffolded)
2. **Frontend tests:** Add React Testing Library
3. **API testing:** Use Postman or curl
4. **DB validation:** Verify seed data with MongoDB Compass

---

## 📦 Production Deployment

### Backend (Node.js)
```bash
npm install --production
npm run start  # Uses node src/index.js
```
Deploy to: Heroku, Render, AWS EC2, DigitalOcean, etc.

### Frontend (Next.js)
```bash
npm run build
npm start
```
Deploy to: Vercel, Netlify, AWS S3 + CloudFront, etc.

### Database
- Use MongoDB Atlas for cloud hosting
- Update `MONGODB_URI` in production .env

---

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Schema Types](https://mongoosejs.com/docs/guide.html)
- [JWT.io](https://jwt.io/)
- [Shiprocket API Docs](https://shiprocket.in/docs)

---

## 📄 License

MIT

---

## 👤 Author

Created as a Nicotex clone reference implementation.

---

## 📞 Support & Issues

For bugs or questions, please raise an issue in the repository.
