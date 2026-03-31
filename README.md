# ✈️ Travel Booking Frontend (Micro-Frontend Ready)

A modern **Travel Booking Web Application** inspired by MakeMyTrip, built with scalability in mind using a **Micro-Frontend Architecture approach**.

---

## 🚀 Project Overview

This application is designed to provide a seamless travel booking experience where users can search and explore **flights and hotels**.

The primary goal of this project is to build a **scalable frontend architecture** where each module can evolve independently and integrate easily in the future.

---

## 🧱 Tech Stack

* ⚛️ React 19 + TypeScript
* ⚡ Vite
* 🎨 Tailwind CSS
* 🔄 React Query (Server State)
* 🗂️ Redux Toolkit (Basic Setup)
* 🌐 Axios (API Layer)
* 🧭 React Router

---

## 📌 Current Features

### ✅ Implemented

* Home Page with Search Widget
* Hotel Search Functionality
* Authentication (Login / Signup)
* Responsive Layout (Header + Footer)

### 🚧 In Progress

* Flight Search Module (Search + Results)
* Booking Flow
* Payment Integration

### ⏳ Coming Soon Modules

* Flights ✈️
* Cabs 🚕
* Bus Tickets 🚌
* Travel Packages 🌍

👉 These modules currently display a **"Coming Soon"** page and will be developed as **independent micro-frontends**.

---

## 🧩 Micro-Frontend Vision

This project is structured to support a **Micro-Frontend Architecture**, where:

* Each feature (Flights, Hotels, Cabs, etc.) is an independent module
* Modules can be **developed and deployed separately**
* New features can be **plugged into the main app easily**
* Supports future integration using **Module Federation**

---

## 🔄 Application Workflow

```bash
Home Page
   ↓
Search (Flights / Hotels)
   ↓
Search Results
   ↓
(Upcoming) Details Page
   ↓
(Upcoming) Booking Flow
   ↓
(Upcoming) Payment
```

---

## ✈️ Flight Module (MVP Plan)

The Flight module is being built with a simple flow:

1. User enters:

   * From
   * To
   * Date

2. Frontend sends request:

   ```bash
   GET /api/flights?from=Delhi&to=Mumbai&date=YYYY-MM-DD
   ```

3. Backend:

   * Filters mock flight data
   * Returns matching results

4. Frontend:

   * Displays flight cards with:

     * Airline
     * Time
     * Duration
     * Price

---

## 📁 Project Structure (Simplified)

```bash
src/
 ├── components/
 │    ├── SearchWidget/
 │    ├── Flight/
 │    ├── Hotel/
 │
 ├── pages/
 │    ├── HomePage.tsx
 │    ├── SearchPage.tsx
 │    ├── FlightsSearchPage.tsx
 │
 ├── services/
 │    ├── api.ts
 │
 ├── store/
 │
 ├── routes/
 │
 └── App.tsx
```

---

## ⚙️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Backend Setup

Make sure backend is running on:

```bash
http://localhost:5000
```

---

## 🎯 Future Enhancements

* Flight & Hotel Details Pages
* Complete Booking Flow
* Payment Gateway Integration
* User Profile (My Trips)
* Real API Integration (Amadeus / Skyscanner)
* Full Micro-Frontend Setup (Module Federation)

---

## 💡 Key Highlights

* Scalable Architecture
* Clean UI with Tailwind
* API-driven design
* Micro-frontend ready

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR.

---

## 📌 Author

**Shreya Verma**
Frontend Developer | React | Micro-Frontend Enthusiast

---

## ⭐ Support

If you like this project, please ⭐ the repo and share your feedback!
