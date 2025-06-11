# UniCampus Frontend

<p align="center">
  <a href="https://unicampusrit.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge&logo=netlify" alt="Live Demo">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

This is the official frontend for the **UniCampus** platform, a modern, responsive web application built with React, Vite, and TypeScript. It provides a seamless user interface for students of M.S. Ramaiah Institute of Technology to interact with campus communities, resources, and services.

**[Click here to view the live demo!](https://unicampusrit.netlify.app/)**

---

## 🔗 Related Repository: Backend & DevOps

This frontend is designed to work with its corresponding backend service, which includes the full DevOps CI/CD pipeline. The backend is responsible for all data, authentication, and business logic.

➡️ **[View Backend Repository (unicampus-backend)](https://github.com/iamsjeevan/unicampus-backend)**

---

## ✨ Key Features

*   **Responsive Design:** A mobile-first interface that works beautifully on all screen sizes.
*   **User Authentication:** Secure login and session management.
*   **Interactive Dashboard:** A central hub for student information.
*   **Community & Social Feeds:** Browse communities, view posts, and interact with a trending feed.
*   **Resource Sharing:** A dedicated section for sharing and accessing academic resources.
*   **Real-time Data:** View attendance, results, and other personal data fetched from the backend.
*   **Light & Dark Mode:** Theme support for user preference.

---

## 🛠️ Tech Stack & Architecture

This project was built with a focus on developer experience, performance, and modern UI/UX principles.

*   **Framework:** **React** with **Vite** for a blazing-fast development experience.
*   **Language:** **TypeScript** for robust type-safety and scalability.
*   **Styling:** **Tailwind CSS** for a utility-first styling workflow.
*   **UI Components:** Built with **shadcn/ui**, a collection of re-usable, accessible, and composable components.
*   **State Management:** React Context API for managing global state like authentication and theme.
*   **API Communication:** A centralized API client built with `axios` for communicating with the backend REST API.
*   **Linting & Formatting:** **ESLint** and Prettier configured for consistent code quality.

---

## 🚀 Performance & Quality

*   **Automated Performance Checks:** Integrated **Lighthouse** (`lighthouserc.js`) to run performance, accessibility, and SEO audits automatically, ensuring a high-quality user experience.
*   **Optimized Builds:** Vite's build process ensures optimized, smaller bundle sizes for faster load times.

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You must have Node.js (v18.x or later) and a package manager like `npm` or `yarn` installed.

*   [Node.js](https://nodejs.org/)

### Installation & Running Locally

1.  **Start the Backend First:** This frontend requires the `unicampus-backend` to be running. Please follow the setup instructions in its [README](https://github.com/iamsjeevan/unicampus-backend).

2.  **Clone the Frontend Repository:**
    ```sh
    git clone https://github.com/iamsjeevan/unicampus_frontend.git
    cd unicampus_frontend
    ```

3.  **Install Dependencies:**
    ```sh
    npm install
    ```

4.  **Set Up Environment Variables:**
    Create a `.env.local` file in the root of the project. This is crucial for telling the frontend where to find the backend API.
    ```
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
    *(Adjust the URL if your backend runs on a different port.)*

5.  **Run the Development Server:**
    ```sh
    npm run dev
    ```
    The application will now be running at `http://localhost:5173` (or the next available port).

---

## 📧 Contact

Jeevan S. - [iamsjeevan@gmail.com](mailto:iamsjeevan@gmail.com)

Project Link: [https://github.com/iamsjeevan/unicampus_frontend](https://github.com/iamsjeevan/unicampus_frontend)