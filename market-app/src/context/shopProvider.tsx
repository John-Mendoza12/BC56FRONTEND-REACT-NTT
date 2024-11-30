import { ReactNode, useReducer } from "react";
import { ShopContext } from "./shopListContext";
import { initialState, shopReducer } from "./shopReducer";
import { IShop } from "../interfaces/ISummary";

export interface ShopProviderProps {
    children: ReactNode;
}
export const ShopProvider = ({ children }: ShopProviderProps) => {
    const [state, dispatch] = useReducer(shopReducer, initialState);
  
    const addItem = (item: IShop): void => {
      console.log("añadio")
      dispatch({ type: 'ADD', payload: item });
    };
  
    const removeItem = (index: number): void => {
      dispatch({ type: 'REMOVE', payload: index });
    };
    const updateItem = (index: number, value: IShop): void => {
      dispatch({ type: 'UPDATE', payload: { index, value } });
    };
  
    const clearArray = (): void => {
      dispatch({ type: 'CLEAR' });
    };
  
    return (
      <ShopContext.Provider 
        value={{
          array: state.shop,
          addItem,
          removeItem,
          updateItem,
          clearArray
        }}
      >
        {children}
      </ShopContext.Provider>
    );
  };