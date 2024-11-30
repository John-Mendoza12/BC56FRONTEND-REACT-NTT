import { createContext, useContext, } from "react";
import { ShopContextType } from "./ShopContextType";

export const ShopContext = createContext<ShopContextType>({
    array: [],
    addItem: () => {},
    removeItem: () => {},
    updateItem:()=>{},
    clearArray: () => {}
  });
export const useShopContext = (): ShopContextType => {
    const context = useContext(ShopContext);
    console.log(context)
    if (context === undefined) {
      throw new Error('useShopContext Error');
    }
    return context;
  };
