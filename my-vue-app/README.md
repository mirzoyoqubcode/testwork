# Business Analytics Dashboard

A Vue 3 Single Page Application (SPA) for analyzing business data including sales, orders, stocks, and incomes.

## Features

- **Four Main Pages**: Sales, Orders, Stocks, and Incomes
- **Interactive Charts**: Visual data representation using Chart.js
- **Data Tables**: Detailed tabular data with formatting
- **Filters**: Date range and record limit filtering
- **Pagination**: Navigate through large datasets
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time API Integration**: Connects to Laravel API backend

## Technology Stack

- **Frontend**: Vue 3 with Composition API
- **Router**: Vue Router 4
- **Charts**: Chart.js with vue-chartjs
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS with modern design principles

## API Integration

The application connects to a Laravel API with the following endpoints:

- `GET /api/sales` - Sales data
- `GET /api/orders` - Orders data  
- `GET /api/stocks` - Stock data (current day only)
- `GET /api/incomes` - Income data

### API Configuration

- **Host**: 109.73.206.144:6969
- **Authentication**: API key in query parameter
- **Data Format**: JSON with pagination
- **Date Format**: Y-m-d
- **Max Records**: 500 per request

## Project Structure

```
src/
├── components/
│   ├── DataChart.vue      # Reusable chart component
│   └── DataTable.vue      # Reusable table component
├── views/
│   ├── Sales.vue          # Sales page
│   ├── Orders.vue         # Orders page
│   ├── Stocks.vue         # Stocks page
│   └── Incomes.vue        # Incomes page
├── services/
│   └── api.ts            # API service layer
├── router/
│   └── index.ts          # Vue Router configuration
├── App.vue               # Main application component
├── main.ts              # Application entry point
└── style.css            # Global styles
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Usage

### Navigation
Use the navigation bar to switch between different data views:
- **Sales**: View sales data with bar charts
- **Orders**: View order data with line charts
- **Stocks**: View current stock levels with doughnut charts
- **Incomes**: View income data with pie charts

### Filtering
Each page includes filters for:
- **Date Range**: Select from and to dates
- **Record Limit**: Choose how many records to display (50, 100, 200, 500)

### Pagination
Navigate through large datasets using the pagination controls at the bottom of each page.

## Features by Page

### Sales Page
- Bar chart showing sales by product
- Detailed sales table with ID, date, product, quantity, price, and total
- Date range filtering

### Orders Page
- Line chart showing orders over time
- Detailed orders table with order number, customer, status, and amount
- Date range filtering

### Stocks Page
- Doughnut chart showing stock quantities by product
- Current stock levels table with warehouse information
- Date filtering (current day data only)

### Incomes Page
- Pie chart showing income by source
- Detailed income table with source, amount, and description
- Date range filtering

## Development

### Adding New Features
1. Create new components in the `components/` directory
2. Add new views in the `views/` directory
3. Update router configuration if needed
4. Add API methods in the `services/api.ts` file

### Styling
The application uses a modern, clean design with:
- Consistent color scheme
- Responsive layout
- Card-based components
- Hover effects and transitions

## Deployment

The application can be deployed to any static hosting service:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting service

### Recommended Hosting Options
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
