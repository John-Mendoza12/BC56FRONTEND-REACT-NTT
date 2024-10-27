import { IProductList,ICategory } from "../interfaces/IProduct";

const getProducts=async ()=>{
    const response = await fetch("https://dummyjson.com/products");
    const data:IProductList= await response.json();
    return data;
}
const getCategories=async()=>{
    const response = await fetch("https://dummyjson.com/products/categories");
    const categories:ICategory[] = await response.json();
    return categories;
   
}

export const productsService={
   getProducts,getCategories
}