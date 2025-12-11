
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Router>
    <AuthProvider>
      <CartProvider>
        <AppRouter />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </CartProvider>
    </AuthProvider>
  </Router>
);

export default App;