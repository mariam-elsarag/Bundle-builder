import { createContext, useContext, useState } from "react";
import useGetData from "../hooks/useGetData";
import { API } from "../services/api";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

const CartContext = createContext();

const getOrGenerateVisitorId = () => {
  let visitorId = localStorage.getItem("visitorId");

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("visitorId", visitorId);
  }

  return visitorId;
};

export const CartProvider = ({ children }) => {
  const visitorId = getOrGenerateVisitorId();

  const [cartData, setCartData] = useState([]);
  const [loadingSaveBtn, setLoadingSaveBtn] = useState(false);

  const { data: cart, loading: cartLoader } = useGetData(
    `${API.cart?.get}${visitorId}`,
    (res) => setCartData(res?.data ?? []),
  );

  const handleSaveCart = async () => {
    try {
      setLoadingSaveBtn(true);

      const items = [];

      cartData?.forEach((category) => {
        category?.items?.forEach((item) => {
          const dto = {
            quantity: Number(item.quantity),
          };

          if (item.variantId) {
            dto.productId = Number(item.productId);
            dto.variantId = Number(item.variantId);
          } else if (item.productId) {
            dto.productId = Number(item.productId);
          } else if (item.packageId) {
            dto.packageId = Number(item.packageId);
          }

          items.push(dto);
        });
      });

      const response = await axiosInstance.put(
        `${API.cart.get}${visitorId}/${cart?.cartId}`,
        { items },
      );

      if (response.status === 200) {
        toast.success("Successfully saved your cart");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSaveBtn(false);
    }
  };

  const getMatchedItem = (productId, variantId) => {
    return cartData
      ?.flatMap((group) => group.items ?? [])
      ?.find((item) => {
        const sameProduct = Number(item.productId) === Number(productId);

        const itemHasVariant = item.variantId != null;
        const inputHasVariant = variantId != null;

        if (itemHasVariant || inputHasVariant) {
          return sameProduct && Number(item.variantId) === Number(variantId);
        }

        return sameProduct;
      });
  };
  const getSelectedProductsCount = (categoryId) => {
    const category = cartData?.find((c) => Number(c.id) === Number(categoryId));

    return category?.items?.length ?? 0;
  };
  const hasSelectedVariant = (productId) => {
    return cartData
      ?.flatMap((group) => group.items ?? [])
      ?.some((item) => Number(item.productId) === Number(productId));
  };
  const togglePlan = ({ plan }) => {
    setCartData((prev) => {
      const categories = Array.isArray(prev) ? prev : [];

      return categories.map((category) => {
        if (category.name !== "Plan") return category;

        const exists = (category.items ?? []).some(
          (item) => item.type === "plan",
        );

        return {
          ...category,
          items: exists
            ? []
            : [
                {
                  id: plan?.id || Date.now(),
                  title: plan?.title,
                  price: plan?.price,
                  priceBeforeDiscount: plan?.priceBeforeDiscount,
                  icon: plan?.icon,
                  packageId: plan?.id,
                  quantity: 1,
                  type: "plan",
                },
              ],
        };
      });
    });
  };
  const updateCartItem = ({
    categoryId,
    productId,
    variantId,
    quantity,
    product,
    variant,
    type,
  }) => {
    setCartData((prev) => {
      const categories = Array.isArray(prev) ? prev : [];
      return categories.map((category) => {
        if (Number(category.id) !== Number(categoryId)) {
          return category;
        }

        let items = [...(category.items ?? [])];

        const index = items.findIndex(
          (item) =>
            Number(item.productId) === Number(productId) &&
            Number(item.variantId) === Number(variantId),
        );

        if (index !== -1) {
          if (quantity <= 0) {
            // remove
            items = items.filter((_, i) => i !== index);
          } else {
            items[index] = {
              ...items[index],
              quantity,
            };
          }
        } else {
          if (quantity > 0) {
            items.push({
              id: Date.now(),
              productId,
              quantity,
              title: product?.name,
              thumbnail: variant?.thumbnail,
              variantId: variant?.id,
              price: product?.price,
              priceBeforeDiscount: product?.priceBeforeDiscount,
              type: type ?? "plan",
            });
          }
        }

        return {
          ...category,
          items,
        };
      });
    });
  };

  const allItems = cartData?.flatMap((c) => c.items ?? []) ?? [];

  const totalPrice = allItems.reduce((sum, item) => {
    const qty = Number(item.quantity ?? 1);
    const price = Number(item.price ?? 0);

    return sum + price * qty;
  }, 0);

  const totalBeforeDiscount = allItems.reduce((sum, item) => {
    const qty = Number(item.quantity ?? 1);
    const priceBefore = Number(item.priceBeforeDiscount ?? item.price ?? 0);

    return sum + priceBefore * qty;
  }, 0);

  const totalSavings = (totalBeforeDiscount - totalPrice).toFixed(2);
  return (
    <CartContext.Provider
      value={{
        cartData,
        getMatchedItem,
        updateCartItem,
        hasSelectedVariant,
        togglePlan,
        totalPrice,
        totalBeforeDiscount,
        totalSavings,
        getSelectedProductsCount,
        handleSaveCart,
        loadingSaveBtn,
        cartLoader,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("CartContext used outside CartProvider");
  }
  return context;
}
