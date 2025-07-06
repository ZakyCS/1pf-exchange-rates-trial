# 📦 1.PF Exchange Rates Trial

A full-stack currency exchange rates web app with real-time API integration, PostgreSQL database, and a modern responsive UI. Built using **Next.js 15** (React 19), **Spring Boot 3.5.3** (Java 21), and **PostgreSQL 17**.

---

## 🚀 v1.0.0 – Stable Release

🎉 First stable release with full backend, database, caching, and frontend features!

### 🔧 Backend Features

- ✅ **Spring Boot 3.5.3** (Java 21)
- ✅ **PostgreSQL 17** database
- ✅ **Flyway** for automatic schema migrations (including initial table creation)
- ✅ **Caffeine** in-memory caching (1-hour TTL)
- ✅ `/api/exchange-rates` REST endpoint
- ✅ Uses **Spring Data JPA (Hibernate)** for persistence
- ✅ Includes basic unit tests

### 🎨 Frontend Features

- ✅ **Next.js 15** (React 19, TypeScript)
- ✅ Responsive layout with **Tailwind CSS**
- ✅ Dark/Light mode (via `next-themes`)
- ✅ **Cloud/DB toggle** for switching data source
- ✅ Clean UI with **Lucide** icons

---

## 🐳 Dockerized Setup

### ⚙️ Prerequisites

Before running the application with Docker Compose, ensure you have the following installed:

- **Docker Desktop** (recommended)  
  Includes Docker Engine and Docker Compose, providing a seamless setup experience for Windows, macOS, and Linux.  
  Download it here: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

- Alternatively, install **Docker Engine** and **Docker Compose** separately if not using Docker Desktop.

Having these installed ensures you can build, run, and manage the application containers without additional setup.


### 📁 Project Structure

```
monorepo/
├── backend/     # Spring Boot app
├── frontend/    # Next.js app
├── .env         # Environment variables
├── .gitignore
├── .gitattributes
├── docker-compose.yml
├── README.md
└── LICENSE
```

### 🔐 .env Example

```env
# Get your API key from https://developers.erstegroup.com/
WEB_API_KEY=your_api_key_here

POSTGRES_DB=trialdatabase
POSTGRES_USER=trialuser
POSTGRES_PASSWORD=trialpass
POSTGRES_PORT=5432
```

### ▶️ Run with Docker Compose

1. **Create a `.env` file:**

   Copy the `.env.example` file to `.env` (e.g., by duplicating or renaming it),  
   then open `.env` and update the values with your own configuration.

2. **Build and run:**

   ```bash
   docker compose build
   docker compose up
   ```

3. **Access the application:**

   - Frontend (open in browser): [http://localhost:3000](http://localhost:3000)
   
   <br>

   > The backend API is available at `http://localhost:8080/api/exchange-rates`.  
   > It supports an optional `usedb` query parameter (`true` by default) to switch data sources between database and external API.  
   >
   > Typically, you don't need to call the API directly, as the frontend handles data fetching and caching automatically.

4. **Stop and clean up:**

   ```bash
   docker compose down
   ```

---

## 📝 License

MIT © 2025
