import { IProduct } from "./IProduct";

export interface IShop{
    quantity:number;
    product:IProduct;
    id:number;
}
export interface IShopList{
    price:number;
    shop:IShop[]
}
export interface ISend{
    name:string,
    apellido:string,
    distrito:string,
    dirrecion:string,
    referencia:string,
    celular:string
}
export const initial:ISend={
    name: "",
    apellido: "",
    distrito: "",
    dirrecion: "",
    referencia: "",
    celular: ""
}
export interface IDistrict{
    key:string,
    text:string
}