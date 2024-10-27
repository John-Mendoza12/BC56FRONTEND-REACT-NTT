export interface IProduct{
    id:number;
    title:string;
    category:string;
    price:number;
    description:string;
    thumbnail:string
}
export interface ICategory{
    slug:string;
    name:string;
    url:string;
}
export interface IProductList{
    products:IProduct[];
}