
import AppRouter from './AppRouter';
import { CartProvider } from './context/CartContext';

const App = () => (
  <CartProvider>
    <AppRouter />
  </CartProvider>
);

export default App;