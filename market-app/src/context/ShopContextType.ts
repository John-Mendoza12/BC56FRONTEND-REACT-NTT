import { IShop } from "../interfaces/ISummary";

export interface ShopContextType {
    array: IShop[];
    addItem: (item: IShop) => void;
    removeItem: (index: number) => void;
    clearArray: () => void;
    updateItem: (index: number, value: IShop) => void;
}