# 📊 Revenue Intelligence Dashboard - Frontend

This is the frontend component of the Revenue Intelligence Dashboard, built using React. It provides an interactive user interface to visualize and analyze revenue-related data through charts and tables.

---

## 🚀 Technologies Used

- **React** – Frontend UI framework.
- **Vite** – Lightning-fast dev server and build tool.
- **Axios** – HTTP client for API communication.
- **React-ChartJS-2 & Chart.js** – For rendering interactive bar and pie charts.
- **Tailwind CSS** – Utility-first CSS framework for responsive styling.
- **React Router** *(optional for extension)* – Enables routing if needed in future versions.

---

## ✅ Functionalities Implemented

- 📤 **Data Upload**
  - Upload JSON files for:
    - `quarterly`
    - `countries`
    - `regions`
    - `revenue-bridge`
    - `customer-concentration`

- 📈 **Revenue Insights**
  - Bar Chart: Top 10 countries by revenue.
  - Bar Chart: Top 10 customers with highest Q3–Q4 revenue growth.
  - Pie Chart: Country-wise revenue distribution.

- 📋 **Customer Table**
  - Displays customer data with:
    - Search/filtering by name, region, and country.
    - Sortable columns: Customer Name, Q3, Q4, Growth %, Country, Region.

- 🔢 **Summary Card**
  - Displays aggregated financial metrics (e.g., total Q3, Q4, revenue growth).

- 📊 **Revenue Chart**
  - Line/bar chart showing trends for selected metrics.

- ❗ **Error Handling**
  - Clear messages for invalid file uploads or failed API calls.

- 📱 **Responsive Design**
  - Fully responsive layout using Tailwind CSS, optimized for desktop and mobile.

---

## 📁 Project Structure

