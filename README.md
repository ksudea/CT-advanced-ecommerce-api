# CT-advanced-ecommerce-api
Mini-project: Advanced E-Commerce API in React, with a Flask backend.

1. Customer and CustomerAccount Management: React components and functionality for managing Customers and their associated CustomerAccounts:
   - Create Customer Form (path: /add-customer): capture and submit essential customer information, including name, email, and phone number.
   - Read Customer Details (path: /customer-details/:id): component to display customer details retrieved from the backend based on their unique identifier (ID).
   - Update Customer Form (path: /edit-customer/:id): form component allows users to update customer details, including the name, email, and phone number.
   - Delete Customer Information: function in Customer Detail component that when triggered will delete a customer from the backend based on their unique identifier (ID).
   - List Customers (path: /customers): display list of all customers, each with navigation to customer details page and buttons to edit and delete.

2. Product Catalog: React components and functionality for managing Products:
   - List Products (path: /products): display a list of all available products in the e-commerce platform, providing essential product information.
   - Create Product Form (path: /add-product): adding a new product to the e-commerce database. Captures essential product details, such as the product name and price.
   - Read Product Details (path: /products/:id): display product details retrieved from the backend based on the product's unique identifier (ID).
   - Update Product Form (path: /edit-product/:id): allows users to update product details, including the product name and price.
   - Delete Product Information: Functions in product detail and product list components that, when triggered, will delete a product from the backend based on their unique identifier (ID).
   - Product Confirmation: confirmation modals for securely creating, updating or deleting a product from the system based on its unique ID

  3. Order Processing: React components and functionality for efficient handling of customer orders:
     - Place Order Form (path: /add-order/:id): form component for customers to place new orders, specifying the products they wish to purchase. Each order captures the order date and the associated customer.

5. Other Details:
   - Functional components used
   - React Router for routing through the application
   - Form handling and form valudation implemented
   - React-Bootstrap used to enhance user interface
  
6. Backend:
   - (Module 6 project) Backend link: https://github.com/ksudea/CT-ecommerce-api/
   - Some routes/functions added:
   - Get customer account by customer id: /customeraccounts/customerId/<int:customer_id>
   - Get customer by email: /customers/email/<string:email>
   - Get all customers: /customers
   - Instructions on running the backend are in the Readme file of the repository.
  
  7. Instructions on running the application:
     - cd e-commerce-api-frontend
     - npm install
     - npm install react-bootstrap bootstrap
     - Remember to npm install dependencies like axios, react-router-dom, prop-types if they aren't installed.
     - npm run dev
