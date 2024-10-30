import { createContext, ReactNode, useContext, useReducer } from "react";
import { IShop } from "../interfaces/ISummary";

export interface ShopState {
    shop: IShop[];
}
export type ShopAction = 
  | { type: 'ADD'; payload: IShop }
  | { type: 'REMOVE'; payload: number; }
  | { type: 'UPDATE'; payload: { index: number; value: IShop } }
  | { type: 'CLEAR' };
export interface ShopContextType {
    array: IShop[];
    addItem: (item: IShop) => void;
    removeItem: (index: number) => void;
    clearArray: () => void;
    updateItem: (index: number, value: IShop) => void;
}
export const ShopContext = createContext<ShopContextType>({
    array: [],
    addItem: () => {},
    removeItem: () => {},
    updateItem:()=>{},
    clearArray: () => {}
  });
const initialState: ShopState = {
    shop: []
};
const shopReducer = (state: ShopState, action: ShopAction): ShopState => {
    switch (action.type) {
    case 'ADD':
      return {
        ...state,
        shop: [...state.shop, action.payload]
      };
    case 'REMOVE':
        return {
          ...state,
          shop: state.shop.filter((_, index) => index !== action.payload)
        };
    case 'CLEAR':
      return {
        ...state,
        shop: []
      };
    case 'UPDATE':
        return {
          ...state,
          shop: state.shop.map((item, index) => 
            index === action.payload.index ? action.payload.value : item
          )
        };
    default:
      return state;
    }
}
interface ShopProviderProps {
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
export const useShopContext = (): ShopContextType => {
    const context = useContext(ShopContext);
    if (context === undefined) {
      throw new Error('useShopContext Error');
    }
    return context;
  };
