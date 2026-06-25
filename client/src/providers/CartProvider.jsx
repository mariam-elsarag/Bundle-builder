import { createContext, useContext } from "react";

const initialSelections = {
  cameras: [
    {
      id: "Wyze-Cam-v4",
      name: "Wyze Cam v4",
      selectedVariantId: "white",
      price: 34.98,
      priceBeforeDiscount: 39.98,

      variants: {
        id: "white",
        label: "White",
        thumbnail: "./assets/images/products/wyz_cam_pan_v3_white.png",
        quantity: 1,
      },
    },
    {
      id: "Wyze-Cam-Pan-v3",
      name: "Wyze Cam Pan v3",
      selectedVariantId: "white",
      price: 34.98,
      priceBeforeDiscount: 39.98,

      variants: {
        id: "white",
        label: "White",
        thumbnail: "./assets/images/products/wyz_cam_pan_v3_white.png",
        quantity: 2,
      },
    },
  ],
};
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  return <CartContext.Provider>{children}</CartContext.Provider>;
};
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("CartContext used outside the Cartprovider");
  return context;
}
