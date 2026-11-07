# 🍕 Pizza Time — Restaurant Web Application

A full-stack restaurant ordering platform built with **Next.js 13** (frontend) and **NestJS** (backend). Users can browse restaurants on an interactive map, explore menus by category, add items to cart, and place orders. Admins can manage restaurants, products, and orders through a dedicated panel.

---

## 🗂️ Project Structure

```
restaurant/
├── restaurant-tailwind-nextjs-free-main/   # Next.js frontend
│   ├── app/
│   │   ├── components/
│   │   │   ├── map/          # Google Maps integration
│   │   │   ├── categories/   # Menu categories & products
│   │   │   ├── Navbar/       # Auth, profile, admin panel
│   │   │   ├── Modal/        # Cart & checkout
│   │   │   └── Banner/       # Hero section
│   │   ├── Page/product/     # Admin CRUD pages
│   │   └── page.tsx          # Home page
│   └── public/               # Static assets
└── backend/                  # NestJS REST API
    └── src/
        ├── user/             # Auth & user management
        ├── product/          # Products & categories
        └── panier/           # Cart & orders
```

---

## ✨ Features

**Customer**
- Browse restaurants on an interactive Google Maps map
- View restaurant menus grouped by category
- Add products to cart with supplements
- Place and track orders
- User registration, login, Google OAuth
- Password reset via email or SMS code
- Profile management (address, payment)

**Admin**
- Manage restaurants, categories, products
- View and manage all orders
- User management panel (via react-admin)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 13, React, TypeScript, Tailwind CSS |
| Maps | Google Maps API (`@react-google-maps/api`) |
| State | Valtio |
| Backend | NestJS, TypeScript |
| Auth | JWT, Google OAuth |
| Notifications | Email (nodemailer), SMS |
| Admin UI | react-admin |

---

## ⚙️ Prerequisites

- Node.js >= 18
- npm or yarn
- A running backend server (see backend setup below)
- Google Maps API key

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/blidaoui/restaurant.git
cd restaurant
```

### 2. Frontend setup

```bash
cd restaurant-tailwind-nextjs-free-main
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Backend setup

```bash
cd backend
npm install
npm run start:dev
```

The API runs on [http://localhost:8080](http://localhost:8080)

---

## 🔑 Environment Variables

Create a `.env.local` file in `restaurant-tailwind-nextjs-free-main/`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Create a `.env` file in `backend/`:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MAIL_USER=your_email
MAIL_PASS=your_email_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

---

## 📦 Available Scripts

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |

### Backend

| Command | Description |
|---|---|
| `npm run start:dev` | Start with hot reload |
| `npm run build` | Compile TypeScript |
| `npm run start:prod` | Start production build |

---

## 🗺️ Key Pages

| Route | Description |
|---|---|
| `/` | Home — banner, features, map |
| `/components/categories` | Restaurant menu |
| `/components/Navbar/MonCompte/Profile` | User profile |
| `/components/Navbar/MonCompte/GererRestaurant` | Admin panel |
| `/components/Navbar/MonCompte/Commande` | Order management |
| `/Page/product/AjouterCategorie` | Add category (admin) |
