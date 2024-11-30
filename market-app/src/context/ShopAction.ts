import { IShop } from "../interfaces/ISummary";

export type ShopAction = 
  | { type: 'ADD'; payload: IShop }
  | { type: 'REMOVE'; payload: number; }
  | { type: 'UPDATE'; payload: { index: number; value: IShop } }
  | { type: 'CLEAR' };