import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "../providers/CartProvider";
import Loading from "../components/feedback/Loading";
const Home = lazy(() => import("../pages/home/Home"));
const CheckoutSuccess = lazy(() => import("../pages/checkout/CheckoutSuccess"));
const NotFound = lazy(() => import("../pages/404/NotFound"));

const AppRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          index
          element={
            <CartProvider>
              <Home />
            </CartProvider>
          }
        />
        <Route path="checkout" element={<CheckoutSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoute;
