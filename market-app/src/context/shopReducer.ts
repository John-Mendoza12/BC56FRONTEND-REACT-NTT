import { ShopAction } from "./ShopAction";
import { ShopState } from "./ShopState";

export const initialState: ShopState = {
    shop: []
};
export const shopReducer = (state: ShopState, action: ShopAction): ShopState => {
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