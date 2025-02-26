# Frontend Developer Take-Home Test

## Check out the [live demo](https://playa3ull.vercel.app/)


## Overview

Develop a responsive e-commerce web application that allows users to browse products, view product details, and add products to a shopping cart.
The application should integrate with a backend API to fetch product data.

- The goal is a clear demonstration of quality, functionality, and thought process.
- **Timebox:** The test is designed to be completed in 6 hours or less.
- **Commit Often:** Show your working process through regular commits.
- **External dependencies:** Use any external dependencies you see fit, you do not need to implement everything from scratch.
- **Keep It Minimal:** Use lightweight libraries and avoid adding unnecessary features, or over-engineering the solution.

## Requirements

### Functional

1. **Product Listing Page**
    - Display a list of products with images, names, and prices.
    - Implement pagination or infinite scrolling.

2. **Product Detail Page**
    - Show detailed information about the selected product.
    - Include an "Add to Cart" button.

3. **Shopping Cart**
    - Allow users to view products added to their cart.
    - Display the total price and quantity of items.
    - Enable users to remove items from the cart.

4. **Responsive Design**
    - Ensure the application is usable on desktop, tablet, and mobile devices.

### Technical

- **Frameworks & Libraries**
    - **Next.js** with **TypeScript**.
    - Style components using **Tailwind CSS**.

- **State Management**
    - Manage application state efficiently.

- **TypeScript**
    - Use TypeScript for type-checking and code quality.
    - 
- **API Integration**
    - Fetch data from a provided RESTful API endpoint.
    - Handle loading states and error handling gracefully.
    - API should be typed using TypeScript.

- **Code Quality**
    - Apply **SOLID principles** and design patterns.
    - Write consistent, clean, maintainable, and scalable code.
    - Create universal and reusable UI components.

- **Testing**
    - Write unit tests for critical components (optional).

## Getting Started

1. **Fork this Repository**
    - You can start by forking this repository.

2. **Setup Project**
    - Initialize a new Next.js project with TypeScript.
    - Install Tailwind CSS and configure it.

3. **API Endpoint**
    - Use a mock API for product data such as [Fake Store API](https://fakestoreapi.com/).

4. **Development**
    - Follow the requirements to build the application.
    - Ensure the application builds and runs without errors.

## Submission Guidelines

- **Repository**
    - Push your code to a **public GitHub repository**.
    - Ensure the repository has a clear commit history, and commit regularly.
    - Ensure the repository is a fork of this repository.

- **README File**
    - Include instructions on how to run your application.
    - Describe your thought process and any architectural decisions.
    - Mention any trade-offs or assumptions made during development.

- **Deployment**
    - (Optional) Deploy your application using services like **Vercel**.
    - Provide a link to the live application if deployed.

- **Submission**
    - Email us the link to your GitHub repository (and live demo if available) at [sam.thompson@playa3ull.games].

## Evaluation Criteria

- **Functionality**
    - Does the application meet all the functional requirements?

- **Code Quality**
    - Is the code clean, well-organized, and maintainable?
    - Are SOLID principles and design patterns appropriately applied?

- **Technical Skills**
    - Effective use of React, TypeScript, and Tailwind CSS.
    - Proper integration with the backend API.

- **User Experience**
    - Is the UI responsive and user-friendly?
    - Does the design consider good UX practices?

- **Problem-Solving**
    - How were challenges addressed?
    - Were creative solutions implemented?

- **Documentation**
    - Clarity of the README file.
    - Use of comments and documentation within the code.

## Extra Credit

*These are not required but can showcase your additional skills:*

- **GraphQL or tRPC**
    - Use GraphQL or tRPC instead of REST for API interactions.

- **Monorepo Setup**
    - Organize your project using a monorepo approach.

- **SEO Enhancements**
    - Implement SEO optimisation.

- **E-commerce Features**
    - Add user authentication.
    - Implement a checkout process.