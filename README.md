# Prime Store - E-Commerce Shopping Cart Application

Prime Store is a modern e-commerce shopping cart application built using Next.js 14, Zustand, Tailwind CSS, and Hyper UI components. The application features a dynamic product listing, comprehensive cart management, and persistent session storage using Vercel KV. It uses dummy data from [dummyjson.com](https://dummyjson.com) for product information.

## Features

### Product Listing Page
- Displays a grid layout with 6-10 product cards.
- Each product card includes:
  - Product image
  - Product name
  - Product price (formatted for currency in USD, with localized currency conversion on the UI level)
  - "Add to Cart" button

### Add to Cart Functionality
- Clicking the "Add to Cart" button on a product:
  - Adds the selected product to the virtual shopping cart.
  - Updates the cart icon or counter to reflect the number of added items.
  - Provides visual feedback to confirm the item’s addition.

### Cart Page
- A dedicated cart page allows users to:
  - View a list of added products with:
    - Product image
    - Product name
    - Product price
    - Quantity selector (up/down buttons or input field)
    - "Remove Item" button to delete specific products
  - View a cart summary with:
    - Subtotal: Total cost of all items based on their quantity and price
    - Discounts: Ability to apply fixed or percentage discounts
    - Total price: Final price including any discounts
  - A checkout button: Redirects to a simulated checkout page or provides a message indicating successful cart addition.

### Currency Formatting
- Product prices are fetched in USD from [dummyjson.com](https://dummyjson.com).
- A localized currency formatter is integrated for display purposes.
- If currency formatting fails, prices default to USD.

### Persistent Cart Storage
- Cart data is stored both in local storage and on the server.
- The cart syncs when the web app is first accessed by the user on a device.
- Updates to the cart are synchronized with Vercel KV after any operation.

## Technologies Used

- **Frontend Framework**: Next.js 14
- **State Management**: Zustand
- **Styling**: Tailwind CSS, Hyper UI components
- **Data Source**: [dummyjson.com](https://dummyjson.com) for product data
- **Persistent Session Storage**: Vercel KV

## Getting Started

To run this project locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
