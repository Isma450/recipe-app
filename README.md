<<<<<<< HEAD
# Recipe Haven - React Recipe Application

![Recipe Haven Logo](public/vite.svg)

Recipe Haven is a modern React application that allows users to search, view, and save their favorite recipes. Built with React, Vite, and styled with Tailwind CSS, it offers a seamless and responsive experience for cooking enthusiasts.

## 📋 Features

- **User Authentication** - Secure login system
- **Recipe Search** - Find recipes by name or ingredients
- **Recipe Details** - View comprehensive recipe information including:
  - Ingredients list
  - Step-by-step instructions
  - Recipe images
- **Favorites Management** - Save, view, and remove favorite recipes
- **Responsive Design** - Optimal viewing experience on all devices
- **API Integration** - Seamless integration with a recipe API
- **Client-side Caching** - For improved performance and reduced API calls

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd recipe-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a .env file in the root directory with the following variables:
   ```
   VITE_API_BASE_URL=<your-api-base-url>
   VITE_API_KEY=<your-api-key>
   VITE_API_HOST=<your-api-host>
   VITE_DEFAULT_USERNAME=<default-username>
   VITE_DEFAULT_PASSWORD=<default-password>
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## 🧰 Tech Stack

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [React Router](https://reactrouter.com/) - Routing and navigation
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Axios](https://axios-http.com/) - Promise-based HTTP client

## 📱 Application Structure

- **Authentication** - Context-based auth system with protected routes
- **Routing** - Defined routes with navigation between pages
- **Components** - Modular, reusable components
- **API Integration** - Custom hook for API communication with caching
- **Responsive UI** - Mobile-first design with Tailwind CSS

## 📦 Building for Production

```sh
npm run build
```

The built files will be in the `dist` directory.

## 📝 Usage

1. Log in using the predefined credentials
2. Browse or search for recipes
3. Click on a recipe to view details
4. Add recipes to favorites
5. View and manage favorites in the Favorites section

## 🔒 Authentication

This app uses a simple authentication system with predefined credentials stored in environment variables. In a production environment, this would be connected to a proper backend authentication service.

## 🌐 API Integration

Recipe data is fetched from an external API. The application implements caching to improve performance and reduce API calls.

## ⚙️ Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> ba82204 (Initial commit: Recipe Haven application)
