import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Recipes from './components/Recipes';
import RecipeDetail from './components/RecipeDetail';
import Favorites from './components/Favorites';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/recipes"
              element={<ProtectedRoute><Recipes /></ProtectedRoute>}
            />
            <Route
              path="/recipe/:id"
              element={<ProtectedRoute><RecipeDetail /></ProtectedRoute>}
            />
            <Route
              path="/favorites"
              element={<ProtectedRoute><Favorites /></ProtectedRoute>}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;