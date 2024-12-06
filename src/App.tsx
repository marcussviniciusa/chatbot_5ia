import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthPage } from '@/pages/auth';
import { HomePage } from '@/pages/home';
import { AdminPage } from '@/pages/admin';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { AdminRoute } from '@/components/layout/admin-route';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}