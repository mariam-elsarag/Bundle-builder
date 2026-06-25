import Home from "./pages/home/Home";
import { CartProvider } from "./providers/CartProvider";

const App = () => {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
};

export default App;
