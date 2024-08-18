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


2. **nstall Dependencies**

   ```bash
   npm install

3. **Set Up Environment Variables**

   ```bash
   cp .env.example .env.local

4. **Run the Development Server**

   ```bash
   npm run dev

5. **Open Your Browser**

   Navigate to http://localhost:3000 to view the application

## Project Structure

- **`/app`**: Contains the application's layout and routing:
  - **`/shop`**:
    - **`/products`**: Product listing and detail pages
    - **`/cart`**: Shopping cart management page
    - **`@topbar`**: Top navigation bar component
  - **`/landing`**: Landing page
  - **`/privacy-policy`**: Privacy policy page

- **`/hooks`**: Custom hooks for state management and API interactions.

- **`/services`**: API-related operations and service logic.

- **`/utils`**: Utility functions, including class name merging and currency formatting.

- **`/components`**: Reusable UI components like `ProductCard`, `CartItem`, `Counter`.

## Key Implementation Details

- **State Management**: Zustand is used for managing the cart's state and currency data efficiently.
- **Styling**: Tailwind CSS and Hyper UI components are used for responsive and modern styling.
- **Data Fetching**: Products are fetched from dummyjson.com using custom hooks.
- **Persistent Storage**: Vercel KV is used to maintain cart data across sessions, with synchronization on initial access and subsequent updates.

## License
This project is licensed under the terms of the [MIT License](./LICENSE). See the LICENSE file for details.

## Contact
For any questions or feedback, please reach out to shanvit.shetty@gmail.com.






