import { createContext, useContext } from "react";

const initialSelections = {
  categories: [
    {
      categoryId: 1,
      products: [
        {
          productId: 2,
          variantId: 2,
          quantity: 1,
        },
        {
          productId: 3,
          variantId: 5,
          quantity: 2,
        },
      ],
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
