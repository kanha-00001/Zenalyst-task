# 💼 Revenue Intelligence Dashboard

A full-stack web application for comprehensive revenue data analysis and visualization. This dashboard provides interactive charts, tables, and insights for quarterly, regional, country-wise, and customer-concentration revenue data with real-time JSON file upload capabilities.


## 🚀 Features

### 📊 Data Visualization
- **Quarterly Revenue Analysis** - Track revenue trends over time
- **Geographic Insights** - Visualize revenue by countries and regions
- **Customer Concentration** - Analyze revenue distribution by customer share
- **Revenue Bridge** - Interactive waterfall charts showing revenue changes

### 📈 Interactive Charts & Analytics
- Top 10 countries by revenue performance
- Top 10 revenue growth countries comparison
- Country-wise revenue distribution pie charts
- Dynamic filtering and sorting capabilities
- Real-time data updates

### 🔧 Data Management
- JSON file upload interface for seamless data ingestion
- Advanced filtering options in customer tables
- Export capabilities for reports and insights
- Data validation and error handling

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI framework
- **React Router** - Client-side routing
- **Chart.js / Recharts** - Interactive data visualization
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (v4.0 or higher)
- **Git** for version control

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/kanha-00001/Zenalyst-task.git
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.<mongodb>.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```



### 3 Start Backend Server

```bash
# Development mode with hot reload
npx nodemon server.js

# Production mode
npm start
```

The backend server will be running at `http://localhost:5000`

### 5️⃣ Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd revenue-dashboard-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend application will be running at `http://localhost:5173`






