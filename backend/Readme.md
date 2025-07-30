# Revenue Intelligence Dashboard - Backend

This is the backend component of the Revenue Intelligence Dashboard, built with Node.js and Express. It provides RESTful APIs to serve and manage revenue-related data used by the frontend dashboard.

---

## 🛠 Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Minimalist web framework for API creation.
- **dotenv**: Environment variable manager.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.
- **Body-parser**: Middleware to parse incoming JSON requests.
- **MongoDB**: NoSQL database for storing uploaded JSON data.
- **Mongoose**: ODM library for MongoDB.
- **Nodemon**: Auto-restart the server on code changes (for development).

---

## 🚀 Features

- ✅ REST API to upload and retrieve:
  - Quarterly revenue data.
  - Revenue bridge data.
  - Country-wise revenue.
  - Regional revenue.
  - Customer concentration.
- ✅ Field validation and normalization.
- ✅ MongoDB integration for persistent data storage.
- ✅ Middleware for centralized error handling and JSON parsing.
- ✅ CORS enabled for frontend-backend interaction.

---

## 📂 API Endpoints

| Method | Endpoint                             | Description                              |
|--------|--------------------------------------|------------------------------------------|
| POST   | `/api/v1/quarterly`                  | Upload quarterly revenue data            |
| GET    | `/api/v1/quarterly`                  | Retrieve quarterly revenue data          |
| POST   | `/api/v1/revenue-bridge`             | Upload revenue bridge data               |
| GET    | `/api/v1/revenue-bridge`             | Retrieve revenue bridge data             |
| POST   | `/api/v1/countries`                  | Upload country-wise revenue data         |
| GET    | `/api/v1/countries`                  | Retrieve country-wise revenue data       |
| POST   | `/api/v1/regions`                    | Upload region-wise revenue data          |
| GET    | `/api/v1/regions`                    | Retrieve region-wise revenue data        |
| POST   | `/api/v1/customer-concentration`     | Upload customer concentration data       |
| GET    | `/api/v1/customer-concentration`     | Retrieve customer concentration data     |

---



